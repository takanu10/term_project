const userModel = require("../database").userModel;
const login_database = require("../database").database;
const reminder_database = require("../database").database2;

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
    const email = req.body.email;
    const password = req.body.password;
    // const retrieval = userModel.findOne(email)
    //let username = retrieval.user
    const valid = userModel.isUserValid(userModel.findOne(email), password);
    //if userModel.isUserValid == TRUE
    if (valid) {
      //render user reminders list
      res.render("/reminders");
    } else {
      //stay on login page
      res.render("/login");
      //return invalid?
    }
  },

  registerSubmit: (req, res) => {
    // implement
    const email = req.body.email;
    const password = req.body.password;
    Object.assign(login_database, { email: email, password: password });
  },
};

module.exports = authController;
