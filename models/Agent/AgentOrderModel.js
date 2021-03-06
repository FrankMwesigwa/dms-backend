import mongoose from "mongoose";

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const agentOrderSchema = new schema(
  {
    products: [
      {
        product: String,
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

const AgentOrder = mongoose.model("AgentOrder", agentOrderSchema);

export default AgentOrder;
