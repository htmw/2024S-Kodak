import requests
import json

# function returns a list dictionaries of jobs

def get_job_list(keywords):
    basic = '' # From config
    payload, headers = ""
    #test version of  API call, should return a list jobs
    url = ''       # add url from config and keywords from api  here
    response = requests.request("GET", url, data=payload, headers=headers, auth = basic)
    job_list = dict()
    job_list = json.loads(response.text)
    job_list = job_list["results"]

    return job_list

# function returns details of a single job based on the jobId passed in

def get_job_details(job_id):
    url = ''            # add url from config and replace the number at the end with jobId
    response = requests.request("GET", url, headers=headers, auth = basic)
    job = json.loads(response.text)
    return job
