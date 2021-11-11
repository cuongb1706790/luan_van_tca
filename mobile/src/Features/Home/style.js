import { StyleSheet} from "react-native";

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
    containerLinkBar: {
      marginTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 10
    },
    singleBar: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 30,
      paddingLeft: 30,
    },
    activeBar : {
        backgroundColor : '#ff9933'
    },
    noActiveBar : {
      backgroundColor: "#e65c00",

    },
    tiendoBar: {
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderRightColor: "white",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    donhangBar: {
      borderRightColor: "white",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    textAlign: {
      textAlign: "center",
    },
  
    textLinkBar: {
      color: "white",
      textAlign: "center",
    },
    containerRedirectScreen: {
      backgroundColor: "#e6e6e6",
      marginTop: 10,
      paddingTop: 20,
      paddingRight: 20,
      paddingLeft: 20,
      paddingBottom: 600,
    },
    containerRowRedirect: {
     marginBottom : 20,
      flexDirection: "row",
    },
    containerRowRedirect2: {
      flexDirection: "row",
     marginBottom : 20,
    },
    containerRowRedirect3: {
      flexDirection: "row",
    },
    containerRedirect: {
      borderRadius: 90,
      paddingTop: 20,
      paddingBottom: 15,
      paddingLeft: 20,
      paddingRight: 15,
      backgroundColor: "white",
      marginRight: 15,
    },
    containerRedirectKho: {
      borderRadius: 90,
      paddingTop: 20,
      paddingBottom: 15,
      paddingLeft: 20,
      paddingRight: 15,
      backgroundColor: "white",
      marginRight: 15,
    },
  });
export default styles;