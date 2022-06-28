import express from "express";
import Cart from "../models/CartModel.js";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { cart } = req.body;
  let products = [];

  const user = await User.findOne({ email: req.user.email });

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;

    let { amount } = await Product.findById(cart[i]._id)
      .select("amount")
      .exec();
    object.amount = amount;

    products.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].amount * products[i].count;
  }

  try {
    let newCart = await new Cart({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();

    console.log("new cart ----> ", newCart);
    res.json({ ok: true });
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/", async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  try {
    let cart = await Cart.findOne({ orderdBy: user._id }).populate(
      "products.product",
      "_id title price totalAfterDiscount"
    );

    const { products, cartTotal, totalAfterDiscount } = cart;
    res.json({ products, cartTotal, totalAfterDiscount });
  } catch (error) {
    res.json(error.message);
  }
});

export default router;
