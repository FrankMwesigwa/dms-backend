import express from "express";
import Distributor from "../models/DistributorModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  let distributor = new Distributor({
    name: req.body.name,
    region: req.body.region,
    address: req.body.address,
    location: req.body.location,
    contact: req.body.contact,
    createdBy: req.body.createdBy,
  });
  try {
    let distributornew = await distributor.save();
    res.status(201).json({
      message: "Distributor has been created successfully",
      distributornew,
    });
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let distributors = await Distributor.find().populate("product")
    if (!distributors) {
      res.json({
        message: "There are no distributors in the database at this time",
      });
    }
    res.status(200).json(distributors);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let distributor = await Distributor.findById(req.params.id);
    res.status(200).json(distributor);
  } catch (error) {
    res.json(error.message);
  }
});

export default router;
