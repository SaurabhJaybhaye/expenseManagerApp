import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgressBar = ({ progress, maxProgress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.expenseSide}>
          <Text>{progress < 0 && progress}</Text>
        </View>
        <View style={styles.center}></View>
        <View style={styles.incomeSide}>
          <Text>{progress > 0 && progress}</Text>
        </View>
      </View>
      <View style={styles.textContent}>
        <Text style={styles.text}>
          {maxProgress + 10 - 2 * (maxProgress + 10)}
        </Text>
        <Text style={styles.text}>0</Text>
        <Text style={styles.text}>{maxProgress + 10}</Text>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    marginLeft: 35,
    marginTop: 10,
  },
  content: {
    borderWidth: 1,
    height: 50,
    width: "90%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  textContent: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  expenseSide: {
    justifyContent: "center",
  },
  incomeSide: {
    justifyContent: "center",
  },
  center: {
    borderWidth: 1,
    height: "100%",
  },
});
