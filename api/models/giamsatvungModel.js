const mongoose = require("mongoose");

const giamsatvungSchema = new mongoose.Schema(
  {
    ten: String,
    sdt: String,
    email: String,
    cmnd: String,
    xa: String,
    huyen: String,
    tinh: String,
    loaisanpham: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoaiSanpham",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bophankd: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bophankd",
    },
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
  },
  {
    timestamps: true,
  }
);

const Giamsatvung = mongoose.model("Giamsatvung", giamsatvungSchema);

module.exports = Giamsatvung;
