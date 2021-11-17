import axiosClient from "./axiosClient";

const apiDonhang = {
  // them loai san pham
  themDonhang(data) {
    const url = "/donhang/them";
    return axiosClient.post(url, data);
  },

  // Lấy ALL ds đơn hàng là đơn hàng gốc
  allDsDonhang() {
    const url = "/donhang/alldanhsach";
    return axiosClient.get(url);
  },

  // Lấy ds đơn hàng chưa dược sử dụng
  dsDonhang() {
    const url = "/donhang/danhsach";
    return axiosClient.get(url);
  },

  // lay 1 don hang
  singleDonhang(id) {
    const url = `/donhang/single/${id}`;
    return axiosClient.get(url);
  },

  // bophankds send donhang -> gsv
  bophankdToGsv(payload) {
    const url = `/donhang/bophankdtogsv`;
    return axiosClient.put(url, payload);
  },
};

export default apiDonhang;
