## Backend of Course Selling App

This backend is the made in last after solutions of backend

1. CourseAppEasy
2. CourseAppMedium.js

and in last the CourseAppHard.js
we converted this file to actually the backend server .
The main things to note in this backend is how the folder and files are
distributed The main content of backend are given below:

1. db folder : which has mongodb schemas and variables that we are exporting
2. middlewares: these are used for functions which are working as middleware to
   check the authenicity of the request coming
3. Routes: these folder are used to check the routes for admin and user and files
   are made indiviually for each specific routes
4. index.js : we are making main port opening, all the middleware and importing routes
   from differnt folder and using mongodb connection string to connect to mongo server
