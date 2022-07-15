import express from "express";
import auth from "../../middleware/auth.js";
import User from "../../models/UserModel.js";
import AgentCart from "../../models/Agent/AgentCartModel.js";
import AgentOrder from "../../models/Agent/AgentOrderModel.js";
import DistProduct from "../../models/Dist/DistProductModel.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).exec();

  const { products, cartTotal } = await AgentCart.findOne({
    orderdBy: user.id,
  }).exec();

  let order = new AgentOrder({
    products,
    cartTotal,
    orderdBy: user.id,
  });
  try {
    let newOrder = await order.save();
    res.status(201).json({
      ok: true,
      message: "Agent Order has been created successfully",
      newOrder,
    });

    let bulkOption = products.map((item) => {
      return {
        updateOne: {
          filter: { "products._id": item.product },
          update: { $inc: { "products.$.count": -item.count } },
        },
      };
    });

    let updated = await DistProduct.bulkWrite(bulkOption, {});
  } catch (error) {
    res.json(error.message);
    console.log("AgentOrder error =====>", error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let orders = await AgentOrder.find().sort("-createdAt").populate("product");
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

router.get("/products", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user.id });
  try {
    let orders = await AgentOrder.find({ orderdBy: user.id })
    .sort("-createdAt")
    .populate("product");
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

router.get("/sales", auth, async (req, res) => {
  try {
    let orders = await AgentOrder.find({ orderStatus: "Completed" })
      .sort("-createdAt")
      .populate("product");
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

router.put("/update", auth, async (req, res) => {
  const { orderId, orderStatus } = req.body;
  try {
    let updated = await AgentOrder.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    let order = await AgentOrder.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/history", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user.id });
  try {
    let userOrders = await AgentOrder.findOne({ orderdBy: user.id });
    console.log("User Orders ===>", userOrders);
    res.status(200).json(userOrders);
  } catch (error) {
    res.json(error.message);
  }
});

router.delete("/", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).exec();
  try {
    await AgentCart.findOneAndRemove({ orderdBy: user.id }).exec();
    res
      .status(201)
      .json({ message: "Product successfully deleted from database" });
  } catch (error) {
    res.status(401).json({
      message: "Failed to delete product in database",
      data: error,
    });
  }
});

export default router;
