import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Dimensions,
} from "react-native";

function VatTu(props) {

  const data = props.vattu.item;
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Danh sách vật tư</Text>
      </View>
      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            marginLeft: 40,
            backgroundColor: "#ff751a",
            borderRadius: 20,
          }}
        >
          <View
            style={{ position: "relative", marginTop: -20, marginLeft: -30 }}
          >
            <Image
              source={{
                uri: `http://10.3.53.160:5000/uploads/${data.vattu.hinhanh}`,
              }}
              style={{
                width: Dimensions.get("window").width - 220,
                height: 130,
                borderRadius: 20,
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>Tên :{data.vattu.ten}</Text>
            <Text style={{ color: "white" }}>
              Công dụng :{data.vattu.congdung}
            </Text>
            <Text style={{ color: "white" }}>Mô tả :{data.vattu.mota}</Text>
            <Text style={{ color: "white" }}>
              Số lượng :{data.soluong}
            </Text>
            <Text
              style={{
                color: "white",
                padding: 5,
                backgroundColor: "red",
                textAlign: "center",
                marginTop: 5,
                borderRadius: 10,
              }}
            >
              Báo lỗi
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  headerContainer: {
    backgroundColor: "#e65c00",
    paddingTop: 15,
    paddingBottom: 15,
    flex: 1,
    alignItems: "center",
  },
});
export default VatTu;
