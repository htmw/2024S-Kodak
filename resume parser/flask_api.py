from flask import Flask, jsonify
from os import path
from yaml import safe_load
import mysql.connector
import utils
import requests
import json

app = Flask(__name__)

# Initailize configurations

config_file = None
if config_file is None:
    # config_file = path.dirname(path.dirname(path.abspath(__file__))) + '/CS691/resume_parser/config.yml'.replace('/', path.sep)
    config_file = 'resume_parser/config.yml'.replace('/', path.sep)
with open(config_file) as general_config:
    config = safe_load(general_config)

# load database configuration
db_config = config["database"]

# load api configuration 
api_config = config["api"]

# authorize connection to job board api
basic = requests.auth.HTTPBasicAuth(api_config["auth"], '')


# returns 1200 if user is successfully added or returns 1100 if user already exist
# endpoint format = /userauth/register?username=<username>&password=<password>&resume=<resume_text>

@app.route('/userauth/register', methods=['GET'])
def register():
    username = request.args.get('username') 
    password = request.args.get('password')
    resume = request.args.get('resume')
    conn = mysql.connector.connect(user = db_config["username"], password = db_config["password"], host = db_config["host"], database = db_config["db_name"])
    select_query = ''' SELECT username FROM user_data WHERE username == ? '''
    cursor = conn.cursor()
    row = cursor.execute(select_query, (username)).fetchone()[0]
    if row == 0:
        email = utils.extract_email(resume)
        contact_no = utils.extract_mobile_number(resume)
        keyword = utils.extract_keywords(resume)
        final_keys = ",".join(keyword)
        insert_query = ''' INSERT INTO user_data(username, password, email, contact_no, keywords, resume) VALUES (?,?,?,?,?,?) '''
        cursor.execute(insert_query,(username, password, email, contact_no, final_keys, resume))
        conn.commit()
        return_code = 1200
    else:
        return_code = 1100
    conn.close()
    return return_code


# returns 2200 if user is successfully added or returns 2100 if user already exist
# endpoint format = /userauth/login?username=<username>&password=<password>

@app.route('/userauth/login', methods=['GET'])
def login():
    username = request.args.get('username') 
    password = request.args.get('password')
    conn = mysql.connector.connect(user = db_config["username"], password = db_config["password"], host = db_config["host"], database = db_config["db_name"])
    select_query = ''' SELECT username FROM user_data WHERE username == ? and password == ? '''
    cursor = conn.cursor()
    row = cursor.execute(select_query, (username, password)).fetchone()[0]
    if row == 1:
        return_code = 2200
    else:
        return_code = 2100
    conn.close()
    return return_code


# returns 3200 if upload successfully added or returns 3100 if upload failed
# endpoint format = /resume/upload?username=<username>&resume=<resume>

@app.route('/resume/upload', methods=['GET'])
def upload_resume():
    username = request.args.get('username')
    resume = request.args.get('resume')
    conn = mysql.connector.connect(user = db_config["username"], password = db_config["password"], host = db_config["host"], database = db_config["db_name"])
    select_query = ''' SELECT * FROM user_data WHERE username == ? '''
    cursor = conn.cursor()
    row = cursor.execute(select_query, (username,)).fetchone()[0]
    if row == 1:
        email = utils.extract_email(resume)
        contact_no = utils.extract_mobile_number(resume)
        keyword = utils.extract_keywords(resume)
        final_keys = ", ".join(keyword)
        insert_query = ''' Update user_data SET email = %s, contact_no = %s, keywords = %s, resume = %s WHERE username = %s'''
        row = cursor.execute(insert_query, (email,contact_no,final_keys,resume, username))
        return_code = 3200
    else:
        return_code = 3100
    conn.close()
    return return_code


# returns job list or returns 4100 job api is down
# endpoint format = /jobs/list?username=<username>&page=<page>

@app.route('/jobs/list', methods=['GET'])
def jobs_list():
    username = request.args.get('username')
    page = request.args.get('page')
    results_to_skip = "&resultsToSkip=" + page + "00"
    conn = mysql.connector.connect(user = db_config["username"], password = db_config["password"], host = db_config["host"], database = db_config["db_name"])
    select_query = ''' SELECT keywords FROM user_data WHERE username == ? '''
    cursor = conn.cursor()
    row = cursor.execute(select_query, (username,)).fetchone()[0]
    conn.close()
    if row == 1:
        url = api_config["job_list_url"] + row + results_to_skip
        payload = ""
        headers = ""
        response = requests.request("GET", url, data=payload, headers=headers, auth = basic)
        job_list = dict()
        job_list = json.loads(response.text)
        job_list = job_list["results"]
        return job_list 
    else:
        return 4100


# returns job details 
# endpoint format = /jobs/detail?jobid=<jobid>

@app.route('/jobs/detail', methods=['GET'])
def job_details():
    jobid = request.args.get('jobid')
    url = api_config["job_details_url"] + jobid
    headers = ""
    response = requests.request("GET", url, headers=headers, auth = basic)
    job = dict()
    job = json.loads(response.text)
    return job


# returns job score or 6100 if could not be scored
# endpoint format = /jobs/score?username=<username>&job=<job description>

@app.route('/jobs/score', methods=['GET'])
def match_score():
    username = request.args.get('username')
    job_des = request.args.get('job')
    conn = mysql.connector.connect(user = db_config["username"], password = db_config["password"], host = db_config["host"], database = db_config["db_name"])
    select_query = ''' SELECT resume FROM user_data WHERE username == ? '''
    cursor = conn.cursor()
    row = cursor.execute(select_query, (username,)).fetchone()[0]
    conn.close()
    if row == 1:
        score = utils.calculate_score(row, job_des)
        return score
    else:
        return 6100

if __name__ == '__main__':  
    app.run()
    
