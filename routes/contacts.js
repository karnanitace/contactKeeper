const express = require("express");
const router = express.Router();
const auth = require("../midddleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Contacts = require("../models/Contacts");

// @routre      GET api/contacts
//@desc         Get all users contacts
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contacts.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @routre      POST api/contacts
//@desc         Add new contact
// @access      Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contacts({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @routre      PUT api/contacts/:id
//@desc         Update contact
// @access      Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contacts.findById(req.params.id);

    if (!contact) return res.status(400).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contacts.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @routre      DELETE api/contacts/:id
// @desc        delete a contact
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contacts.findById(req.params.id);

    if (!contact) return res.status(400).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contacts.findByIdAndRemove(req.params.id);
    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
