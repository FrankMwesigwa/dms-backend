import mongoose from "mongoose";

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const agentCartSchema = new schema(
  {
    products: [
      {
        product: String,
        count: Number,
        amount: Number,
        name: String,
      },
    ],
    cartTotal: Number,
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const AgentCart = mongoose.model("AgentCart", agentCartSchema);

export default AgentCart;
