# Spring 2024 CSE3421 Classroom Application Project #

## Running Instructions

1. download repo, cd to main project directory 
### "cd CSE3421ClassroomApplication" ###

2. run the server (You may need to install some dependencies before it can run succesfully)
### "node server.js" ###

3. go to project page
### open http://localhost:3000 in web browser ###


This application makes use of a database deployment coupled with a node server for backend support. 
Using ejs templates we were able to create the different sections and functionality. We used CSS styling and each part of the application works.

Take-attendance.ejs takes the list of students from the database, and then allows the teacher to mark them present. Then update the db on submit.

Classroom-chat.ejs takes in chat messages with valid student id's and names and then maintains a static list that keeps messages even if the page is refreshed.

Wellness-survey.ejs takes input regarding the wellness survey and then updates the student table with the response given. Future updates could access this database and email a professional the results.
