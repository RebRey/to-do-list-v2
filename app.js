// Require the express module. (also install using CLI)
const express = require("express");

// Require the body-parser module  (also install using CLI)
const bodyParser = require("body-parser");

// Require the https module.
const https = require("https");

// Create a constant called app and set it equal to the express() method
const app = express();

// Run the server on port 3000
const port = 3000;

// Require the date module we created (this is a local module so use __dirname)
const date = require(__dirname + "/date.js");

// Create a variable called news and set it equal to an empty array
const items = [];

// Create a variable called workItems and set it qual to an empty array
const workItems = [];

// Use the app.set() method to set the app's view engine to ejs.
app.set("view engine", "ejs");

// Use the app.use() method to use the body-parser module and set urlencoded to the true setting.
app.use(bodyParser.urlencoded({ extended: true }));

// Use the app.use() method and express.static() methods to serve static files (CSS style sheet) in Express.
app.use(express.static("public"));

// Create a GET request on the homepage route
app.get("/", function (req, res) {
  // create a variable called day and set it equal to a function call for date() that is bound to the const date
  // to activate getDate() function
  const day = date.getDate();

  //render our list.ejs passing in two variables: one called kindOfDay set to equal day and another
  // called newListItems set to equal to the items array.
  res.render("list", { listTitle: day, newListItems: items });
});

// Handle the post request to the homepage route
app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

// Create a GET request for the work page
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

// Create a GET request for the about page
app.get("/about", function (req, res) {
  res.render("about");
});

// Use app.listen() and console.log() to check if server is running on given port.
app.listen(port, function () {
  console.log("Server is running on port " + port + ".");
});