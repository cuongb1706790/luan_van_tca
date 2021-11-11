import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
} from "react-native";

function RenderPhanPhat(props) {
  const phanPhat = props.phanphat.item;
  console.log("Phan phat :",phanPhat);
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text>Ngày {phanPhat.phanphat.ngaytao} </Text>
        <Text>
          {phanPhat.phanphat.to.daily2.ten} đã gửi{" "}
          {phanPhat.phanphat.items.length} loại
          {phanPhat.phanphat.phanphattype === "congcu" ? " công cụ" : " vật tư"}
        </Text>
      </View>

      {phanPhat.phanphat.phanphattype === "congcu"
        ? phanPhat.phanphat.items.map((item) => (
            <View key={item._id}>
              <View></View>
              <View>
                <Text>{item.congcu.ten}</Text>
                <Text>Số lượng : {item.soluongphanphat}</Text>
              </View>
            </View>
          ))
        : phanPhat.phanphat.items.map((item) => (
            <View key={item._id}>
              <View></View>
              <View>
                <Text>{item.vattu.ten}</Text>
                <Text>Số lượng : {item.soluongphanphat}</Text>
              </View>
            </View>
          ))}

      <View>
        <Text>Xác nhận</Text>
      </View>
    </View>
  );
}
const style = StyleSheet.create({});
export default RenderPhanPhat;
