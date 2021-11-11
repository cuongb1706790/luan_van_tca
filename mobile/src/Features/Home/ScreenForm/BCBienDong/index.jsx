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
} from "react-native";
import { Formik, ErrorMessage } from "formik";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import apiTiendo from "../../../../api/apiTiendo";

function BCBienDong(props) {
  const { navigation } = props;
  const idHodan = props.route.params.idHodan;
  // console.log(idHodan);
  const SignupSchema = Yup.object().shape({
    ten: Yup.string().required("Tên báo cáo chưa hợp lệ "),
    noidung: Yup.string().required("Nội dung chưa hợp lệ"),
  });
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [idTienDo, setIdTienDo] = useState();
  useEffect(() => {
    (async () => {
      //get id TienDo
      const getListTienDo = await apiTiendo.dsTiendo(idHodan);
      setIdTienDo(getListTienDo.dstiendo[0]._id);
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
  const handleSumitLogin = async (values) => {
    try {
      if (image) {
        const dataForm = {
          ten: values.ten,
          noidung: values.noidung,
          hinhanh: image,
          thoigian: thoigianValue,
        };
        //call api to add TienDo
        const sendData = await apiTiendo.themBaocao(idTienDo,dataForm);
        // console.log(dataForm);
        navigation.navigate("TabNav");
        
      }
    } catch (error) {
      
    }
 
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Báo cáo biến động</Text>
      </View>
      <Formik
        initialValues={{ noidung: "", ten: "" }}
        onSubmit={handleSumitLogin}
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
            <Text style={[styles.text]}>Tên báo cáo</Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor: !touched
                    ? "#ccccccf2"
                    : errors.ten
                    ? "#FF5A5F"
                    : "#ccccccf2",
                },
              ]}
              onChangeText={handleChange("ten")}
              onBlur={handleBlur("ten")}
              value={values.ten}
              error={errors.ten}
              touched={touched.ten}
            />
            {errors.ten && touched.ten ? (
              <>
                <Text
                  style={{
                    color: !touched
                      ? "#ccccccf2"
                      : errors.ten
                      ? "#FF5A5F"
                      : "#ccccccf2",
                    marginBottom: 5,
                  }}
                >
                  {errors.ten}
                </Text>
              </>
            ) : null}
            <Text style={styles.text}>Nội dung</Text>
            <TextInput
              style={[
                styles.textInputNoiDung,
                {
                  borderColor: !touched
                    ? "#ccccccf2"
                    : errors.noidung
                    ? "#FF5A5F"
                    : "#ccccccf2",
                },
              ]}
              multiline
              maxLength={1000}
              numberOfLines={10}
              onChangeText={handleChange("noidung")}
              onBlur={handleBlur("noidung")}
              value={values.noidung}
              error={errors.noidung}
              touched={touched.noidung}
            />
            {errors.noidung && touched.noidung ? (
              <>
                <Text
                  style={{
                    color: !touched
                      ? "#ccccccf2"
                      : errors.noidung
                      ? "#FF5A5F"
                      : "#ccccccf2",
                    marginBottom: 5,
                  }}
                >
                  {errors.noidung}
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
                    borderColor:(image) ? "#e6e6e6" : "#ff0000",
                    borderWidth: 1,
                    width: 300,
                    height: 200,
                  }}
                ></View>
              )}
            </View>
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
                marginTop: 20,
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
                  // paddingBottom: 5,
                  // paddingLeft: 10,
                  // paddingRight: 10,
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
    paddingBottom: 20,
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
  textInputNoiDung: {
    flexDirection: "column-reverse",
    height: 160,
    marginBottom: 12,
    marginTop: 10,
    marginLeft: 0,
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
export default BCBienDong;
