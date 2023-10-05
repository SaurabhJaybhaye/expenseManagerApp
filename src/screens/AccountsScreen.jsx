import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { HEADER_TITLE } from "../shared/Constants";
import Header from "../shared/components/Header";
import AddAccountModel from "../shared/components/AddAccountModel";
import { useFocusEffect } from "@react-navigation/native";
import { getAllAccounts } from "../redux/slices/accountSlice";
import { useSelector, useDispatch } from "react-redux";

const AccountsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const accountData = useSelector((state) => state.accounts);
  console.log("accounts", accountData);
  const [accountList, setAccountList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllAccounts());
    }, [modalVisible, dispatch])
  );

  // useEffect(() => {
  //   getAllAccounts()
  //     .then((data) => {
  //       console.log("get all data", data);
  //     })
  //     .catch((err) => {
  //       console.log("get all data err", err);
  //     });
  //   const fetchData = async () => {
  //     const data = await getAllAccounts();
  //     console.log("data", data);
  //   };
  //   fetchData();
  // }, [modalVisible]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={require("../shared/assets/icons/hamburger.png")}
        rightIcon={require("../shared/assets/icons/add1.png")}
        title={HEADER_TITLE.Accounts}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        onClickRightIcon={() => {
          setModalVisible(!modalVisible);
        }}
      />

      <AddAccountModel
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Account List</Text>
        {/* <FlatList
          data={accounts}
          keyExtractor={(item) => (item && item.id ? item.id.toString() : "")}
          renderItem={({ item }) => {
            // if (!item) return null; // Skip rendering if item is undefined
            return (
              <Text key={item.id}>
                {item.accountName}: {item.balance}
              </Text>
            );
          }}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default AccountsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
