import mongoose from "mongoose";

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const distributorSchema = new schema(
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
    createdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Distributor = mongoose.model("Distributor", distributorSchema);

export default Distributor;
