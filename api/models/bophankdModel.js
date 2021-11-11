const mongoose = require("mongoose");

const bophankdSchema = new mongoose.Schema(
  {
    ten: String,
    sdt: String,
    email: String,
    xa: String,
    huyen: String,
    tinh: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    congcu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Congcu",
      },
    ],
    vattu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vattu",
      },
    ],
    nguyenlieu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nguyenlieu",
      },
    ],
    sanpham: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sanpham",
      },
    ],
    daily1: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily1",
      },
    ],
    daily2: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily2",
      },
    ],
    giamsatvung: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Giamsatvung",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Bophankd = mongoose.model("Bophankd", bophankdSchema);

module.exports = Bophankd;
