import axiosClient from "./axiosClient";

const apiGSV = {
  // them gsv
  themGsv(data) {
    const url = "/gsv/them";
    return axiosClient.post(url, data);
  },

  // lay thong tin 1 gsv
  singleGsv(gsvId) {
    const url = `/gsv/single/${gsvId}`;
    return axiosClient.get(url);
  },

  // sua thong tin 1 gsv
  chinhsuaGsv(gsvId, data) {
    const url = `/gsv/single/${gsvId}`;
    return axiosClient.put(url, data);
  },

  // xoa nhieu` gsv
  xoaNhieuGsv(arrayOfId) {
    const url = `/gsv/multiple`;
    return axiosClient.put(url, arrayOfId);
  },

  // lay thong tin 1 gsv based useId
  singleGsvBasedUserId(userId) {
    const url = `/gsv/baseduserid/${userId}`;
    return axiosClient.get(url);
  },

  // lay ds gsv
  dsGsv() {
    const url = "/gsv/danhsach";
    return axiosClient.get(url);
  },

  // lay ds gsv chưa có bộ phận kinh doanh
  dsGSVBpkdNull() {
    const url = "/gsv/dsgsvbpkdnull";
    return axiosClient.get(url);
  },

  // lay ds dai ly 1 thuoc giam sat vung
  dsDaily1(gsvId) {
    const url = `/gsv/dsdaily1/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds dai ly 2 thuoc giam sat vung
  dsDaily2(gsvId) {
    const url = `/gsv/dsdaily2/${gsvId}`;
    return axiosClient.get(url);
  },

  // Active dai ly 2
  activeDaily2(daily2Id, gsvId) {
    const url = `/gsv/duyet/${daily2Id}/${gsvId}`;
    return axiosClient.put(url);
  },

  // lay ds don hang thuoc gsv
  dsDonhang(gsvId) {
    const url = `/gsv/dsdonhang/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds SUB don hang thuoc giamsatvung
  dsSubDonhang(gsvId, madh) {
    const url = `/gsv/dssubdonhang/${gsvId}/${madh}`;
    return axiosClient.get(url);
  },

  // lay ds san pham thuoc gsv
  dsSanpham(gsvId) {
    const url = `/gsv/dssanpham/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds cong cu thuoc gsv
  dsCongcu(gsvId) {
    const url = `/gsv/dscongcu/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds vat tu thuoc gsv
  dsVattu(gsvId) {
    const url = `/gsv/dsvattu/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds cong cu thuoc gsv
  dsNguyenlieu(gsvId) {
    const url = `/gsv/dsnguyenlieu/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay so lieu tong quan
  tongquan(gsvId) {
    const url = `/gsv/tongquan/${gsvId}`;
    return axiosClient.get(url);
  },
<<<<<<< HEAD
=======

  // lay ds daily2, donhang chua duyet hien thi badge
  dsShowBadge(gsvId) {
    const url = `/gsv/dsshowbadge/${gsvId}`;
    return axiosClient.get(url);
  },
>>>>>>> khanhduy
};

export default apiGSV;
