import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { HEADER_TITLE, SLICE_STATUS } from "../shared/Constants";
import Header from "../shared/components/Header";
import AddAccountModel from "../shared/components/AddAccountModel";
import { useFocusEffect } from "@react-navigation/native";
import { getAllAccounts } from "../redux/slices/accountSlice";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import { globalTextStyles } from "../shared/components/GlobalStyles";
import ProgressBar from "../shared/components/ProgressBar";
// import * as Progress from "react-native-progress";

const AccountsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.accounts.status);
  const accounts = useSelector((state) => state.accounts.accounts);
  const [modalVisible, setModalVisible] = useState(false);

  const income = (
    <Icon name="pluscircleo" size={30} color={"#1edb09"} style={styles.icons} />
  );
  const expense = <Icon name="minuscircleo" size={30} color={"#c21906"} />;

  const fun = (data) => {
    if (data.length > 0) {
      data.map((i) => console.log("data", i));
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllAccounts());
      if (accounts) {
        fun(accounts);
      }
    }, [modalVisible, dispatch])
  );

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

      <View style={styles.content}>
        {/* {status == SLICE_STATUS.SUCCEEDED && accounts && (
          <FlatList
            data={accounts}
            keyExtractor={(item) => (item && item.id ? item.id.toString() : "")}
            renderItem={({ item }) => {
              return (
                <Text key={item.id}>
                  {item.accountName}: {item.balance}
                </Text>
              );
            }}
          />
        )} */}
        <View style={styles.titleView}>
          {income}
          <Text style={globalTextStyles.headingText}>Bank1</Text>
        </View>
        <View style={styles.charts}>
          <View style={styles.range}>
            {/* <Progress.Bar progress={0.3} width={200} /> */}
            <ProgressBar progress={30} maxProgress={100} />
            <Text style={styles.text}>{30}</Text>
          </View>
          {expense}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 10,
    backgroundColor: "#fff",
  },
  icons: {
    marginLeft: 25,
    marginRight: 10,
  },
  titleView: {
    flexDirection: "row",
  },
  charts: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  range: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
});
