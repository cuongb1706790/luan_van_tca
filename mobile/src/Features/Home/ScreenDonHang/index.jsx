import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ListDonHang from "./ListDonHang";
import Ionicons from "react-native-vector-icons/Ionicons";
import hodanApi from "../../../api/hodanApi";

function ScreenDonHang(props) {
  const {navigation, hodanId } = props;
  // console.log(hodanId);
  const [orderList, setOrderList] = useState();
  useEffect(() => {
    (async () => {
      const getListOrder = await hodanApi.dsDonhang(hodanId);
      setOrderList(getListOrder.dsdonhang);
    })();
  }, []);
  // console.log(orderList)
 
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
