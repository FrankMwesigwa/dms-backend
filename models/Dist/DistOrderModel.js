import mongoose from "mongoose";

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        name: String,
        amount: Number,
      },
    ],
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Accepted",
        "Rejected",
        "Dispatched",
        "Completed",
      ],
    },
    orderTotal: Number,
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const DistOrder = mongoose.model("DistOrder", orderSchema);

export default DistOrder;
