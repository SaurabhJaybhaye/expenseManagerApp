import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { PATHS } from "../shared/Constants";

const ActionButtons = ({ navigation }) => {
  const income = <Icon name="pluscircleo" size={30} color={"#fff"} />;
  const expense = <Icon name="minuscircleo" size={30} color={"#fff"} />;
  const transfer = <Icon name="swap" size={30} color={"#fff"} />;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.buttons, styles.text, { backgroundColor: "#1a8f25" }]}
        onPress={() => navigation.navigate(PATHS.FORMS)}
      >
        {income}
        <Text style={[styles.text, , { backgroundColor: "#1a8f25" }]}>
          Income
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttons, styles.text, { backgroundColor: "#ff0f03" }]}
        onPress={() => navigation.navigate(PATHS.FORMS)}
      >
        {expense}
        <Text style={styles.text}>Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttons, styles.text, { backgroundColor: "#1008ff" }]}
        onPress={() => navigation.navigate(PATHS.FORMS)}
      >
        {transfer}
        <Text style={[styles.text, { backgroundColor: "#1008ff" }]}>
          Transfer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  buttons: {
    height: 70,
    width: 100,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
