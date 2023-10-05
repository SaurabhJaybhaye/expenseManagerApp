import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { globalTextStyles } from "../shared/components/GlobalStyles";
const CustomDrawer = (props) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        <Image
          source={require("../shared/assets/images/increase.png")}
          style={styles.logo}
        />
        <Text style={[globalTextStyles.headingText, styles.Title]}>
          Daily Expenses
        </Text>
        <View style={globalTextStyles.hrLine} />
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: { flex: 1 },
  drawerContent: {
    backgroundColor: "#fff",
  },
  logo: {
    height: 80,
    width: 80,
    margin: 15,
  },
  Title: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
});
