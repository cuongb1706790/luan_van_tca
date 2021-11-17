import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import hodanApi from "../../api/hodanApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderPhanPhat from "./RenderPhanPhat";
function ThongBao(props) {
  // const [infoHoDan, setInfoHoDan] = useState();
  const [dsPhat, setDsPhat] = useState();
  const [hoDan, setHoDan] = useState("");
  const [dsPhatVatTu, setDsPhatVatTu] = useState("");
  const [dsPhatCC, setDsPhatCC] = useState("");
  useEffect(() => {
    (async () => {
      //get info hodan
      const dataHodan = await hodanApi.getAll();
      //get id Account
      const dataAccount = await AsyncStorage.getItem("user");
      const findHoDan = dataHodan.hodan.find((item) => {
        return dataAccount.includes(item.user._id);
      });
      setHoDan(findHoDan);
      const getDsPhanPhat = await hodanApi.dsPhanphat(findHoDan._id);
      setDsPhat(getDsPhanPhat.dsphanphat);
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item._id}</Text>
    </View>
  );
  // const Item = ({ data }) => (
  //   <View >
  //     <Text>{data._id}</Text>
  //   </View>
  // );
  const orderList = [
    {
      id: 1,
      madh: "DH001",
      tongtien: 20000000,
      ngaytao: "12/2/2020",
      daxacnhan: "false",
      productList: [
        {
          id: 11,
          masp: "SP001",
          tensp: "Lụa Tân Châu",
          soluong: 1000,
          donvi: "mét",
          dongia: 20000,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Thông báo gần đây</Text>
      </View>
      {orderList && (
        <FlatList
          data={orderList}
          renderItem={(item, index) => <RenderPhanPhat phanphat={item} />}
          keyExtractor={(item) => item._id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerContainer: {
    backgroundColor: "#e65c00",
    paddingTop: 10,
    paddingBottom: 30,
    flex: 1,
    alignItems: "center",
  },
});
export default ThongBao;
