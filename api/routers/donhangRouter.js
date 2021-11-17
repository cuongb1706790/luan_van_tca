const express = require("express");
const Bophankd = require("../models/bophankdModel");
const Donhang = require("../models/donhangModel");
const Giamsatvung = require("../models/giamsatvungModel");
const { getCurrentDatetime } = require("../utils");
const donhangRouter = express.Router();

// them don hang
donhangRouter.post("/them", async (req, res) => {
  const {
    ma,
    dssanpham,
    tongsanpham,
    dscongcu,
    tongcongcu,
    dsvattu,
    tongvattu,
    dsnguyenlieu,
    tongnguyenlieu,
    tongdongia,
  } = req.body;
  try {
    const newDH = new Donhang({
      ma,
      dssanpham,
      tongsanpham,
      dscongcu,
      tongcongcu,
      dsvattu,
      tongvattu,
      dsnguyenlieu,
      tongnguyenlieu,
      tongdongia,
      ngaytao: getCurrentDatetime(),
      donhanggoc: true,
      dasudung: false,
    });
    const savedDH = await newDH.save();

    res.send({ savedDH, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Lấy ALL ds đơn hàng là đơn hàng gốc
donhangRouter.get("/alldanhsach", async (req, res) => {
  try {
    let donhang = await Donhang.find({})
      .populate({
        path: "dssanpham",
        populate: {
          path: "sanpham loaisanpham",
          populate: {
            path: "dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "congcu vattu nguyenlieu",
            },
          },
        },
      })
      .sort({ createdAt: "desc" });

    donhang = donhang.filter((dh) => dh.donhanggoc);

    res.send({ donhang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Lấy ds đơn hàng gốc chưa dược sử dụng
donhangRouter.get("/danhsach", async (req, res) => {
  try {
    let donhang = await Donhang.find({})
      .populate({
        path: "dssanpham",
        populate: {
          path: "sanpham loaisanpham",
          populate: {
            path: "dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "congcu vattu nguyenlieu",
            },
          },
        },
      })
      .sort({ createdAt: "desc" });

    donhang = donhang.filter((dh) => dh.donhanggoc && !dh.dasudung);

    res.send({ donhang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lấy 1 đơn hàng gốc bất kì
donhangRouter.get("/single/:id", async (req, res) => {
  try {
    const donhang = await Donhang.findById(req.params.id)
      .populate({
        path: "dssanpham dscongcu dsvattu dsnguyenlieu",
        populate: {
          path: "sanpham congcu vattu nguyenlieu",
        },
      })
      .populate({
        path: "dssanpham",
        populate: {
          path: "sanpham",
          populate: {
            path: "loaisanpham",
          },
        },
      })
      .populate({
        path: "from",
        populate: {
          path: "bophankd",
        },
      });

    res.send({ donhang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// bophankds send donhang -> gsv
donhangRouter.put("/bophankdtogsv", async (req, res) => {
  const { donhangId, dsdonhang, bophankdId } = req.body;
  try {
    // Donhang coll
    const donhang = await Donhang.findById(donhangId);
    donhang.from = { bophankd: bophankdId };
    donhang.dasudung = true;
    donhang.ngaydathang = getCurrentDatetime();
    const savedDonhang = await donhang.save();
    // Bophankd coll
    let dsspTemp = donhang.dssanpham.map((sp) => ({
      donhang: savedDonhang._id.toString(),
      sanpham: sp.sanpham,
      soluong: sp.soluong,
      soluonghoanthanh: sp.soluonghoanthanh,
      ngaytao: savedDonhang.ngaydathang,
    }));
    let dsccTemp = donhang.dscongcu.map((cc) => ({
      donhang: savedDonhang._id.toString(),
      congcu: cc.congcu,
      soluong: cc.soluong,
      ngaytao: savedDonhang.ngaydathang,
    }));
    let dsvtTemp = donhang.dsvattu.map((vt) => ({
      donhang: savedDonhang._id.toString(),
      vattu: vt.vattu,
      soluong: vt.soluong,
      ngaytao: savedDonhang.ngaydathang,
    }));
    let dsnglTemp = donhang.dsnguyenlieu.map((ngl) => ({
      donhang: savedDonhang._id.toString(),
      nguyenlieu: ngl.nguyenlieu,
      khoiluong: ngl.khoiluong,
      ngaytao: savedDonhang.ngaydathang,
    }));
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.dssanpham = [...dsspTemp, ...bophankd.dssanpham];
    bophankd.dscongcu = [...dsccTemp, ...bophankd.dscongcu];
    bophankd.dsvattu = [...dsvtTemp, ...bophankd.dsvattu];
    bophankd.dsnguyenlieu = [...dsnglTemp, ...bophankd.dsnguyenlieu];
    await bophankd.save();

    for (const item of dsdonhang) {
      const newDH = new Donhang({
        ...item,
      });
      const savedDH = await newDH.save();
      // Giamsatvung coll
      const gsv = await Giamsatvung.findById(item.to.giamsatvung);
      gsv.donhang = [savedDH._id, ...gsv.donhang];
      await gsv.save();
      // Bophankd coll
      const bpkd = await Bophankd.findById(bophankdId);
      bpkd.donhang = !bpkd.donhang.includes(donhangId)
        ? [donhangId, ...bpkd.donhang]
        : bpkd.donhang;
      bpkd.subdonhang = [savedDH._id, ...bpkd.subdonhang];
      await bpkd.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = donhangRouter;
