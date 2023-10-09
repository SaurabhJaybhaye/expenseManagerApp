import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../redux/slices/accountSlice";
import { HEADER_TITLE, SLICE_STATUS } from "../shared/Constants";
import AddAccountModel from "../shared/components/AddAccountModel";
import { globalTextStyles } from "../shared/components/GlobalStyles";
import Header from "../shared/components/Header";
import ProgressBar from "../shared/components/ProgressBar";

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

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllAccounts());
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
        {status == SLICE_STATUS.SUCCEEDED && accounts ? (
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
        ) : (
          <Text>No Accounts Available Please add new Accounts</Text>
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
