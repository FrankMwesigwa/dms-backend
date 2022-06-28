import express from "express";
import Order from "../models/OrderModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  let order = new Order({
    product: req.body.product,
    amount: req.body.amount,
    status: req.body.status,
    quantity: req.body.quantity,
    orderDate: req.body.orderDate,
    createdBy: req.body.createdBy,
    distributor: req.body.distributor
  });
  try {
    let newOrder = await order.save();
    res.status(201).json({
      message: "Order has been created successfully",
      newOrder,
    });
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let orders = await Order.find()
    .populate("product")
    .populate("distributor")
    if (!orders) {
      res.json({
        message: "There are no orders in the database at this time",
      });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.json(error.message);
  }
});

export default router;
