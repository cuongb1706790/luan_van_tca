import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Dimensions,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import apiPhanphat from "../../../api/apiPhanPhat";

function RenderPhanPhat(props) {
  const { phanphat } = props;
  const { item: data } = phanphat;
  // console.log(data);
  const formatter = new Intl.NumberFormat("es");
  const handleComfirm = async () => {
    //call to send request
    try {
    } catch (error) {
      console.log("Error");
    }
  };
  return (
    <>
      <View style={{ marginBottom: 30 }} key={data.id} >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ padding: 10, backgroundColor: "#cccccc" }}>
            Ngày {data.ngaytao}
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: "white",
            borderColor: "#cccccc",
            borderWidth: 1,
            marginTop: 10,
            marginLeft: 50,
            marginRight: 40,
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              style={{ position: "relative", marginLeft: -55, marginTop: -5 }}
              name="logo-buffer"
              size={30}
              color="black"
            />
            <Ionicons
              style={{
                position: "relative",
                marginLeft: -3,
                marginTop: -3,
                transform: [{ rotate: "60deg" }],
              }}
              name="play"
              size={15}
              color="#cccccc"
            />
          </View>
          <View style={{ marginLeft: 3, position: "relative", marginTop: -30 }}>
            <Text>Mã đơn hàng : {data.madh}</Text>
            {data.productList.map((item, index) => (
              <>
                <Text>Sản phẩm {index + 1}</Text>
                <View style={{ marginLeft: 10 }} key={item.id}>
                  <Text>
                  <Ionicons name="square" size={5} color="black"  />
                    {" "}Tên sản phẩm : {item.tensp}
                  </Text>
                  <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Mã sản phẩm : {item.masp}</Text>
                  <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Số lượng : {item.soluong}</Text>
                  <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Đơn vị : {item.donvi}</Text>
                  <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Đơn giá : {formatter.format(item.dongia)} vnđ/m</Text>
                  {item.congcu &&
                    item.congcu.map((item, index) => (
                      <>
                        <View>
                          <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Công cụ {index + 1}</Text>
                        </View>
                        <View style={{ marginLeft: 40 }}>
                          <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Tên công cụ : {item.tencc}</Text>
                          <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Số lượng: {item.soluong}</Text>
                          <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Mô tả : {item.mota}</Text>
                        </View>
                      </>
                    ))}
                  {item.vattu &&
                    item.vattu.map((item, index) => (
                      <>
                        <View>
                          <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Vật tư {index + 1}</Text>
                        </View>
                        <View style={{ marginLeft: 40 }}>
                          <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Tên vật tư : {item.tenvt}</Text>
                          <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Số lượng: {item.soluong}</Text>
                          <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Mô tả : {item.mota}</Text>
                        </View>
                      </>
                    ))}
                  {item.nguyenlieu &&
                    item.nguyenlieu.map((item, index) => (
                      <>
                        <View>
                          <Text>Vật tư {index + 1}</Text>
                        </View>
                        <View style={{ marginLeft: 40 }}>
                          <Text>Tên vật tư : {item.tennl}</Text>
                          <Text>Số lượng: {item.soluong}</Text>
                          <Text>Mô tả : {item.mota}</Text>
                        </View>
                      </>
                    ))}
                </View>
              </>
            ))}
            <Text>Tổng tiền : {formatter.format(data.tongtien)} VNĐ</Text>
            <Text>Ngày gửi : {data.ngaytao}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            {data.daxacnhan === "true" ? (
              <Text style={[styles.btnClass, { backgroundColor: "#a6a6a6" }]}>
                Đã xác nhận
              </Text>
            ) : (
              <Text
                style={[styles.btnClass, { backgroundColor: "#0000e6" }]}
                onPress={handleComfirm}
              >
                Xác nhận
              </Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imgClass: {
    width: Dimensions.get("window").width - 300,
    height: 100,
    borderRadius: 5,
  },
  containerItem: {
    flexDirection: "row",
    marginLeft: 0,
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
  },
  containerText: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  txt: {
    color: "black",
  },
  btnClass: {
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 13,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: "white",
  },
});
export default RenderPhanPhat;
