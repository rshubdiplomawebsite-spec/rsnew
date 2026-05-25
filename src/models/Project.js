import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    technology: [
      {
        type: String,
      },
    ],
    category: String,
    url: String,
    isFree: {
      type: Boolean,
      required: true, // ✅ FIXED
    },
    github: String,
    difficulty: String,
    duration: String,
  },
  {
    timestamps: true,
  }
);

mongoose.models = {}; // Prevent model overwrite in dev
const Project = mongoose.model("Project", schema);
export default Project;
