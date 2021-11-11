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
};

export default apiGSV;
