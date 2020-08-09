const express = require("express");
const router = express.Router();

// @routre      GET api/contacts
//@desc         Get all users contacts
// @access      Private
router.get("/", (req, res) => {
  res.send("Get all contacts");
});

// @routre      POST api/contacts
//@desc         Add new contact
// @access      Private
router.post("/", (req, res) => {
  res.send("Add contact");
});

// @routre      PUT api/contacts/:id
//@desc         Update contact
// @access      Private
router.put("/:id", (req, res) => {
  res.send("update contact");
});

// @routre      DELETE api/contacts/:id
// @desc        delete a contact
// @access      Private
router.delete("/:id", (req, res) => {
  res.send("delete contact");
});

module.exports = router;
