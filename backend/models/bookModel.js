const mongoose = require("mongoose");
const { Schema } = mongoose;

const books = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookFile: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    coverImage: {
      url: { type: String },
      publicId: { type: String },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", books);

module.exports = Books;
