# HOT TAKES #

Hot takes is a social media app that allows users to create an account and post their favorite pepper. You can upload a picture and informations about your pepper. You can then modify it.

The frontend is made with angular (not made by me).

I coded all the backend (server + database).

For the server, I use NodeJs and Express.

For the database, I use MongoDB.

For security, I use bcrypt and Jsonwebtoken.

Images are stocked in an images folder that you must create in the backend folder. I use multer to allow users to upload pictures.

If you want to use your account, in the backend folder you'll find a .env file, in which you'll be able to modify your username, database name and password of your MongoDB account.

## Installation ##

Here are the dependancies you need to install:
- NodeJS 12.14 or 14.0.
- Angular CLI 7.0.2.
- node-sass : make sure to use the corresponding version to NodeJS. For Noe 14.0 for instance, you need node-sass in version 4.14+.

On Windows, these installations require to use PowerShell in administrator mode.

Then, clone this repo, `run npm install`, and `run npm install --save-dev run-script-os`.


## Usage ##

Run `npm start`. This should both run the local server and launch your browser.

If your browser fails to launch, or shows a 404 error, navigate your browser to http://localhost:8080.

The app should reload automatically when you make a change to a file.

Use `Ctrl+C` in the terminal to stop the local server.


## Run backend Server 

Go to backend folder and run `npm install` and `npm start`. This should run the backend server and you'll be able to use the app.
