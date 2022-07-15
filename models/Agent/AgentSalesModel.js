import mongoose from "mongoose";

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const agentSalesSchema = new schema(
  {
    products: [
      {
        product: String,
        count: Number,
        name: String,
        amount: Number,
        sale: Number,
        salePrice: Number
      },
    ],
    orderTotal: Number,
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const AgentSales = mongoose.model("AgentSales", agentSalesSchema);

export default AgentSales;
