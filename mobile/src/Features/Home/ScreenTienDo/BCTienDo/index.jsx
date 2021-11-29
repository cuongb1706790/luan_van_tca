import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  Platform,
  Picker,
} from "react-native";
import { Formik, ErrorMessage, Field } from "formik";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import apiTiendo from "../../../../api/apiTiendo";
import { MaterialDialog } from "react-native-material-dialog";
import hodanApi from "../../../../api/hodanApi";
import apiDonhang from "../../../../api/apiDonhang";
function BCTienDo(props) {
  const { navigation } = props;
  const idHodan = props.route.params.idHodan;
  // console.log(idHodan);
  const SignupSchema = Yup.object().shape({
    soluong: Yup.string().required("Số lượng không được để trống "),
  });
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [orderList, setOrderList] = useState();
  const [selectedMaDH, setSelectedMaDH] = useState();
  const [selectedMaSP, setSelectedMaSP] = useState();
  let checkUndifined = false;
  useEffect(() => {
    (async () => {
      const getListOrder = await hodanApi.dsDonhang(idHodan);
      setOrderList(getListOrder.dsdonhang);
      setSelectedMaDH(getListOrder.dsdonhang[0].ma);
      setSelectedMaSP(
        getListOrder.dsdonhang.find((item) => item.madh === selectedMaDH).dssanpham[0].sanpham.ma
      );
      //custom file img
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  // console.log(orderList, selectedMaDH, selectedMaSP);
  if ((orderList, selectedMaDH)) {
    checkUndifined = true;
  }
  console.log(selectedMaDH);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const thoigianValue = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleClose = () => {
    setVisible(false);
  };
  const handleOpen = () => {
    setVisible(true);
  };
  const handleClose2 = () => {
    setVisible2(false);
  };
  const handleOpen2 = () => {
    setVisible2(true);
  };
  const handleClose3 = () => {
    setVisible3(false);
  };
  const handleOpen3 = () => {
    setVisible3(true);
  };

  const handleSumitForm = async (values) => {
    try {
      if (orderList.find((item) => item.ma === selectedMaDH).xacnhan) {
        if (image) {
          const dataForm = {
            donhangId: orderList.find((item) => item.ma === selectedMaDH)._id,
            // sanphamId: orderList
            //   .find((item) => item.ma === selectedMaDH).dssanpham.find((sp) => sp.sanpham.ma=== selectedMaSP),
              // .find((sp) => sp.sanpham.ma=== selectedMaSP).sanpham._id,
             
            soluong: parseInt(values.soluong),
            // hinhanh: image,
            masp : selectedMaSP,
            madh : selectedMaDH,
            thoigian: thoigianValue,
          };
          console.log(dataForm);
          // const sendRequest = await apiDonhang.baocao(dataForm);
          // handleOpen2();
        } else {
          handleOpen();
        }
      } else {
        handleOpen3();
        // console.log('chua dat yeu cau');
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Báo cáo biến động</Text>
      </View>
      { checkUndifined && (
        // <Text style={{ color: "white" }}>Báo cáo biến động</Text>

        <Formik
          initialValues={{ soluong: "" }}
          onSubmit={handleSumitForm}
          validationSchema={SignupSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.containerForm}>
              <Text style={[styles.text]}>Mã đơn hàng</Text>
              <View
                style={{
                  marginBottom: 12,
                  marginTop: 12,
                  borderWidth: 1,

                  borderRadius: 10,
                  width: 300,
                  color: "black",
                  borderColor: "#ccccccf2",
                }}
              >
                <Picker
                  selectedValue={selectedMaDH}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedMaDH(itemValue)
                  }
                >
                  {orderList.map((item) => (
                    <Picker.Item
                      label={item.ma}
                      value={item.ma}
                      key={item._id}
                    />
                  ))}
                </Picker>
              </View>
              <Text style={[styles.text]}>Tên sản phẩm</Text>
              <View
                style={{
                  marginBottom: 12,
                  marginTop: 12,
                  borderWidth: 1,
                  borderRadius: 10,
                  width: 300,
                  color: "black",
                  borderColor: "#ccccccf2",
                }}
              >
                <Picker
                  selectedValue={selectedMaSP}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedMaSP(itemValue)
                  }
                >
                  {orderList
                    .find((item) => item.ma === selectedMaDH)
                    .dssanpham.map((item) => (
                      <Picker.Item
                        label={`${item.sanpham.ma} - ${item.sanpham.ten}`}
                        value={item.sanpham.ma}
                        key={item._id}
                      />
                    ))}
                </Picker>
              </View>

              <Text style={styles.text}>Số lượng đã hoàn thành</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: !touched
                      ? "#ccccccf2"
                      : errors.soluong
                      ? "#FF5A5F"
                      : "#ccccccf2",
                  },
                ]}
                keyboardType="numeric"
                onChangeText={handleChange("soluong")}
                onBlur={handleBlur("soluong")}
                value={values.soluong}
                error={errors.soluong}
                touched={touched.soluong}
              />
              {errors.soluong && touched.soluong ? (
                <>
                  <Text
                    style={{
                      color: !touched
                        ? "#ccccccf2"
                        : errors.soluong
                        ? "#FF5A5F"
                        : "#ccccccf2",
                      marginBottom: 5,
                    }}
                  >
                    {errors.soluong}
                  </Text>
                </>
              ) : null}
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Thời gian</Text>
                <TextInput style={[styles.textInputTime]}>
                  <Text>{thoigianValue}</Text>
                </TextInput>
                <Text onPress={showDatepicker} style={{ marginLeft: 10 }}>
                  <Ionicons name="calendar" size={30} color="#0000b3" />
                </Text>
              </View>
              <Text style={styles.text}>Hình ảnh</Text>
              <View>
                <Text
                  style={{
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 10,
                    backgroundColor: "#e6e6e6",
                    width: 100,
                  }}
                  onPress={pickImage}
                >
                  Chọn ảnh
                </Text>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 300, height: 200, marginBottom: 10 }}
                  />
                ) : (
                  <View
                    style={{
                      borderRadius: 20,
                      borderColor: "#e6e6e6",
                      borderWidth: 1,
                      width: 300,
                      height: 200,
                    }}
                  ></View>
                )}
              </View>
              <MaterialDialog
                title="Thông báo"
                visible={visible}
                onOk={() => {
                  setVisible(false);
                }}
                onCancel={() => {
                  setVisible(false);
                }}
              >
                <Text>Vui lòng chọn hình ảnh cho sản phẩm!</Text>
              </MaterialDialog>

              <MaterialDialog
                visible={visible2}
                onOk={() => {
                  setVisible(false);
                  navigation.navigate("TabNav");
                }}
                onCancel={() => {
                  setVisible(false);
                  navigation.navigate("TabNav");
                }}
              >
                <Text style={{ color: "green" }}>
                  Đã gửi báo cáo tiến độ thành công !
                </Text>
              </MaterialDialog>
              <MaterialDialog
                title="Thông báo"
                visible={visible3}
                onOk={() => {
                  setVisible3(false);
                }}
                onCancel={() => {
                  setVisible3(false);
                }}
              >
                <Text style={{ color: "#ff5500" }}>
                  Vui lòng xác nhận đơn hàng trước khi gửi báo cáo!
                </Text>
              </MaterialDialog>
              <View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 35,
                  paddingTop: 10,
                  borderTopColor: "#b3b3b3",
                  borderWidth: 1,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  borderBottomWidth: 0,
                }}
              >
                <Text
                  style={{
                    borderColor: "#0000e6",
                    borderWidth: 1,
                    borderRadius: 90,
                    paddingTop: 8,
                    width: 50,
                    textAlign: "center",
                    marginLeft: 20,
                  }}
                  onPress={() => {
                    navigation.navigate("TabNav");
                  }}
                >
                  <Ionicons name="arrow-back" size={30} color="#0000b3" />
                </Text>
                <Text
                  onPress={handleSubmit}
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
                >
                  Gửi báo cáo
                </Text>
              </View>
            </View>
          )}
        </Formik>
      )}
    </View>
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
  containerForm: {
    backgroundColor: "white",
    paddingBottom: 40,
    paddingLeft: 40,
    paddingTop: 10,
    paddingRight: 30,
    borderRadius: 10,
  },
  text: {
    color: "black",
  },
  textInput: {
    height: 40,
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 300,
    color: "black",
  },
  textInputTime: {
    height: 40,
    marginBottom: 12,
    marginLeft: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 190,
    color: "black",
  },
  textInputImg: {
    height: 200,
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 300,
    color: "black",
  },
  img: {
    width: 100,
  },
  containerImg: {
    paddingBottom: 20,
    marginLeft: 50,
  },
});
export default BCTienDo;
