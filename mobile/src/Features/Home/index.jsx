import React, { useState, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, View, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import hodanApi from "../../api/hodanApi";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenDonHang from "./ScreenDonHang";

function Home(props) {
  const { navigation } = props;
  const [checkTienDo, setCheckTienDo] = useState(true);
  const [checkDonHang, setCheckDonHang] = useState(false);
  const [checkKho, setCheckKho] = useState(false);
  const [infoHoDan, setInfoHoDan] = useState();
  const [idAccount, setIdAccount] = useState();
  let idHodan = "";
  useEffect(() => {
    (async () => {
      //get info hodan
      const dataHodan = await hodanApi.getAll();
      //get id Account
      const dataAccount = await AsyncStorage.getItem("user");
      setIdAccount(dataAccount);
      setInfoHoDan(dataHodan);
    })();
  }, []);
  if (infoHoDan) {
    const findHoDan = infoHoDan.hodan.find((item) => {
      return idAccount.includes(item.user._id);
    });
    idHodan = findHoDan._id;
  }
  // console.log(idHodan);

  const handleChangeActiveBar1 = () => {
    setCheckTienDo(true);
    setCheckDonHang(false);
    setCheckKho(false);
  };
  const handleChangeActiveBar2 = () => {
    setCheckTienDo(false);
    setCheckDonHang(true);
    setCheckKho(false);
  };
  const handleChangeActiveBar3 = () => {
    setCheckTienDo(false);
    setCheckDonHang(false);
    setCheckKho(true);
  };
  const handleRedirectBCTienDo = () => {
    navigation.navigate("FormBCTienDo", { idHodan: `${idHodan}` });
  };
  const handleRedirectCongCu = () => {
    navigation.navigate("ScreenCongCu", { idHodan: `${idHodan}` });
  };
  const handleRedirectVatTu = () => {
    navigation.navigate("ScreenVatTu", { idHodan: `${idHodan}` });
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Xin chào Nguyễn Văn A</Text>
      </View>
      <Text>Ứng dụng di động dành cho hộ dân</Text>

      {/****************************** {Start link bar} **************************************/}
      <View style={styles.containerLinkBar}>
        <Text
          style={[
            styles.singleBar,
            styles.tiendoBar,
            checkTienDo ? styles.activeBar : styles.noActiveBar,
          ]}
          onPress={handleChangeActiveBar1}
        >
          <View>
            <Ionicons
              style={styles.textAlign}
              name="calendar-outline"
              size={40}
              color="white"
            />
            <Text style={styles.textLinkBar}>Tiến độ</Text>
          </View>
        </Text>
        <Text
          style={[
            styles.singleBar,
            styles.donhangBar,
            checkDonHang ? styles.activeBar : styles.noActiveBar,
          ]}
          onPress={handleChangeActiveBar2}
        >
          <View>
            <Ionicons
              style={styles.textAlign}
              name="cart-outline"
              size={40}
              color="white"
            />
            <Text style={styles.textLinkBar}>Đơn hàng</Text>
          </View>
        </Text>
        <Text
          style={[
            styles.singleBar,
            { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
            checkKho ? styles.activeBar : styles.noActiveBar,
          ]}
          onPress={handleChangeActiveBar3}
        >
          <View>
            <Ionicons
              style={styles.textAlign}
              name="folder-open-outline"
              size={40}
              color="white"
            />
            <Text style={styles.textLinkBar}>Kho</Text>
          </View>
        </Text>
      </View>
      {/****************************** {End link bar} **************************************/}
      {/****************************** {Start redirect screen} ******************************/}
      <View style={styles.containerRedirectScreen}>
        {checkTienDo ? (
          <>
            <View style={styles.containerRowRedirect}>
              <View>
                <Text
                  style={styles.containerRedirect}
                  onPress={handleRedirectBCTienDo}
                >
                  <View>
                    <Ionicons name="reader-outline" size={70} color="#0000b3" />
                  </View>
                </Text>
                <Text style={[{ marginTop: 10, textAlign: "center" }]}>
                  Báo cáo biến động
                </Text>
              </View>
            </View>
          </>
        ) : checkKho ? (
          <>
            <View style={styles.containerRowRedirect}>
              <View style={{ marginRight: 30 }}>
                <Text onPress={handleRedirectCongCu}>
                  <View style={styles.containerRedirectKho}>
                    <Ionicons name="construct" size={60} color="#0000b3" />
                  </View>
                </Text>
                <Text style={[{ marginTop: 10, textAlign: "center" }]}>
                  Công cụ
                </Text>
              </View>
              <View style={{ marginRight: 30 }}>
                <Text onPress={handleRedirectVatTu}>
                  <View style={styles.containerRedirectKho}>
                    <Ionicons name="basket" size={60} color="#0000b3" />
                  </View>
                </Text>
                <Text style={[{ marginTop: 10, textAlign: "center" }]}>
                  Vật tư
                </Text>
              </View>
              <View>
                <Text>
                  <View style={styles.containerRedirectKho}>
                    <Ionicons name="close-circle" size={60} color="#0000b3" />
                  </View>
                </Text>

                <Text style={[{ marginTop: 10, textAlign: "center" }]}>
                  Kho lỗi
                </Text>
              </View>
            </View>
          </>
        ) : (
          <>
            <ScreenDonHang navigation={navigation} hodanId={idHodan} />
          </>
        )}
      </View>

      {/****************************** {End redirect screen} ******************************/}
    </View>
  );
}

export default Home;
