import React from "react";
import { Modal, View, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isLoading}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ActivityIndicator size="large" color="#05b511" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerContainer: {
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
});

export default Loader;
