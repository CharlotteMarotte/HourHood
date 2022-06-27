# HourHood ReadMe

## What is HourHood App about

- Hour Hood is about creating a community of neighbours who feel valued and supported by exchanging services between each other

- The app is for English speaking people who are new in Barcelona and not part of a community yet and want to find belonging and share their time with others & for people who need support in their daily life

- The main features are:

        * Offering services;
        * Booking services and answering to requests;
        * Chat between provider and requestor;

## App Architecture

![link to App Architecture graph](public/appFiles/AppArchitecture_HourHood.png)

## User Flow Diagram

![link to User Flow graphics](public/appFiles/HourHood_UserFlow.png)

## Database Schema

![link to Database Schema](public/appFiles/dbDesign_HourHood.png)


## API routes 

- to be done (https://docs.google.com/document/d/1cDTA79TO6G594Z-iBeoRcO6bpX5b7Ii_RibBdiD0btQ/edit)


## How to install and run it

### Install dependencies

- Run `npm install` in project directory, then, in terminal cd into client and run `npm install` in the client folder.

### Database Preparation

- Access your SQL CLI and type `create database HourHood;` to create a database in MySQL.

- Create `.env` file in you project directory and insert the following:

      ```
      DB_HOST=localhost
      DB_NAME=HourHood
      DB_USER=YOUR_USERNAME
      DB_PASS=YOUR_PASSWORD
      ```
- Change the DB_USER and DB_PASS to the username and password to your SQL CLI.

- Make sure to have the `.env` file included in the `.gitignore` file.

Run `npm run migrate` in your terminal in the project folder in order to create all the tables and insert data to the `HourHood` database; Use this command whenever making changes to `init_db.sql` file

### For image upload

- in public folder in project directory create a folder called `clientfiles`, then add `/public/clientfiles/` to the gitignore file

### Run Your Development Servers

- Run `npm run start` in project directory to start the Express server on port 5000
- Type `cd client` in your terminal and run `npm run start` command to start client server in development mode on port 3000.
- You can test your client app in `http://localhost:3000`

## How to use Website

- from Startpage go to Offers View by clicking (V) Button
- Explore Offers without an account, click dropdown menu in Offer View to search by category
### Create an account
- if you want to request servers create an account by clicking Login in Navbar and then Signup
- read the rules and if you accept click continue
- Fill in your data and create an account
- log in with your email adress and password
- for starting you get 5h starting credit
### Requesting a service
- Request a service by clicking on request on a service card
- click '...'s Profile' to watch the profile of the provider
- choose a time you want to request
- you can write a note to the provider
- if you don't have enough hours to pay and the provider allows it you can request a service as a donation
### Manage your booked services 
- click 'Receiving help' in the Navbar
- under 'Pending' you see the services that you requested and the provider hasn't replied yet, you can cancel if you don't longer want to request it
- under 'Accepted' you can see the services that you requested and the provider has accepted
- whenever you request a service and the provider accepts the hours that you requested are getting substracted from your wallet
- if you click on 'Chat' you can talk to the provider in a 1-on-1 Chat
- click 'Back to offers' to go back to List with all offers
### Answer to requests of your services
- click 'Giving help in the Navbar
- under 'Pending' you see requests that you didn't reply to yet, click accept or deny to answer
- under 'Accepted' you can see the requests that you accepted, you can cancel them
- whenever you accept an offer the hours that this person requested are being added to your wallet
- if you click on 'Chat' you can talk to the requestor in a 1-on-1 Chat
- click 'Add a new offer' to post a new service
### Viewing and editing your profile 
- Click 'Profile' in the Navbar
- click 'Edit Profile' to edit your information and save to update your profile
- to upload a new profile photo, click 'Upload a file' (in your computer's systems language) and then 'Upload photo'
### Viewing your offers
- Click 'Profile' in the Navbar
- scroll down to see your offers
- click delete to remove your offer 
- click edit to update the service information, change any information and click update to finish
### Posting a new offer
- choose a descriptive title for your service
- choose a category that your service fits into
- fill in any additional information in the description (like times you are available during the day, estimations how long this service will take)
- if you would also offer your service as a donation for people who do not have enough hours to pay check the checkbox for donations

## Technologies used

### Frontend

    * Pusher
    * Tailwind
    * REACT
    * Scripts
    * React-router
    * Axios

### Backend

    * NODE.js 
    * EXPRESS
    * Postman
    * Bycript & jwt
    * dotenv
    * Multer
    * Pusher
    * Axios
    * MySQL

### API

    * Pusher

## Feature Extensions

- Update Information in real-time

- Map API integration

- Admin View

- Reviews

## Notes

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._
