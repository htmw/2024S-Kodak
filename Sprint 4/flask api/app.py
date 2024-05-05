from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User
import utils
from yaml import safe_load
from os import path
import requests
import json


app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

config_file = None
if config_file is None:
    # config_file = path.dirname(path.dirname(path.abspath(__file__))) + '/CS691/resume_parser/config.yml'.replace('/', path.sep)
    config_file = 'config.yml'
with open(config_file) as general_config:
    config = safe_load(general_config)

# load api configuration 
api_config = config["api"]

# authorize connection to job board api
basic = requests.auth.HTTPBasicAuth(api_config["auth"], '')

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 

@app.route("/userauth/register", methods=["POST"])
def register_user():
    username = request.json["username"]
    password = request.json["password"]
    resume = request.json["resume"]

    user_exists = User.query.filter_by(username=username).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 1100

    email = utils.extract_email(resume)
    contact_no = utils.extract_mobile_number(resume)
    final_resume = " ".join(resume)
    keyword = utils.extract_keywords(final_resume)
    final_keys = ",".join(keyword)
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, contact_number = contact_no, email = email,resume = final_resume, keywords = final_keys)
    db.session.add(new_user)
    db.session.commit()
    
    session["username"] = new_user.username

    return jsonify({
        "username": new_user.username,
    }) , 200


@app.route("/userauth/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["username"] = user.username

    return jsonify({
        "username": user.username
    })


@app.route('/resume/upload', methods=['POST'])
def upload_resume():
    username = request.json["username"] 
    resume = request.json["resume"]

    user_exists = User.query.filter_by(username=username).first() 
    if user_exists:
        email = utils.extract_email(resume)
        contact_no = utils.extract_mobile_number(resume)
        final_resume = " ".join(resume)
        keyword = utils.extract_keywords(final_resume)
        final_keys = ",".join(keyword)
        user_exists.resume = final_resume
        user_exists.final_keys = final_keys
        db.session.commit()
        return jsonify({
        "username": user_exists.username,
    }) , 200
    else:
        return jsonify({"error": "User already exists"}), 100


@app.route('/jobs/list', methods=['GET'])
def jobs_list():
    username = request.args.get("username")
    page = request.args.get("page")
    results_to_skip = "&resultsToSkip=" + page + "00"
    user_exists = User.query.filter_by(username=username).first()
    if user_exists:
        url = api_config["job_list_url"] + user_exists.keywords + results_to_skip
        payload = ""
        headers = ""
        response = requests.request("GET", url, data=payload, headers=headers, auth = basic)
        job_list = dict()
        job_list = json.loads(response.text)
        job_list = job_list["results"]
        return jsonify({
        "joblist": job_list,
    }) , 200
    else:
        return jsonify({"error": "Provided API not working"}), 100


@app.route('/jobs/detail', methods=['GET'])
def job_details():
    jobid = request.args.get("jobid")
    url = api_config["job_details_url"] + str(jobid)
    headers = ""
    response = requests.request("GET", url, headers=headers, auth = basic)
    job = dict()
    job = json.loads(response.text)
    job["jobDescription"] = utils.remove_html_tags(job["jobDescription"])
    return job, 200

@app.route('/jobs/score', methods=['GET'])
def match_score():
    username = request.args.get("username") 
    job_des = request.args.get("job")
    user_exists = User.query.filter_by(username=username).first()
    if user_exists:
        score = utils.calculate_score(user_exists.resume , job_des)
        return jsonify({
        "score": int(score * 100)
    }), 200
    else:
        return jsonify({
        "error": "Score cannot be generated." 
    }), 100


@app.route("/userauth/logout", methods=["POST"])
def logout_user():
    session.pop("username")
    return jsonify({
        "Logout": "Logged out." 
    }), 200

if __name__ == "__main__":
    app.run(debug=True)