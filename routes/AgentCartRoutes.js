import express from "express";
import auth from "../middleware/auth.js";
import AgentCart from "../models/AgentCartModel.js";
import User from "../models/UserModel.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { agent, cartTotal } = req.body;
  let products = [];

  console.log("Cart Details Saved ====>", agent)

  const user = await User.findOne({ _id: req.user.id });
  let cartExistByThisUser = await AgentCart.findOne({ orderdBy: user.id });

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }

  for (let i = 0; i < agent.length; i++) {
    let object = {};

    object.product = agent[i]._id;
    object.count = agent[i].count;
    object.name = agent[i].name;
    object.amount = agent[i].amount;

    products.push(object);
  }

  try {
    let newCart = await new AgentCart({
      products,
      cartTotal,
      orderdBy: user.id,
    }).save();

    res.json({ ok: true, newCart });
  } catch (error) {
    res.json(error);
  }
});

router.get("/", auth,async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  try {
    let agent = await AgentCart.findOne({ orderdBy: user.id })
    .populate("product");

    const { products, cartTotal } = agent;
    res.json({ products, cartTotal});
  } catch (error) {
    res.json(error.message);
  }
});

export default router;
