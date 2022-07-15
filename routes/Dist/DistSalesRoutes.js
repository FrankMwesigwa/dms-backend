import express from "express";
import auth from "../../middleware/auth.js";
import User from "../../models/UserModel.js";
import DistSales from "../../models/Dist/DistSalesModel.js";
import DistProduct from "../../models/Dist/DistProductModel.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).exec();

  const { products } = req.body;

  let sale = new DistSales({
    products,
    orderdBy: user.id,
  });
  try {
    let newSale = await sale.save();
    res.status(201).json({
      ok: true,
      message: "Dist Sale has been created successfully",
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

    let updated = await DistProduct.bulkWrite(bulkOption, {});
  } catch (error) {
    res.json(error.message);
    console.log("DistProduct error =====>", error);
  }
});

router.get("/", auth, async (req, res) => {
    let user = await User.findOne({ _id: req.user.id });
    try {
      let sales = await DistSales.find({ orderdBy: user.id })
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

  router.get("/admin", auth, async (req, res) => {
    try {
      let sales = await DistSales.find()
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
