import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import hodanApi from "../../../../api/hodanApi";
import CongCu from "../CongCu";
import VatTu from "../VatTu";

const ListVatTu = (props) => {
  const idHodan = props.route.params.idHodan;
  const [listVatTu, setListVatTu] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const getData = await hodanApi.dsVattu(idHodan);
      setListVatTu(getData.dsvattu);
    };
    fetchData();
  }, []);
  // console.log(listVatTu);
 
  return (
    <SafeAreaView style={styles.container}>
      {listVatTu && (
        <FlatList
          data={listVatTu}
          renderItem={(item) => <VatTu vattu={item} />}
          keyExtractor={(item) => item._id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ListVatTu;
