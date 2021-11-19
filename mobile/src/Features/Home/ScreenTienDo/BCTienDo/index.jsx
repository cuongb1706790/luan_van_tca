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
  const [idTienDo, setIdTienDo] = useState();
  useEffect(() => {
    (async () => {
      //get id TienDo
      // const getListTienDo = await apiTiendo.dsTiendo(idHodan);
      // setIdTienDo(getListTienDo.dstiendo[0]._id);
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
  const listDH = [
    {
      id: 1,
      madh: "DH001",
      dssp: [
        {
          id: 11,
          mssp: "SP001",
          tensp: "Vải lụa xanh",
          soluongsp: 300,
          donvisp: "mét",
          dongiasp: "50000000",
          tongtiensp: "15000000000",
        },
        {
          id: 12,
          mssp: "SP002",
          tensp: "Vải lụa đỏ",
          soluongsp: 250,
          donvisp: "mét",
          dongiasp: "50000000",
          tongtiensp: "15000000000",
        },
      ],
      ngaygiao: "22/12/2022",
    },
    {
      id: 2,
      madh: "DH002",
      dssp: [
        {
          id: 21,
          mssp: "SP021",
          tensp: "Vải lụa tím",
          soluongsp: 280,
          donvisp: "mét",
          dongiasp: "50000000",
          tongtiensp: "15000000000",
        },
        {
          id: 22,
          mssp: "SP022",
          tensp: "Vải lụa hồng",
          soluongsp: 220,
          donvisp: "mét",
          dongiasp: "50000000",
          tongtiensp: "15000000000",
        },
      ],
      ngaygiao: "22/12/2022",
    },
  ];
  const handleClose = () => {
    setVisible(false);
  };
  const handleOpen = () => {
    setVisible(true);
  };
  const [selectedMaDH, setSelectedMaDH] = useState(listDH[0].madh);
  const [selectedTenSP, setSelectedTenSP] = useState(
    listDH.find((item) => item.madh === selectedMaDH).dssp[0].mssp
  );
  const handleSumitForm = async (values) => {
    try {
      if (image) {
        // const dataForm = {
        //   ten: values.ten,
        //   tensanpham: values.tensanpham,
        //   hinhanh: image,
        //   thoigian: thoigianValue,
        // };
        // //call api to add TienDo
        // const sendData = await apiTiendo.themBaocao(idTienDo, dataForm);
        // // console.log(dataForm);
        // navigation.navigate("TabNav");
        const dataForm = {
          madh: selectedMaDH,
          tensanpham: selectedTenSP,
          soluonghoanthanh: values.soluong,
          hinhanh: image,
          thoigian: thoigianValue,
        };
        console.log(dataForm);
      } else {
        handleOpen();
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Báo cáo biến động</Text>
      </View>
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
                {listDH.map((item) => (
                  <Picker.Item
                    label={item.madh}
                    value={item.madh}
                    key={item.id}
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
                selectedValue={selectedTenSP}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedTenSP(itemValue)
                }
              >
                {listDH
                  .find((item) => item.madh === selectedMaDH)
                  .dssp.map((item) => (
                    <Picker.Item
                      label={`${item.mssp} - ${item.tensp}`}
                      value={item.mssp}
                      key={item.id}
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
                Xác nhận
              </Text>
            </View>
          </View>
        )}
      </Formik>
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
