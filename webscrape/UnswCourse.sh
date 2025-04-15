#!/bin/bash

courseslink="https://timetable.unsw.edu.au"
suffixlink="subjectSearch.html"
years=("2025" "2024" "2023")

for year in ${years[@]}
do
    # Get the Subject Area
    subjects=$(curl -s "$courseslink/$year/$suffixlink" \
    | sed -n '/Kensington Campus/,/Paddington Campus/p' \
    | grep -Eo 'href="[A-Z]{4}KENS\.html"' \
    | sed -E 's/href="([A-Z]{4})KENS\.html"/\1/' \
    | sort -u)
    
    # Get the Course Code
    for subject in $subjects
    do
        courses=$(curl -s "$courseslink/$year/$subject"KENS.html \
        | grep -Eo 'href="[A-Z]{4}[0-9]{4}\.html"' \
        | sed -E 's/href="([A-Z]{4}[0-9]{4})\.html"/\1/')
        
        # Get the terms available for the course
        for course in $courses
        do
            echo $course
            terms=$(curl -s "$courseslink/$year/$course".html \
            | grep -Eo '<td class="data" colspan="5"><a href="#S(1|2|3)S">' \
            | sed -E 's/<td class="data" colspan="5"><a href="#S([1-3])S">/T\1/' \
            | sort -u)

            # Get the CLO for each terms => https://www.unsw.edu.au/course-outlines
            # for term in $terms
            # do

            # done
            echo $terms
        done
    done
done

# Explanation:
# curl command will get the data in the form of html from link
# we use sed for filterning information and to take data
# we use grep for matches the regex (take us to the information line)
# sort -u => for limitting duplicates