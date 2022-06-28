import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const schema = mongoose.Schema;

const productSchema = new schema(
  {
    productname: {
      type: String,
    },
    batchNo: {
      type: String,
    },
    supplier: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    officeNo: {
      type: String,
    },
    user: {
      type: String,
    },
    assignedDate: {
      type: Date,
    },
    purchasedate: {
      type: Date,
    },
    amount: {
      type: Number,
    },
    department: {
      type: String,
    },
    division: {
      type: String,
    },
    section: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
