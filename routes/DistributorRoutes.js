import express from "express";
import Distributor from "../models/DistributorModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let distributors = await Distributor.find().populate("user")
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
