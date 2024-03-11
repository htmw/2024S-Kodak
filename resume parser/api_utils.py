import requests
import json

# function returns a list dictionaries of jobs

def get_job_list(keywords):
    basic = requests.auth.HTTPBasicAuth('8388c68f-19f9-417a-a0c4-05f1ddb1c5f4', '')
    payload, headers = ""
    #test version of  API call, should return a list jobs
    url = "https://www.reed.co.uk/api/1.0/search?keywords=software developer"       # add keywords here
    response = requests.request("GET", url, data=payload, headers=headers, auth = basic)
    response = requests.request("GET", url, data=payload, headers=headers, auth = basic)
    job_list = dict()
    job_list = json.loads(response.text)
    job_list = job_list["results"]

    return job_list

# function returns details of a single job based on the jobId passed in

def get_job_details(job_id):
    url = "https://www.reed.co.uk/api/1.0/jobs/52240617"            # replace the number at the end with jobId
    response = requests.request("GET", url, headers=headers, auth = basic)
    job = json.loads(response.text)
    return job