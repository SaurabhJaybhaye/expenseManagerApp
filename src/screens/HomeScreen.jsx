import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../redux/slices/accountSlice";
import {
  DROPDOWN_OPTIONS,
  HEADER_TITLE,
  PATHS,
  SLICE_STATUS,
} from "../shared/Constants";
import DropdownModalComponent from "../shared/components/DropdownModalComponent "; // Import the component
import { globalTextStyles } from "../shared/components/GlobalStyles";
import Header from "../shared/components/Header";
import ActionButtons from "./ActionButtons";

import MyPieChart from "../shared/components/MyPieChart";
const HomeScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const status = useSelector((state) => state.accounts.status);
  const accounts = useSelector((state) => state.accounts.accounts);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({
    label: "",
    value: "",
    icon: "",
  });

  useEffect(() => {
    if (status === SLICE_STATUS.SUCCEEDED && accounts?.length > 0) {
      setSelectedAccount({
        label: accounts[0].accountName,
        value: accounts[0].accountName,
        icon: accounts[0].icon,
      });
    }
  }, [status, accounts]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllAccounts());
    }, [dispatch])
  );

  const dropDownIcon = (
    <Icon.Button
      name="caretdown"
      backgroundColor={"#fff"}
      size={15}
      color={"#000"}
      onPress={() => {
        setModalVisible(true);
      }}
    ></Icon.Button>
  );

  const data =
    status === SLICE_STATUS.SUCCEEDED &&
    accounts?.map((item) =>
      DROPDOWN_OPTIONS(item.accountName, item.accountName, item.icon)
    );
  // functions
  const handleDropDown = (obj) => {
    setSelectedAccount(obj);
    setModalVisible(false);
  };

  if (status === SLICE_STATUS.loading) {
    return <Text style={styles.loading}>Loading....</Text>;
  } else if (status === SLICE_STATUS.SUCCEEDED) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          leftIcon={require("../shared/assets/icons/app.png")}
          title={HEADER_TITLE.HOME}
          onClickLeftIcon={() => {
            navigation.openDrawer();
          }}
        />

        <View style={[styles.dropdown, styles.shadowBoarder]}>
          <View style={[styles.dropdownText, styles.dropdownImage]}>
            <Image source={Number(selectedAccount.icon)} style={styles.icons} />
          </View>
          <View style={[styles.dropdownText, styles.title]}>
            <Text style={globalTextStyles.commonText}>
              {selectedAccount.label}
            </Text>
          </View>
          <View style={[styles.dropdownText, styles.dropdownIcon]}>
            <Icon.Button
              name="caretdown"
              backgroundColor={"#fff"}
              size={15}
              color={"#000"}
              onPress={() => {
                setModalVisible(true);
              }}
            ></Icon.Button>
          </View>
        </View>

        <DropdownModalComponent
          selectedAccount={selectedAccount}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={data}
          handleDropDown={handleDropDown}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.actions}>
              <ActionButtons navigation={navigation} />
            </View>

            <TouchableOpacity
              style={[styles.shadowBoarder, styles.balance]}
              onPress={() => navigation.navigate(PATHS.REPORT_BY_YEAR)}
            >
              <Text style={[styles.viewTitle, globalTextStyles.headingText]}>
                Monthly balance + previous balance
              </Text>
              <Text style={styles.date}>September, 2023</Text>
              <View style={styles.details}>
                <View style={[styles.detailHead]}>
                  <Text
                    style={[styles.detailHeading, globalTextStyles.commonText]}
                  >
                    Income
                  </Text>
                  <Text
                    style={[styles.detailHeading, globalTextStyles.commonText]}
                  >
                    Previous Balance
                  </Text>
                  <Text
                    style={[styles.detailHeading, globalTextStyles.commonText]}
                  >
                    Expense
                  </Text>
                  <Text
                    style={[styles.detailHeading, globalTextStyles.commonText]}
                  ></Text>
                  <Text
                    style={[styles.detailHeading, globalTextStyles.commonText]}
                  >
                    Current Balance
                  </Text>
                </View>
                <View style={[styles.detailValues]}>
                  <Text style={[globalTextStyles.commonText]}>0.00+</Text>
                  <Text style={[globalTextStyles.commonText]}>0.00+</Text>
                  <Text style={[globalTextStyles.commonText]}>0.00 -</Text>
                  <Text style={[globalTextStyles.commonText]}></Text>
                  <Text style={[globalTextStyles.commonText]}>0.00=</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.summary, styles.shadowBoarder, styles.balance]}
              onPress={() => navigation.navigate(PATHS.REPORT_BY_CATEGORY)}
            >
              <Text style={[styles.viewTitle, globalTextStyles.headingText]}>
                Monthly summary by category
              </Text>
              <Text style={styles.date}>September, 2023</Text>
              <MyPieChart />
            </TouchableOpacity>

            <View
              style={[styles.tenRecords, styles.shadowBoarder, styles.balance]}
            >
              <Text style={[styles.viewTitle, globalTextStyles.headingText]}>
                Last five records
              </Text>
              {/* 1st record */}
              <View style={styles.recordView}>
                <View style={styles.recordIcon}>
                  <Icon name="pay-circle-o1" size={20} color={"#000"} />
                </View>
                <View style={styles.record}>
                  <Text style={globalTextStyles.commonText}> Food</Text>
                  <Text style={globalTextStyles.smallText}> Chinese </Text>
                </View>
                <View style={styles.recordValue}>
                  <Text style={[globalTextStyles.commonText]}>74.20 -</Text>
                </View>
              </View>
              {/* 2nd record */}
              <View style={styles.recordView}>
                <View style={styles.recordIcon}>
                  <Icon name="pay-circle-o1" size={20} color={"#000"} />
                </View>
                <View style={styles.record}>
                  <Text style={globalTextStyles.commonText}> Food</Text>
                  <Text style={globalTextStyles.smallText}> Chinese </Text>
                </View>
                <View style={styles.recordValue}>
                  <Text style={[globalTextStyles.commonText]}>74.20 -</Text>
                </View>
              </View>
            </View>
            {/* close */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <Text>Got Error....</Text>;
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  content: {
    width: "100%",
    alignItems: "center",
  },

  dropdown: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "95%",
    height: 50,
    flexDirection: "row",
    marginTop: 2,
    alignSelf: "center",
    marginBottom: 5,
  },
  dropdownText: {
    flexDirection: "row",
  },
  title: {
    flexGrow: 3,
    justifyContent: "flex-start",
  },

  dropdownImage: {
    flexGrow: 1,
    justifyContent: "center",
  },

  dropdownIcon: {
    flexGrow: 1,
    justifyContent: "flex-end",
    marginRight: 10,
  },

  actions: {
    width: "100%",
  },
  shadowBoarder: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
    borderColor: "grey",
  },
  balance: {
    width: "95%",
  },
  viewTitle: {
    fontWeight: "500",
    marginLeft: 10,
    marginTop: 10,
  },
  date: {
    color: "#bfbfbf",
    marginLeft: 10,
  },
  details: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  detailHead: {
    flexGrow: 1,
    alignItems: "flex-end",
    marginRight: 5,
  },
  detailValues: {
    flexGrow: 2,
    alignItems: "flex-end",
    marginRight: 10,
  },

  summary: {
    marginTop: 15,
  },
  tenRecords: {
    marginTop: 15,
    marginBottom: 15,
  },
  recordView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 5,
  },
  recordIcon: {
    marginLeft: 10,
    marginTop: 3,
  },
  record: {
    marginLeft: 10,
    flexGrow: 2,
    justifyContent: "flex-start",
  },
  recordValue: {
    flexGrow: 1,
    alignItems: "flex-end",
    marginRight: 10,
  },
  icons: {
    height: 30,
    width: 30,
  },
});
