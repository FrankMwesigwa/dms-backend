import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/UserModel.js";
import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";
import DistProduct from "../models/DistProductModel.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).exec();
  let { products } = await Cart.findOne({ orderdBy: user.id }).exec();

  console.log("dist products ====>", products)

  let orderTotal = 0;
  for (let i = 0; i < products.length; i++) {
    orderTotal = orderTotal + products[i].amount * products[i].count;
  }

  let order = new Order({
    products,
    orderTotal,
    orderdBy: user.id,
  });

  let dist = new DistProduct({
    products,
    bacthNo: 1,
    distributor: user.id,
  })
  try {
    // let newOrder = await order.save();
    let distProd = await dist.save();

    res.status(201).json({
      ok: true,
      // newOrder,
      distProd
    });

    console.log("saved dist products ====>", dist)

    // let bulkOption = products.map((item) => {
    //   return {
    //     updateOne: {
    //       filter: { _id: item.product._id },
    //       update: { $inc: { quantity: -item.count } },
    //     },
    //   };
    // });

    // let updated = await Product.bulkWrite(bulkOption, {});
  } catch (error) {
    res.json(error.message);
    console.log("Order error =====>", error)
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let orders = await Order.find().populate("product");
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

router.get("/:id", auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/history", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user.id });
  try {
    let userOrders = await Order.findOne({ orderdBy: user.id }).populate("product");
    res.status(200).json(userOrders);
  } catch (error) {
    res.json(error.message);
  }
});

router.delete("/", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).exec();
  try {
    await Cart.findOneAndRemove({ orderdBy: user.id }).exec();
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
