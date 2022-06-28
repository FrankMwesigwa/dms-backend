import express from "express";
import Product from "../models/ProductModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  let product = new Product({
    productname: req.body.productname,
    supplier: req.body.supplier,
    batchNo: req.body.batchNo,
    quantity: req.body.quantity,
    model: req.body.model,
    amount: req.body.amount,
    officeNo: req.body.officeNo,
    user: req.body.user,
    jobTitle: req.body.jobTitle,
    assignedDate: req.body.assignedDate,
    purchasedate: req.body.purchasedate,
    department: req.body.department,
    division: req.body.division,
    section: req.body.section,
  });
  try {
    let productnew = await product.save();
    res.status(201).json({
      message: "Product has been created successfully",
      productnew,
    });
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let products = await Product.find();

    if (!products) {
      res.json({
        message: "There are no products in the database at this time",
      });
    }
    res.status(200).json(products);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
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

router.patch("/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    let updatedproduct = await Product.findById(product._id);
    res.status(201).json({
      message: "Product successfully updated from database",
      data: updatedproduct,
    });
  } catch (error) {
    res.status(401).json({
      message: "Failed to update product in database",
      data: error,
    });
  }
});

export default router;
