import express from "express";
import Agent from "../models/AgentModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  let agent = new Agent({
    name: req.body.name,
    region: req.body.region,
    address: req.body.address,
    location: req.body.location,
    contact: req.body.contact,
    distributor: req.body.distributor,
    createdBy: req.body.createdBy,
  });
  try {
    let agentnew = await agent.save();
    res.status(201).json({
      message: "Agent has been created successfully",
      agentnew,
    });
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let agents = await Agent.find().populate("distributor")

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

router.get("/:id", async (req, res) => {
  try {
    let agent = await Agent.findById(req.params.id);
    res.status(200).json(agent);
  } catch (error) {
    res.json(error.message);
  }
});

export default router;
