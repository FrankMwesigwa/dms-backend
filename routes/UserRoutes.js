import express from "express";
import Bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username } = req.body;

    const userName = await User.findOne({ username });
    if (userName)
      return res.json({ message: " User with that username already exists " });
    else if (!userName) {
      req.body.password = await Bcrypt.hashSync(req.body.password, 10);

      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
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
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res
        .status(400)
        .send({ message: "The username is not registered" });
    }
    if (!Bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).send({ message: "Invalid password " });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
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
