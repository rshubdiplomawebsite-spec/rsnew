import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    transactionid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {}; // Prevent model overwrite in dev
const Purchases = mongoose.model("Purchases", schema);
export default Purchases;
