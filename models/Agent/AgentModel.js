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
    dist: {
      type: ObjectId,
      ref: "Dist",
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    createdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
