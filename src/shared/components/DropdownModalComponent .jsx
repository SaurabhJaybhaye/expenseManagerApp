import React from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { globalTextStyles } from "./GlobalStyles";

const DropdownModalComponent = ({
  selectedAccount,
  modalVisible,
  setModalVisible,
  data,
  handleDropDown,
}) => {
  const Item = ({ title, value, icon }) => (
    <TouchableOpacity
      onPress={() => handleDropDown({ label: title, value: value, icon: icon })}
      style={styles.modalView}
    >
      <View style={styles.image}>
        <Image source={Number(icon)} size={20} style={styles.icons} />
      </View>
      <View style={styles.options}>
        <Text style={globalTextStyles.commonText}>{title}</Text>
      </View>
      <View style={styles.selectIcon}>
        {selectedAccount.value === value && (
          <Icon name="check" size={20} color={"#000"} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modal}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item title={item.label} value={item.value} icon={item.icon} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Modal>
  );
};

export default DropdownModalComponent;

const styles = StyleSheet.create({
  modal: {
    flex: 0,
    height: "auto",
    top: 55,
    backgroundColor: "#fff",
  },
  modalView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 4,
    borderWidth: 1,
    height: 50,
    width: "100%",
  },
  image: {
    flex: 0.5,
    marginLeft: 15,
  },
  options: {
    flex: 2,
  },
  selectIcon: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 15,
  },
  icons: {
    height: 30,
    width: 30,
  },
});
