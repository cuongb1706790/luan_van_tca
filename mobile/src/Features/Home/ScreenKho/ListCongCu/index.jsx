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
  // console.log(listCongCu);
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {listCongCu && (
        <FlatList
          data={listCongCu}
          renderItem={(item) => <CongCu congcu={item.item}/>}
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
