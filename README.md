# INVENTORY MANAGEMENT SYSTEM

## Introduction

This is a tool created to facilitate inventory management in a store or a warehouse with an added functionality to print out the inventory, authentication, creating new users that have the access to the website, adding/removing items from the inventory. This project was made as a part of DEVSOC projects for the Web-development vertical. The project was built using the MERN( Mongoose, Express, Node JS, and React JS) stack and semantic-UI react. The link is available [here](https://webd-crew-inventory.herokuapp.com)

<br />

## Setting up development environment
* Clone this repository
* Add a file keys.js in a config folder in the server folder with the following format
```
module.exports= {
      dbURI:"mongodb connection link",
      secret: "Your secret"
}
```
* Run **npm install** in your terminal after changing directory to the **client** folder and then **npm start**.
* Run **npm install** in your terminal after changing directory to the **server** folder and then **npm start**.

<br />

## Team Members
* [Ananth Raghav](https://github.com/ananth243/) (Backend)
* [Anirudh Pupneja](https://github.com/apupneja/) (Frontend)
* [Omkar Kulkarni](https://github.com/oak2905/) (Frontend)

<br/>

## Contributions:
### Ananth Raghav
* Designed the entire server
* In the frontend, created the sidenav using semantic ui.
### Anirudh Pupneja
* Worked on the basic frontend and routing of pages.
* Worked on react-to-print(a third party npm package).
* Worked on the search for categories and other bugs on the front-end.
### Omkar Kulkarni
* Worked on the UI/UX design
* Made the add product/category,  delete product/category pages
* Defined the model for products in the backend.

<br/>

## New things learnt
### Ananth Raghav
* Customizing and handling errors in mongoose and express.
* Tackling authorisation and learned a lot about CORS and handling errors associated with it.
* Learnt Graphql for the project(did not use it due to time constraint).
* Learnt how json web tokens work and how to secure the server properly.
* Learnt how to create pdf's through various third party packages.
### Anirudh Pupneja
* Worked with react.js
### Omkar Kulkarni
* Learnt and worked with react js, node js, mongodb, mongoose.
* Learnt and used semantic ui.
* Learnt how to make websites responsive in react.js using third party packages.

### Credentials for the app: Username: Raghav, passwrd: test12
