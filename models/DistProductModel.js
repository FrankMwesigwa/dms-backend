import mongoose from "mongoose";

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const distProductSchema = new schema(
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
    bacthNo: Number,
    distributor: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const DistProduct = mongoose.model("DistProduct", distProductSchema);

export default DistProduct;
