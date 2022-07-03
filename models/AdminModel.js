import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const schema = mongoose.Schema;

const adminschema = new schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  phone: {
    type: Number,
  },
  sex: {
    type: String,
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
});
const Admin = mongoose.model("Admin", adminschema);

export default Admin;
