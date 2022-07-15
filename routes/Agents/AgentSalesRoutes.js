import express from "express";
import auth from "../../middleware/auth.js";
import User from "../../models/UserModel.js";
import AgentOrder from "../../models/Agent/AgentOrderModel.js";
import AgentSales from "../../models/Agent/AgentSalesModel.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).exec();

  const { products } = req.body;

  let sale = new AgentSales({
    products,
    orderdBy: user.id,
  });
  try {
    let newSale = await sale.save();
    res.status(201).json({
      ok: true,
      message: "Agent Order has been created successfully",
      newSale,
    });

    let bulkOption = products.map((item) => {
      return {
        updateOne: {
          filter: { "products.product": item.product },
          update: { $inc: { "products.$.count": -item.sale } },
        },
      };
    });

    let updated = await AgentOrder.bulkWrite(bulkOption, {});
  } catch (error) {
    res.json(error.message);
    console.log("AgentOrder error =====>", error);
  }
});

router.get("/", auth, async (req, res) => {
    let user = await User.findOne({ _id: req.user.id });
    try {
      let sales = await AgentSales.find({ orderdBy: user.id })
      .sort("-createdAt")
      if (!sales) {
        res.json({
          message: "There are no sales in the database at this time",
        });
      }
      res.status(200).json(sales);
    } catch (error) {
      res.json(error.message);
    }
  });

export default router;
