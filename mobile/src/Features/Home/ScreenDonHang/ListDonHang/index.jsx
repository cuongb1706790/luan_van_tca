import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function ListDonHang(props) {
  const {
    dataList: { item : data }, navigation
  } = props;
  const handleClickOrder = ()=>{
    navigation.navigate('DonHang', {data});
    // console.log('alo alo');
  }
//    console.log(data);
  return (

    <View
      style={{
        flexDirection: "row",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <Text style={{ marginRight: 10 }} onPress={handleClickOrder}>
        <Ionicons name="cart" size={50} color="black" />
      </Text>
      <View style={{ marginRight: 10 }}>
        <Text>Mã đơn hàng : {data.madh}</Text>
        <Text>Thời gian : {data.ngaytao}</Text>
      </View>
      <Text style={[styles.btnClass, { backgroundColor: "red" }]}>
        Giao hàng
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  btnClass: {
    padding: 10,
    borderRadius: 10,
    color: "white",
  },
});
export default ListDonHang;
