import express from "express";
import auth from "../../middleware/auth.js";
import User from "../../models/UserModel.js";
import DistCart from "../../models/Dist/DistCartModel.js";
import DistOrder from "../../models/Dist/DistOrderModel.js";
import Product from "../../models/ProductModel.js";
import DistProduct from "../../models/Dist/DistProductModel.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).exec();
  let { products } = await DistCart.findOne({ orderdBy: user.id }).exec();

  let orderTotal = 0;
  for (let i = 0; i < products.length; i++) {
    orderTotal = orderTotal + products[i].amount * products[i].count;
  }

  let order = new DistOrder({
    products,
    orderTotal,
    orderdBy: user.id,
  });

  let dist = new DistProduct({
    products,
    bacthNo: 1,
    dist: user.id,
  });
  try {
    let newOrder = await order.save();
    let distProd = await dist.save();

    res.status(201).json({
      ok: true,
      newOrder,
      distProd,
    });

    let bulkOption = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count } },
        },
      };
    });

    let updated = await Product.bulkWrite(bulkOption, {});
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/products", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user.id });

  try {
    let userOrders = await DistProduct.find({ dist: user.id });
    res.status(200).json(userOrders);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/admin/stock", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user.id });

  try {
    let userOrders = await DistProduct.find().sort("-createdAt");
    res.status(200).json(userOrders);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/admin", auth, async (req, res) => {
  try {
    let orders = await DistOrder.find().sort("-createdAt").populate("product");
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
    let orders = await DistOrder.find({ orderStatus: 'Completed' }).sort("-createdAt").populate("product");
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

  console.log("Updated Body ====>", req.body)
  try {
    let updated = await DistOrder.findByIdAndUpdate(
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
    let order = await DistOrder.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user.id });
  try {
    let orders = await DistOrder.find({ orderdBy: user.id }).sort("-createdAt").populate("product");
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

router.delete("/", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).exec();
  try {
    await DistCart.findOneAndRemove({ orderdBy: user.id }).exec();
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
