import axiosClient from "./axiosClient";

const hodanApi = {
  getAll(params) {
    const url = "/hodan/danhsach";
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/hodan/single/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/hodan/them`;
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/hodan/single/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/hodan/single/${id}`;
    return axiosClient.delete(url);
  },
  // them ho dan
  themHodan(data) {
    const url = "/hodan/them";
    return axiosClient.post(url, data);
  },

  // chinh sua 1 ho dan
  suaHodan(hodanId, data) {
    const url = `/hodan/single/${hodanId}`;
    return axiosClient.put(url, data);
  },

  // danh sach ho dan
  dsHodan() {
    const url = "/hodan/danhsach";
    return axiosClient.get(url);
  },

  // danh sach ho dan thuoc langngheId
  dsHodanThuoc1Langnghe(langngheId) {
    const url = `/hodan/danhsach/${langngheId}`;
    return axiosClient.get(url);
  },

  // danh sach ho dan co' daily 2 null
  dsHodanDaily2Null(langngheId) {
    const url = "/hodan/dsdaily2null";
    return axiosClient.get(url);
  },

  // search ho dan
  searchHodan(query) {
    const url = `/hodan/search?${query}`;
    return axiosClient.get(url);
  },

  // lay thong tin 1 ho dan
  singleHodan(id) {
    const url = `/hodan/single/${id}`;
    return axiosClient.get(url);
  },

  // xoa 1 ho dan
  xoa1Hodan(id) {
    const url = `/hodan/single/${id}`;
    return axiosClient.delete(url);
  },

  // xoa nhieu ho dan
  xoaNhieuHodan(arrOfId) {
    const url = `/hodan/multiple`;
    return axiosClient.put(url, arrOfId);
  },

  // lay hodan info based userId
  singleHodanBasedUser(userId) {
    const url = `/hodan/singlehdbaseduser/${userId}`;
    return axiosClient.get(url);
  },

  // lay thong tin 1 phan phat thuoc hodan
  singlePhanphat(hodanId, phanphatId) {
    const url = `/hodan/singlephanphat/${hodanId}/${phanphatId}`;
    return axiosClient.get(url);
  },

  //===============================
  // lay danh sach phan phat  thuoc ho dan
  dsPhanphat(hodanId) {
    const url = `/hodan/dsphanphat/${hodanId}`;
    return axiosClient.get(url);
  },
  // lay danh sach phan phat CONG CU thuoc ho dan
  dsCongcuPhanphat(hodanId) {
    const url = `/hodan/dscongcuphanphat/${hodanId}`;
    return axiosClient.get(url);
  },

  // lay danh sach phan phat VAT TU thuoc ho dan
  dsVattuPhanphat(hodanId) {
    const url = `/hodan/dsvattuphanphat/${hodanId}`;
    return axiosClient.get(url);
  },

  // lay danh sach CONG CU thuoc ho dan
  dsCongcu(hodanId) {
    const url = `/hodan/dscongcu/${hodanId}`;
    return axiosClient.get(url);
  },

  // lay danh sach VAT TU thuoc ho dan
  dsVattu(hodanId) {
    const url = `/hodan/dsvattu/${hodanId}`;
    return axiosClient.get(url);
  },
  // lay danh sach NGUYEN Lieu thuoc ho dan
  dsNguyenlieu(hodanId) {
    const url = `/hodan/dsnguyenlieu/${hodanId}`;
    return axiosClient.get(url);
  },
  // lay ds don hang thuoc hodan
  dsDonhang(hodanId) {
    const url = `/hodan/dsdonhang/${hodanId}`;
    return axiosClient.get(url);
  },
  // xac nhan don hang thuoc hodan
  xacnhan(hodanId, donhangId) {
    const url = `/hodan/xacnhandh/${hodanId}/${donhangId}`;
    return axiosClient.put(url);
  },
  // them cong cu hu loi
  themCongcuHuloi(hodanId, payload) {
    const url = `/hodan/themcchuloi/${hodanId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds cong cu hu loi
  dsCongcuHuloi(hodanId) {
    const url = `/hodan/dscchuloi/${hodanId}`;
    return axiosClient.get(url);
  },

  //-------------

  // them vat tu hu loi
  themVattuHuloi(hodanId, payload) {
    const url = `/hodan/themvthuloi/${hodanId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds vat tu hu loi
  dsVattuHuloi(hodanId) {
    const url = `/hodan/dsvthuloi/${hodanId}`;
    return axiosClient.get(url);
  },

  //-------------

  // them nguyen lieu hu loi
  themNguyenlieuHuloi(hodanId, payload) {
    const url = `/hodan/themnglhuloi/${hodanId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds nguyen lieu hu loi
  dsNguyenlieuHuloi(hodanId) {
    const url = `/hodan/dsnglhuloi/${hodanId}`;
    return axiosClient.get(url);
  },
};

export default hodanApi;
