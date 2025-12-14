const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "Project Status is required"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    location: {
      type: String,
      required: [true, "Project location is required"],
    },
    thumbnailUrl: {
      type: String,
      required: [true, "Thumbnail image URL is required"],
    },
    gallery: [
      {
        type: String, // each string is a URL
      },
    ],
    date: {
      type: Date,
      required: [true, "Project date is required"],
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Project", projectSchema);
