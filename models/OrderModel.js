import mongoose from "mongoose";

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new schema(
  {
    orderDate: {
      type: Date,
    },
    approvalDate: {
      type: Date,
    },
    status: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    product: {
      type: ObjectId,
      ref: "Product",
    },
    distributor: {
      type: ObjectId,
      ref: "Distributor",
    },
    createdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
