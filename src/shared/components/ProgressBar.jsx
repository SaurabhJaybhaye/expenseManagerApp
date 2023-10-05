import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";

const ProgressBar = ({ progress, maxProgress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.center}></View>
      </View>
      <View style={styles.textcontent}>
        <Text style={styles.text}>-30</Text>
        <Text style={styles.text}>0</Text>
        <Text style={styles.text}>0</Text>
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

  textcontent: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  center: {
    borderWidth: 1,
    height: "100%",
  },
});
