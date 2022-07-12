import mongoose from "mongoose";

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const distSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    region: {
      type: String,
    },
    address: {
      type: String,
    },
    location: {
      type: String,
    },
    contact: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Dist = mongoose.model("Dist", distSchema);

export default Dist;
