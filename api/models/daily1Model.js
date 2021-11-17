const mongoose = require("mongoose");

const daily1Schema = new mongoose.Schema(
  {
    ten: String,
    sdt: String,
    email: String,
    xa: String,
    huyen: String,
    tinh: String,
    daily2: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily2",
      },
    ],
    hodan: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hodan",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    taikhoan: String,
    giamsatvung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Giamsatvung",
    },
    loaisanpham: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoaiSanpham",
      },
    ],
    bophankd: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bophankd",
    },
    active: {
      type: Boolean,
      default: false,
    },
    donhang: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donhang",
      },
    ],
    subdonhang: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donhang",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Daily1 = mongoose.model("Daily1", daily1Schema);

module.exports = Daily1;
