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
  const expense = (
    <Icon
      name="minuscircleo"
      size={30}
      color={"#c21906"}
      style={styles.icons}
    />
  );

  const wallet = <Icon name="wallet" size={50} />;

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

      <View>
        {status == SLICE_STATUS.SUCCEEDED && accounts && (
          <FlatList
            data={accounts}
            keyExtractor={(item) => (item && item.id ? item.id.toString() : "")}
            renderItem={({ item }) => {
              return (
                <View style={styles.content}>
                  <View key={item.id} style={styles.titleView}>
                    {item.types == "Income" ? income : expense}
                    <Text style={globalTextStyles.headingText}>
                      {item.accountName}
                    </Text>
                  </View>
                  <View style={styles.charts}>
                    <View style={styles.range}>
                      <ProgressBar
                        progress={item.balance}
                        maxProgress={item.limits}
                      />
                    </View>
                    {wallet}
                  </View>
                </View>
              );
            }}
          />
        )}
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
    backgroundColor: "#fff",
    marginTop: 10,
  },
  icons: {
    marginLeft: 25,
    marginRight: 10,
  },
  titleView: {
    flexDirection: "row",
    marginTop: 10,
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
