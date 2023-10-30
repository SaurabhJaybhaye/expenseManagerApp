import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "react-native-progress/Bar";

const ProgressBarNPM = (props) => {
  const [progress, setProgress] = useState(0);
  const [actualProgress, setActualProgress] = useState(0);

  useEffect(() => {
    const finalValue = props.maxProgress;
    const receivedProgress = props.progress;

    setProgress(receivedProgress / finalValue);
    setActualProgress(receivedProgress);
  }, []);

  let barColor;
  if (actualProgress > 0) {
    barColor = "green";
  } else if (actualProgress < 0) {
    barColor = "red";
  } else {
    barColor = "blue";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actual Progress: {actualProgress}</Text>
      <ProgressBar
        progress={progress}
        width={200}
        color={barColor}
        animated={true}
      />
    </View>
  );
};
export default ProgressBarNPM;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    marginBottom: 2,
  },
});
