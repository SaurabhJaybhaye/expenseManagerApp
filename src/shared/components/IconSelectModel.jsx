// IconSelectModel.js

import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";

const icons = require.context("../assets/dbIcons", false, /\.(png|jpe?g|svg)$/);
const iconList = icons.keys().map(icons);

const IconSelectModel = ({
  iconModalVisible,
  setIconModalVisible,
  setSelectedIcon,
}) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={iconModalVisible}
        onRequestClose={() => {
          setIconModalVisible(!iconModalVisible);
        }}
        style={{ justifyContent: "center" }}
      >
        <View style={styles.modal}>
          <Text>Choose an Icon</Text>
          <View style={styles.iconContainer}>
            {iconList.map((icon, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedIcon(icon);
                  setIconModalVisible(false);
                }}
              >
                <Image source={icon} style={styles.icon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    margin: 20,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  icon: {
    width: 50,
    height: 50,
    margin: 5,
  },
});

export default IconSelectModel;
