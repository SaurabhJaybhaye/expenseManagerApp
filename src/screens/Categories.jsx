import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import Header from "../shared/components/Header";
import { useNavigation } from "@react-navigation/native";
import { HEADER_TITLE } from "../shared/Constants";

const Categories = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={require("../shared/assets/icons/hamburger.png")}
        rightIcon={require("../shared/assets/icons/add1.png")}
        title={HEADER_TITLE.CATEGORY}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <View style={styles.accountSelection}>
        <Text>Account:</Text>
      </View>
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  accountSelection: {
    borderWidth: 1,
    margin: 20,
    borderBlockColor: "#000",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
  },
});
