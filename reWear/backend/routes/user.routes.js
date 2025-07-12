//import the require modules
const express = require("express");
const router = express.Router();

// importing middlewares
const {auth , isInstructor , isStudent ,isAdmin}= require("../middlewares/auth");
const{signUp, login , changePassword , sendOTP} = require("../controllers/auth.controller");
const {getProfile} = require('../controllers/user.controller');

// define routes by me

// Route for user signup (no authentication required)
router.post("/signup", signUp);

router.post("/login", login);

router.post("/sendOTP", sendOTP);
//for authentication
router.get("/checkUser",getProfile);


// exports
module.exports = router;