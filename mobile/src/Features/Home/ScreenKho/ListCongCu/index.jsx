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

const ListCongCu = (props) => {
  const idHodan = props.route.params.idHodan;
  const [listCongCu, setListCongCu] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const getData = await hodanApi.dsCongcu(idHodan);
      setListCongCu(getData.dscongcu);
    };
    fetchData();
  }, []);
  console.log(listCongCu);


  return (
    <SafeAreaView style={styles.container}>
      {listCongCu && (
        <FlatList
          data={listCongCu}
          renderItem={(item) => <CongCu congcu={item} />}
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

export default ListCongCu;
