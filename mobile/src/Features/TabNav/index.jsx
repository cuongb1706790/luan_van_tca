import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import CaNhan from "../CaNhan";
import Home from "../Home";
import ThongBao from "../ThongBao";

const Tab = createBottomTabNavigator();
function TabNav(props) {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Trang chủ") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Thông báo") {
            iconName = focused ? "notifications" : "notifications";
          } else if (route.name === "Cá nhân") {
            iconName = focused ? "person" : "person";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Trang chủ"
        component={Home}
        options={{ header: () => null }}
      />
      <Tab.Screen
        name="Thông báo"
        component={ThongBao}
        options={{ header: () => null }}
        
      />
      <Tab.Screen
        name="Cá nhân"
        component={CaNhan}
        options={{ header: () => null }}
      />
    </Tab.Navigator>
  );
}

export default TabNav;
