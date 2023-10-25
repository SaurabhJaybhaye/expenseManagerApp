import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

const AccountMenuOptions = ({ isVisible, setVisible, setDelete, setEdit }) => {
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text
              style={[styles.text]}
              onPress={() => {
                setEdit(true), handleClose();
              }}
            >
              Edit
            </Text>
            <Text
              style={[styles.text]}
              onPress={() => {
                setDelete(true);
                handleClose();
              }}
            >
              Delete
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AccountMenuOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  text: {
    borderWidth: 1,
    padding: 10,
    width: 100,
    height: 40,
    margin: 5,
  },
});
