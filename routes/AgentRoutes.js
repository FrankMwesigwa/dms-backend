import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/UserModel.js";
import Agent from "../models/AgentModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let agents = await Agent.find().populate("user").populate("distributor");

    if (!agents) {
      res.json({
        message: "There are no agents in the database at this time",
      });
    }
    res.status(200).json(agents);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/dist/products", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user.id });

  try {
    let agent = await Agent.findOne({ user: user.id })
      .populate("distributor");
    console.log("agent=====>", agent);
    res.status(200).json({dist: agent.distributor.user});
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let agent = await Agent.findById(req.params.id);
    res.status(200).json(agent);
  } catch (error) {
    res.json(error.message);
  }
});

export default router;
