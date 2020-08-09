const express = require("express");
const router = express.Router();

// @routre      GET api/auth
//@desc         Get Logged in User
// @access      Private
router.get("/", (req, res) => {
  res.send("Get Logged in User");
});

// @routre      POST api/auth
//@desc         Auth user and get token
// @access      Public
router.post("/", (req, res) => {
  res.send("Login user");
});

module.exports = router;
