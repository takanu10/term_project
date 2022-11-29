const express = require("express");
//initiates the server
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

//tells express to look for public folder
//whenever browser requests file, look in public folder
//stores html/js/css files
app.use(express.static(path.join(__dirname, "public")));

//lets express know that we want to grab content that user inputs into input fields
//ALWAYS just put this in your express code; preinstalled in other languages
app.use(express.urlencoded({ extended: false }));

//ejs needs views folder that'll store ejs files
//partials folder stores partials
//small chunks of code written in another file that can be imported
//makes code more manageable over time; set layouts that can be reused seamlessly
// <% include ./partials/navbar %>
// <%- body %>
//^ need ejs layout for this body code; unique html code imported into <%- body %>
//allows for ejs base template code to act as a skeleton code around html content in <%- body %>
app.use(ejsLayouts);

//lets express know that we want to use ejs as the view engine for html templating
app.set("view engine", "ejs");

// ROUTES START HERE
//import functions from reminder_controller.js to make code manageable
app.get("/reminders", reminderController.list);
// Case 3: User goes to localhost:3001/reminder/new -> Show a CREATE REMINDER PAGE
app.get("/reminder/new", reminderController.new);
// Case 4: User SENDS new reminder data to us (CREATING A REMINDER)
// :id means it'll be dynamic; use req.params.id in reminder_controller
app.get("/reminder/:id", reminderController.listOne);
// Case 5: User wants to EDIt an individual reminder
app.get("/reminder/:id/edit", reminderController.edit);

// sending new "create" reminder data to server
app.post("/reminder/", reminderController.create);

// Implement this yourself
//user clicks the update button + expects their reminder to be updated
app.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
//user clicks delete button + expects reminder to be deleted
app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

//to access server, need to go to:
//localhost:3001
app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
