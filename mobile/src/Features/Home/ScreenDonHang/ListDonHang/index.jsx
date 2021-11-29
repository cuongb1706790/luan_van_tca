import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function ListDonHang(props) {
  const {
    dataList: { item: data },
    navigation,
  } = props;
  let checkComplelteOrder = false;
  const numberCompleteOrder = data.dssanpham.filter(item=>(item.soluong === item.soluonghoanthanh)).length;
  if(numberCompleteOrder === data.dssanpham.length)
  {
    checkComplelteOrder = true;
  }
  // console.log(checkComplelteOrder);
  const handleClickOrder = () => {
    navigation.navigate("DonHang", { data });
  };
  //check complete order

// console.log(data);
  return (
    <>
      {data.xacnhan && (
        <View
          style={{
            flexDirection: "row",
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 5,
            borderRadius: 10,
            backgroundColor: "white",
            alignItems: "center",
            marginBottom : 20
          }}
        >
          <Text style={{ marginRight: 10 }} onPress={handleClickOrder}>
            <Ionicons name="cart" size={50} color="black" />
          </Text>
          <View style={{ marginRight: 10 }}>
            <Text>Mã đơn hàng : {data.ma}</Text>
            <Text>Thời gian : {data.ngaytao}</Text>
          </View>
          {
            checkComplelteOrder ? (
              <Text style={[styles.btnClass, { backgroundColor: "green",fontSize : 9 }]}>
              Đã hoàn thành
            </Text>
            ) : (
              <Text style={[styles.btnClass, { backgroundColor: "red",fontSize : 9 }]}>
              Chưa hoàn thành
            </Text>
            )
          }
         
        </View>
      )}
    </>
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
