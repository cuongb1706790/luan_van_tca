const mongoose = require("mongoose");

const daily2Schema = new mongoose.Schema(
  {
    ten: String,
    sdt: String,
    email: String,
    xa: String,
    huyen: String,
    tinh: String,
    hodan: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hodan",
      },
    ],
    daily1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Daily1",
    },
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

const Daily2 = mongoose.model("Daily2", daily2Schema);

module.exports = Daily2;
