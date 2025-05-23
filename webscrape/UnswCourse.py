import requests
import re

# Libraries for mongodb connection
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
import os

# MongoDB connection => https://www.youtube.com/watch?v=UpsZDGutpZc&t=1143s
def get_collections_from_db():
    load_dotenv(find_dotenv())

    connection_string = os.environ.get("MONGODB_URI")
    client = MongoClient(connection_string)

    # Get all database in mongodb
    # database = client.list_database_names()
    data_db = client.data   # access the "data" collection in db / create one if not exist
    
    # collections = data_db.list_collection_names()
    courses_collections = data_db.courses   # access "courses" / create one as collections
    return courses_collections

# Helper function
def get_html(url):
    response = requests.get(url)
    return response.text

def check_valid_url(url):
    response = requests.get(url)
    data = response.json()
    if data.get("type") == "No Results":
        return False
    else:
        return True

# Main function
def main(filter_year, filter_subject, filter_course):
    courses_collections = get_collections_from_db()

    courseslink = "https://timetable.unsw.edu.au"
    suffixlink = "subjectSearch.html"
    years = ["2025", "2024", "2023", "2022", "2021"]

    # Errors when transfering too much data, hence filtering data is usefull
    while (years[0] != filter_year):
        years.pop(0)

    for year in years:
        year_url = f"{courseslink}/{year}/{suffixlink}"
        html = get_html(year_url)

        subjects_at_kensington = (re.search(r'colspan="2"> Kensington Campus (.*?)colspan="2"> Paddington Campus', html, re.DOTALL)).group(1)        
        subjects = sorted(set(re.findall(r'href="([A-Z]{4})KENS\.html"', subjects_at_kensington)))
        
        if (filter_subject in subjects):
            while (subjects[0] != filter_subject):
                subjects.pop(0)
        
        # Get subjects
        for subject in subjects:
            subject_url = f"{courseslink}/{year}/{subject}KENS.html"
            html = get_html(subject_url)
            courses = sorted(set(re.findall(r'href="([A-Z]{4}[0-9]{4})\.html"', html)))

            if (filter_course in courses):
                while (courses[0] != filter_course):
                    courses.pop(0)

            for course in courses:
                course_url = f"{courseslink}/{year}/{course}.html"
                html = get_html(course_url)
                terms = sorted(set(re.findall(r'<td class="data" colspan="5"><a href="#S([1-3])S">', html)))
                print(course)
                # Fetch the course learning outcomes
                for term in terms:
                    course_outcome_url_ip = f"https://courseoutlines.unsw.edu.au/v1/publicsitecourseoutlines/detail?year={year}&term=Term+{term}&deliveryMode=In+Person&deliveryFormat=Standard&teachingPeriod=T{term}&deliveryLocation=Kensington&courseCode={course}&activityGroupId=1"
                    course_outcome_url_mm = f"https://courseoutlines.unsw.edu.au/v1/publicsitecourseoutlines/detail?year={year}&term=Term+{term}&deliveryMode=Multimodal&deliveryFormat=Standard&teachingPeriod=T{term}&deliveryLocation=Kensington&courseCode={course}&activityGroupId=1"
                    
                    course_outcome_url = ""

                    if check_valid_url(course_outcome_url_ip):
                        course_outcome_url = course_outcome_url_ip
                    elif check_valid_url(course_outcome_url_mm):
                        course_outcome_url = course_outcome_url_mm
                    else:
                        continue

                    html = get_html(course_outcome_url)
                    CLOs = sorted(set(sorted(re.findall(r'"CLO[0-9] : ([^"]+)"', html))))

                    data = {
                        "year": year,
                        "subject": subject,
                        "course": course,
                        "term": term,
                        "outcomes": CLOs
                    }
                    courses_collections.insert_one(data)

if __name__ == "__main__":
    # courses: https://timetable.unsw.edu.au/2025/subjectSearch.html
    # course outcomes: https://www.unsw.edu.au/course-outlines
    # default: "2025", "ACCT", "ACCT2101"
    # cut off: COMM1170, CONS0002, LAWS2384, LAWS8225,COMM2233, FINS2643

    main("2024", "COMM", "COMM2244")


# re.search => returns a match object if there is match anywhere in the tring, 
    # .group => returns the string that match
# re.findall => returns a lits containing all matches
