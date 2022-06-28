import express from "express";
import Bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;

    const userEmail = await User.findOne({ email });
    if (userEmail)
      return res.json({ message: " User with that email already exists " });
    else if (!userEmail) {
      req.body.password = await Bcrypt.hashSync(req.body.password, 10);

      const user = new User({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone
      });

      const savedUser = await user.save();
      res.json(savedUser);
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    var user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(400).send({ message: "The email is not registered" });
    }
    if (!Bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).send({ message: "Invalid password " });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      "process.env.secretToken"
    );
    res.json({
      accessToken: accessToken,
      user: user,
      message: "Successfully logged in!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    let user = await User.find({});
    if (!user) {
      res.json({
        message: "There are no user in the database at this time",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.json(error.message);
  }
});

export default router;
