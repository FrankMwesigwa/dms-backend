import mongoose from "mongoose";

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const agentSchema = new schema(
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

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
