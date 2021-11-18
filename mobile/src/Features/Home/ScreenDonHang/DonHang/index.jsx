import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import StickyHeaderFooterScrollView from "react-native-sticky-header-footer-scroll-view";
function DonHang(props) {
  const data = props.route.params.data;
  const {navigation } = props;
  const formatter = new Intl.NumberFormat("es");
  return (
    <SafeAreaView style={{flex : 1,marginTop : 20}}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Thông tin đơn hàng</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ marginLeft: 20 }}>
            <Text>Mã đơn hàng : {data.madh}</Text>
            {data.productList.map((item, index) => (
              <>
                <Text>Sản phẩm {index + 1}</Text>
                <View style={{ marginLeft: 10 }}>
                  <Text>
                    <Ionicons name="square" size={5} color="black" /> Tên sản
                    phẩm : {item.tensp}
                  </Text>
                  <Text>
                    <Ionicons name="square" size={5} color="black" /> Mã sản
                    phẩm : {item.masp}
                  </Text>
                  <Text>
                    <Ionicons name="square" size={5} color="black" /> Số lượng :{" "}
                    {item.soluong}
                  </Text>
                  <Text>
                    <Ionicons name="square" size={5} color="black" /> Đơn vị :{" "}
                    {item.donvi}
                  </Text>
                  <Text>
                    <Ionicons name="square" size={5} color="black" /> Đơn giá :{" "}
                    {formatter.format(item.dongia)} vnđ/m
                  </Text>
                  <Text style={{color : 'blue'}}>
                    <Ionicons name="square" size={5} color="black" /> Tiến độ hoàn thành :{" "}
                    {item.tiendo}
                  </Text>
                  {item.congcu &&
                    item.congcu.map((item, index) => (
                      <>
                        <View>  
                          <Text>
                            <Ionicons name="square" size={5} color="black" />{" "}
                            Công cụ {index + 1}
                          </Text>
                        </View>
                        <View style={{ marginLeft: 40 }}>
                          <Text>
                            <Ionicons name="square" size={5} color="black" />{" "}
                            Tên công cụ : {item.tencc}
                          </Text>
                          <Text>
                            <Ionicons name="square" size={5} color="black" /> Số
                            lượng: {item.soluong}
                          </Text>
                          <Text>
                            <Ionicons name="square" size={5} color="black" /> Mô
                            tả : {item.mota}
                          </Text>
                        </View>
                      </>
                    ))}
                  {item.vattu &&
                    item.vattu.map((item, index) => (
                      <>
                        <View>
                          <Text>
                            <Ionicons name="square" size={5} color="black" />{" "}
                            Vật tư {index + 1}
                          </Text>
                        </View>
                        <View style={{ marginLeft: 40 }}>
                          <Text>
                            <Ionicons name="square" size={5} color="black" />{" "}
                            Tên vật tư : {item.tenvt}
                          </Text>
                          <Text>
                            <Ionicons name="square" size={5} color="black" /> Số
                            lượng: {item.soluong}
                          </Text>
                          <Text>
                            <Ionicons name="square" size={5} color="black" /> Mô
                            tả : {item.mota}
                          </Text>
                        </View>
                      </>
                    ))}
                  {ReadableStreamDefaultReader.nguyenlieu &&
                    ReadableStreamDefaultReader.nguyenlieu.map(
                      (item, index) => (
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
                      )
                    )}
                </View>
              </>
            ))}
            <Text>Tổng tiền : {formatter.format(data.tongtien)} VNĐ</Text>
            <Text>Ngày gửi : {data.ngaytao}</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          paddingTop: 10,
          borderTopColor: "#b3b3b3",
          borderWidth: 1,
          borderRightWidth: 0,
          borderLeftWidth: 0,
          borderBottomWidth: 0,
          alignItems : 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            borderColor: "#0000e6",
            borderWidth: 1,
            borderRadius: 90,
            width: 50,
            padding: 10,
            marginBottom: 10,
            textAlign: "center",
          }}
          onPress={() => {
            navigation.navigate("TabNav");
          }}
        >
          <Ionicons name="arrow-back" size={25} color="#0000b3" />
        </Text>
        <Text
          style={{
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: "#0000e6",
            width: 200,
            textAlign: "center",
            color: "white",
            marginLeft: 30,
          }}
          onPress={() => {
            navigation.navigate("TabNav");
          }}
        >
          Xác nhận
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  headerContainer: {
    backgroundColor: "#e65c00",
    padding: 15,
    alignItems: "center",
  },
});
export default DonHang;
