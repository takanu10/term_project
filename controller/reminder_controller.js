let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    //finds the first item in the list and returns it
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      //dynamically generates ID
      //req.body lets us access user inputs
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },
  //edit button ONLY; just gets the user to the edit page to edit things
  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  //the actual function that updates the content
  //takes the edited title/description/radio buttons
  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    searchResult.completed = req.body.completed == "true";
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    //Find reminder
    let reminderToFind = req.params.id;
    //finds the first item in the list and returns it
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    //remove from array
    let index = database.cindy.reminders.indexOf(searchResult);
    //returns -1 if not in array; remove 1 item only
    if (index > -1) {
      database.cindy.reminders.splice(index, 1);
    }
    //redirect back to list of reminders
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
