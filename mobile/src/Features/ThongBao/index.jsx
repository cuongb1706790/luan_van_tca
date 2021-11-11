import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import hodanApi from "../../api/hodanApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderPhanPhat from "./RenderPhanPhat";
function ThongBao(props) {
  // const [infoHoDan, setInfoHoDan] = useState();
  const [dsPhat, setDsPhat] = useState();
  const [hoDan, setHoDan] = useState("");
  const [dsPhatVatTu, setDsPhatVatTu] = useState("");
  const [dsPhatCC, setDsPhatCC] = useState("");
  useEffect(() => {
    (async () => {
      //get info hodan
      const dataHodan = await hodanApi.getAll();
      //get id Account
      const dataAccount = await AsyncStorage.getItem("user");
      const findHoDan = dataHodan.hodan.find((item) => {
        return dataAccount.includes(item.user._id);
      });
      setHoDan(findHoDan);
      // const { hodan } = await apiHodan.singleHodanBasedUser(userInfo._id);
      // console.log(findHoDan._id);

      const getDsPhanPhat = await hodanApi.dsPhanphat(findHoDan._id);

      setDsPhat(getDsPhanPhat.dsphanphat);
      // const getDsPhatVatTu = await hodanApi.dsVattuPhanphat(findHoDan._id);
      // setDsPhatVatTu(getDsPhatVatTu.dsphanphat);
      // const getDsPhatCC = await hodanApi.dsCongcuPhanphat(findHoDan._id);
      // setDsPhatCC(getDsPhatCC.dsphanphat);
      // setDsPhat(getDsPhatVatTu.dsphanphat.length,getDsPhatCC.dsphanphat.length);
    })();
  }, []);
  // const dsPhanPhat = [...dsPhatCC,...dsPhatVatTu];
  if (dsPhat) {
    // console.log(dsPhat[0]);
  }

  const renderItem = ({ item }) => (
    <View>
      <Text>{item._id}</Text>
    </View>
  );
  // const Item = ({ data }) => (
  //   <View >
  //     <Text>{data._id}</Text>
  //   </View>
  // );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Thông báo gần đây</Text>
      </View>
      {dsPhat && (
        <FlatList
          data={dsPhat}
          renderItem={(item) => <RenderPhanPhat phanphat={item} />}
          keyExtractor={(item) => item._id}
        />
      )}
    </SafeAreaView>
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
});
export default ThongBao;
