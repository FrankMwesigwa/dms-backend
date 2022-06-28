import mongoose from "mongoose";

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const cartSchema = new schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        price: Number,
      },
    ],
    cartTotal: Number,
    // orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
