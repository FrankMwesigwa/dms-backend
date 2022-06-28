import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
    },
    lname: {
      type: String,
    },
    phone: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
