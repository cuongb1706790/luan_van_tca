const mongoose = require("mongoose");

const hodanSchema = new mongoose.Schema(
  {
    daidien: String,
    xa: String,
    tinh: String,
    huyen: String,
    sdt: String,
    cmnd: String,
    namsinh: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    langnghe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Langnghe",
    },
    loaisanpham: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoaiSanpham",
    },
    taikhoan: String,
    daily1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Daily1",
    },
    daily2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Daily2",
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
  },
  {
    timestamps: true,
  }
);

const Hodan = mongoose.model("Hodan", hodanSchema);

module.exports = Hodan;
