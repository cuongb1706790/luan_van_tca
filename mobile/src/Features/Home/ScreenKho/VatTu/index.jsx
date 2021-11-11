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
  const vattu = props.vattu;
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
                uri: `http://10.3.53.160:5000/uploads/${vattu.vattu.hinhanh}`,
              }}
              style={{
                width: Dimensions.get("window").width - 220,
                height: 150,
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
            <Text style={{ color: "white" }}>Tên :{vattu.vattu.ten}</Text>
            <Text style={{ color: "white" }}>
              Công dụng :{vattu.vattu.congdung}
            </Text>
            <Text style={{ color: "white" }}>Mô tả :{vattu.vattu.mota}</Text>
            <Text style={{ color: "white" }}>
              Số lượng :{vattu.soluongphanphat}
            </Text>
            <Text style={{ color: "white" }}>
              Người gửi :{vattu.phanphat.to.daily2.ten}
            </Text>
            <Text style={{ color: "white" }}>
              Ngày nhận :{vattu.ngaytiepnhan}
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
