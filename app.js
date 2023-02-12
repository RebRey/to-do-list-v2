// require dotenv module *MUST BE ON TOP*
require('dotenv').config();

// Require the express module (also install using CLI)
const express = require("express");

// Require the body-parser module  (also install using CLI)
const bodyParser = require("body-parser");

// Require the https module.
const https = require("https");

// Require Mongoose module (also install using CLI)
const mongoose = require("mongoose");

// Require lodash module (also install using CLI)
const _ = require("lodash");

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
  // local connection
  // await mongoose.connect("mongodb://127.0.0.1/todolistDB");

  // Create a connection string for Mongo Atlas
  const connectionURI = "mongodb+srv://admin-rebecca:" + process.env.MONGO_ATLAS_ADMIN_PASSWORD + "@cluster0.swlgzsc.mongodb.net/?retryWrites=true&w=majority/todolistDB"
  // Mongo Atlas connection
  await mongoose.connect(
    connectionURI
  );

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

// Create a Mongoose SCHEMA for dynamic route
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});

// Create a Mongoose Model for dynamic route
const List = mongoose.model("List", listSchema);

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
  const itemName = req.body.newItem; // newItem is the name of the input in our list.ejs file
  const listName = req.body.list; // list is the name of the button in our list.ejs file

  // Create a new Mongoose DOCUMENT that contains the user's input (stored in itemName)
  const item = new Item({
    name: itemName,
  });

  // Check if the listName that triggered the post request is equal to "Today"
  if (listName === "Today") {
    // Save the document in the Items Collection
    item.save();

    // redirect to home route to render itemName on the app.
    res.redirect("/");
  } else {
    // search list document in the lists collection in our database
    List.findOne({ name: listName }, function (err, foundList) {
      // add the item and push it in the existing array of items
      foundList.items.push(item);
      // Save the foundList document
      foundList.save();
      // redirect to listName (custom list path)
      res.redirect("/" + listName);
    });
  }
});

// Handle the post request for deleted items
app.post("/delete", function (req, res) {
  // Create a constant called checkedItemId set it equal to the checkbox from input's name list.ejs
  const checkedItemId = req.body.checkbox;

  // Create a constant called listName set it equal to the listName from input's name from list.ejs
  const listName = req.body.listName;

  // Check if we are making a delete request from the default list called Today or the custom list
  if (listName === "Today") {
    // Delete the item from the database that has checked off ID
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log("Successfully deleted checked item.");
        // redirect to home route to delete item on the app.
        res.redirect("/");
      }
    });
  } else {
    // Find the list document that has the current listName
    // pull from items array that has an ID that corresponds to the checkedItemID
    // use a callback function that gives you an error and a foundList
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      function (err, foundList) {
        // if there are error throw the error
        if (err) {
          throw err;
        }

        // if there are no errors
        if (!err) {
          // then redirect to listName (custom list path)
          res.redirect("/" + listName);
        }
      }
    );
  }
});

// Create a GET request for a dynamic route by using express
app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  // Check if there's a list that has the same name as the one that the user is currently tying to access
  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        // create a new List by creating a Mongoose Document for dynamic route when the user tries to access a customListName
        // Make sure you create a Mongoose Schema and Model above
        const list = new List({
          name: customListName,
          items: defaultItems,
        });

        // Save list document
        list.save();

        // redirect to customListName
        res.redirect("/" + customListName);
      } else {
        // Show an existing List, render list.ejs, foundList.name, and foundList.items
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  });
});

// Create a GET request for the about page
app.get("/about", function (req, res) {
  res.render("about");
});

// Use app.listen() and console.log() to check if server is running on given port.
app.listen(port, function () {
  console.log("Server is running on port " + port + ".");
});
