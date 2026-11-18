const Router = require("express").Router();
const register= require("../controllers/register.controller");
const login= require("../controllers/login.controller");
const isUserExist = require("../controllers/isUserExsits.controller");

Router.post("/register", register);
Router.post("/login", login);

module.exports = Router; 

