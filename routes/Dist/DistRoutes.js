import express from "express";
import Dist from "../../models/Dist/DistModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let distributors = await Dist.find().populate("user");

    console.log("Distr ====>", distributors)
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
    let distributor = await Dist.findById(req.params.id);
    res.status(200).json(distributor);
  } catch (error) {
    res.json(error.message);
  }
});

export default router;
