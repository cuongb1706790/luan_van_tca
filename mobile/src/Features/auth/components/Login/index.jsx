import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ListCongCu from "../../../Home/ScreenKho/ListCongCu";
import ListVatTu from "../../../Home/ScreenKho/ListVatTu";
import ListNguyenLieu from "../../../Home/ScreenKho/ListNguyenLieu";
import BCTienDo from "../../../Home/ScreenTienDo/BCTienDo";
import TabNav from "../../../TabNav";
import LoginForm from "../LoginForm";
import DonHang from "../../../Home/ScreenDonHang/DonHang"
import SrceenDoiMatKhau from "../../../CaNhan/ScreenDoiMatKhau";
function Login(props) {
  const Stack = createNativeStackNavigator();
  return (
    // <LoginForm onSubmit={handleLoginSubmit} />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header : ()=> null}}>
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ header: () => null}}
        />
        <Stack.Screen name="TabNav" component={TabNav} />
        <Stack.Screen name="BCTienDo" component={BCTienDo} />
        <Stack.Screen name="ScreenCongCu" component={ListCongCu} />
        <Stack.Screen name="ScreenVatTu" component={ListVatTu} />
        <Stack.Screen name="ScreenNguyenLieu" component={ListNguyenLieu} />
        <Stack.Screen name="DonHang" component={DonHang} />
        <Stack.Screen name="ScreenDoiMatKhau" component={SrceenDoiMatKhau} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Login;
