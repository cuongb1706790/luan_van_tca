import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ListDonHang from "./ListDonHang";
import Ionicons from "react-native-vector-icons/Ionicons";

function ScreenDonHang(props) {
  const {navigation } = props;
  const orderList = [
    {
      id: 1,
      madh: "DH001",
      tongtien: 20000000,
      ngaytao: "12/2/2020",
      daxacnhan: "false",
      dagui: "chua",
      productList: [
        {
          id: 11,
          masp: "SP001",
          tensp: "Lụa Tân Châu",
          soluong: 1000,
          donvi: "mét",
          dongia: 20000,
          tiendo: '80%',
          congcu: [
            {
              id: 111,
              macc: "CC001",
              tencc: "Máy lấy tơ",
              mota: "mới",
              soluong: 10,
              donvi: "máy",
              hinhanh: "",
              ngaynhan: "12/2/2020",
            },
            {
              id: 112,
              macc: "CC002",
              tencc: "Máy dệt lụa",
              mota: "mới",
              soluong: 10,
              donvi: "máy",
              hinhanh: "",
              ngaynhan: "12/2/2020",
            },
          ],
          vattu: [
            {
              id: 112,
              mavt: "VT001",
              tenvt: "Thùng giấy",
              mota: "mới",
              soluong: 10,
              donvi: "máy",
              hinhanh: "",
              ngaynhan: "12/2/2020",
            },
          ],
        },
        {
          id: 12,
          masp: "SP002",
          tensp: "Vải thường",
          soluong: 1000,
          donvi: "mét",
          dongia: 10000,
          tiendo : '20%',
          congcu: [
            {
              id: 121,
              macc: "CC002",
              tencc: "Máy ủi",
              mota: "mới",
              soluong: 10,
              donvi: "máy",
              hinhanh: "",
              ngaynhan: "12/2/2020",
            },
          ],
        },
      ],
    },
  ];
  return (
    <SafeAreaView >
      {orderList && (
        <FlatList
          data={orderList}
          renderItem={(item, index) => <ListDonHang dataList={item} navigation={navigation} />}
          keyExtractor={(item) => item._id}
        />
      )}
       
    </SafeAreaView>
  );
}

export default ScreenDonHang;
