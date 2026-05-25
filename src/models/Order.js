import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: mongoose.Types.ObjectId,
      ref: "Code",
      required: true,
    },
    transectionid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {}; // Prevent model overwrite in dev
const Order = mongoose.model("Order", schema);
export default Order;
