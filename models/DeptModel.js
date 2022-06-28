import mongoose from "mongoose";

const schema = mongoose.Schema;

const departmentSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;
