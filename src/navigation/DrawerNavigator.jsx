import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { PATHS } from "../shared/Constants";
import HomeScreen from "../screens/HomeScreen";
import AccountsScreen from "../screens/AccountsScreen";
import MomentListScreen from "../screens/MomentListScreen";
import ReportOfYear from "../screens/ReportOfYear";
import ReportByCategory from "../screens/ReportByCategory";
import CustomDrawer from "./CustomDrawer";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesomeIcon5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { marginLeft: -25 },
      }}
    >
      <Drawer.Screen
        name={PATHS.HOME}
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesomeIcon name="home" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={PATHS.MOMENT}
        component={MomentListScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesomeIcon5 name="clipboard-list" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={PATHS.ACCOUNT}
        component={AccountsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="cards" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={PATHS.REPORT_BY_YEAR}
        component={ReportOfYear}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="bar-chart" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={PATHS.REPORT_BY_CATEGORY}
        component={ReportByCategory}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesomeIcon name="pie-chart" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
