import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import React from "react";
const { width } = Dimensions.get("window");
const Header = (props) => {
  const { title, leftIcon, rightIcon, onClickLeftIcon, onClickRightIcon } =
    props;
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onClickLeftIcon && onClickLeftIcon();
        }}
      >
        <Image source={leftIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onClickRightIcon && onClickRightIcon();
        }}
      >
        <Image source={rightIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 80,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 30,
    width: 30,
    tintColor: "#757575",
  },
  title: {
    color: "#030303",
    fontSize: 20,
    marginTop: 10,
    justifyContent: "flex-start",
    fontWeight: "600",
    alignContent: "flex-start",
    flexGrow: 2,
    marginStart: 10,
  },
});
