import mongoose from "mongoose";

const schema = mongoose.Schema;

const assetType = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    typecode: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdOn: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const AssetType = mongoose.model("AssetType", assetType);

export default AssetType;
