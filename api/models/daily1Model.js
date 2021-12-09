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
    dssanpham: [
      {
        donhang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donhang",
        },
        sanpham: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sanpham",
        },
        soluong: Number,
        soluonghoanthanh: Number,
        ngaytao: String,
      },
    ],
    dscongcu: [
      {
        donhang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donhang",
        },
        congcu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Congcu",
        },
        soluong: Number, // = số lượng sp đặt * định mức công cụ
        ngaytao: String,
      },
    ],
    dsvattu: [
      {
        donhang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donhang",
        },
        vattu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vattu",
        },
        soluong: Number, // = số lượng sp đặt * định mức công cụ
        ngaytao: String,
      },
    ],
    dsnguyenlieu: [
      {
        donhang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donhang",
        },
        nguyenlieu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Nguyenlieu",
        },
        khoiluong: Number, // = số lượng sp đặt * định mức công cụ
        ngaytao: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Daily1 = mongoose.model("Daily1", daily1Schema);

module.exports = Daily1;
