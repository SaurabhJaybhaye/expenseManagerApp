import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import AccountMenuOptions from "../components/AccountMenuOptions";
import { deleteAccount, getAllAccounts } from "../redux/slices/accountSlice";
import { HEADER_TITLE, SLICE_STATUS } from "../shared/Constants";
import AddAccountModel from "../shared/components/AddAccountModel";
import Alert from "../shared/components/Alert";
import { globalTextStyles } from "../shared/components/GlobalStyles";
import Header from "../shared/components/Header";
import ProgressBarNPM from "../shared/components/ProgressBarNPM";

const AccountsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.accounts.status);
  const accounts = useSelector((state) => state.accounts.accounts);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});

  const income = (
    <Icon name="pluscircleo" size={25} color={"#1edb09"} style={styles.icons} />
  );
  const expense = (
    <Icon
      name="minuscircleo"
      size={25}
      color={"#c21906"}
      style={styles.icons}
    />
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllAccounts());
    }, [modalVisible, dispatch])
  );

  const deleteRecord = (response) => {
    if (response?.payload?.success) {
      Alert(response?.payload?.message);
    } else {
      Alert(response?.payload?.errorMessage);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const handleDelete = async () => {
        if (isDelete) {
          const resp = await dispatch(deleteAccount(selectedAccount.id));
          setIsDelete(false);
          setSelectedAccount({});
          deleteRecord(resp);
          dispatch(getAllAccounts());
        }
      };
      handleDelete();
    }, [isDelete, selectedAccount.id])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (edit) {
        setModalVisible(!modalVisible);
      }
    }, [edit])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={require("../shared/assets/icons/hamburger.png")}
        rightIcon={require("../shared/assets/icons/add1.png")}
        title={HEADER_TITLE.ACCOUNT}
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
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
        edit={edit}
        setEdit={setEdit}
      />

      <AccountMenuOptions
        isVisible={menuVisible}
        setVisible={setMenuVisible}
        setDelete={setIsDelete}
        setEdit={setEdit}
      />

      <View>
        {status == SLICE_STATUS.SUCCEEDED && accounts ? (
          <FlatList
            data={accounts}
            keyExtractor={(item) => (item && item.id ? item.id.toString() : "")}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedAccount(item), setMenuVisible(true);
                  }}
                  style={styles.content}
                >
                  <View key={item.id} style={styles.titleView}>
                    {item.types == "Income" ? income : expense}
                    <Text style={globalTextStyles.headingText}>
                      {item.accountName}
                    </Text>
                  </View>
                  <View style={styles.charts}>
                    <View style={styles.range}>
                      <ProgressBarNPM
                        progress={item.balance}
                        maxProgress={item.limits}
                      />
                    </View>
                    <Image source={Number(item.icon)} style={styles.icons} />
                  </View>
                </TouchableOpacity>
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
    marginRight: 5,
    height: 30,
    width: 30,
    marginTop: 3,
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
