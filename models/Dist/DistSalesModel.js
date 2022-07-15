import mongoose from "mongoose";

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const distSalesSchema = new schema(
  {
    products: [
      {
        product: String,
        count: Number,
        name: String,
        amount: Number,
        sale: Number,
        salePrice: Number,
      },
    ],
    saleTotal: Number,
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const DistSales = mongoose.model("DistSales", distSalesSchema);

export default DistSales;
