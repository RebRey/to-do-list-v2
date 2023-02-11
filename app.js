// Require the express module (also install using CLI)
const express = require("express");

// Require the body-parser module  (also install using CLI)
const bodyParser = require("body-parser");

// Require the https module.
const https = require("https");

// Require Mongoose module (also install using CLI)
const mongoose = require("mongoose");

// Create a constant called app and set it equal to the express() method
const app = express();

// Run the server on port 3000
const port = 3000;

// Use the app.set() method to set the app's view engine to ejs.
app.set("view engine", "ejs");

// Use the app.use() method to use the body-parser module and set urlencoded to the true setting.
app.use(bodyParser.urlencoded({ extended: true }));

// Use the app.use() method and express.static() methods to serve static files (CSS style sheet) in Express.
app.use(express.static("public"));

// Open the connection to MongoDB server and create the database
main().catch((err) => console.log(err));
async function main() {
  mongoose.set("strictQuery", false);

  await mongoose.connect("mongodb://127.0.0.1/todolistDB");

  console.log("Connected to MongoDB server.");
}

// Create a mongoose SCHEMA
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified."],
  },
});

// Create a Mongoose MODEL (Mongoose variables are capitalized). This will create an items collection.
const Item = mongoose.model("Item", itemSchema);

// Create a Mongoose DOCUMENTS
const item1 = new Item({
  name: "Welcome to your to-do-list!",
});

const item2 = new Item({
  name: "Click on the + button to add a new item.",
});

const item3 = new Item({
  name: "<-- Click on this to delete an item.",
});

// Store documents in an array
const defaultItems = [item1, item2, item3];

// Create a GET request on the homepage route
app.get("/", function (req, res) {
  // Save user input to Items Collection, passing results to callback (stored in foundItems)
  Item.find({}, function (err, foundItems) {
    // If the array is empty in Items Collection
    if (foundItems.length === 0) {
      // Then insert the array of default items and provide a call back to handle errors
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved defaultItems to the DB.");
        }
      });
      // Finally, redirect to root route
      res.redirect("/");
    } else {
      // Render foundItems on home.ejs
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

// Handle the post request to the homepage route
app.post("/", function (req, res) {
  // save the text that the user types
  const itemName = req.body.newItem;

  // Create a new Mongoose DOCUMENT that contains the user's input (stored in itemName)
  const item = new Item({
    name: itemName,
  });

  // Save the document in the Items Collection
  item.save();

  // redirect to home route to render itemName on the app.
  res.redirect("/");
});

// Handle the post request for deleted items
app.post("/delete", function (req, res) {
  console.log(req.body);
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
