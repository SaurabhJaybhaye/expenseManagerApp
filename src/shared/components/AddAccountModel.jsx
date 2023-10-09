import { Formik } from "formik";
import React from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import SwitchToggle from "react-native-switch-toggle";
import { useDispatch } from "react-redux";
import { addAccount } from "../../redux/slices/accountSlice";
import { ACCOUNT_TYPES, CURRENCY_TYPES } from "../Constants";
import { globalTextStyles } from "./GlobalStyles";

const AddAccountModel = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();

  const addNewAccount = async (values) => {
    const response = await dispatch(
      await addAccount({
        accountName: values.accountName,
        description: values.description,
        icon: values.icon,
        type: values.type,
        currency: values.currency,
        balance: values.balance,
        limit: values.limit,
        positiveOpening: values.positiveOpening === true ? 1 : 0,
        showAccount: values.showAccount === true ? 1 : 0,
      })
    );
    console.log("response", response);
    setModalVisible(false);
  };

  const initialValues = {
    accountName: "bank",
    description: "naskdna",
    icon: "test",
    type: "Expense",
    currency: "INR",
    balance: "2455",
    limit: "61827",
    showAccount: true,
    positiveBalanceOpening: true,
  };

  const handleSubmit = (values) => {
    addNewAccount(values);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={{ justifyContent: "center" }}
      >
        <View style={styles.modal}>
          <Text style={globalTextStyles.headingText}>New Account</Text>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleChange, handleSubmit, values, setFieldValue }) => (
              <View>
                <TextInput
                  onChangeText={handleChange("accountName")}
                  value={values.accountName}
                  placeholder="Account Name"
                />
                <TextInput
                  onChangeText={handleChange("description")}
                  value={values.description}
                  placeholder="Description"
                />
                <SelectDropdown
                  data={ACCOUNT_TYPES}
                  onSelect={(selectedItem) =>
                    handleChange("type")(selectedItem)
                  }
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  defaultButtonText="Select Type"
                />
                <SelectDropdown
                  data={CURRENCY_TYPES}
                  onSelect={(selectedItem) =>
                    handleChange("currency")(selectedItem)
                  }
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  defaultButtonText="Select Currency"
                />
                <TextInput
                  onChangeText={handleChange("balance")}
                  value={values.balance}
                  placeholder="Initial Balance"
                  keyboardType="numeric"
                />
                <TextInput
                  onChangeText={handleChange("limit")}
                  value={values.limit}
                  placeholder="Limit"
                  keyboardType="numeric"
                />
                <Text>Show Account</Text>
                <SwitchToggle
                  switchOn={values.showAccount}
                  onPress={() =>
                    setFieldValue("showAccount", !values.showAccount)
                  }
                  circleColorOn="#4cd137"
                  circleColorOff="#ecf0f1"
                  backgroundOn="#7bed9f"
                  backgroundOff="#95a5a6"
                />
                <Text>Positive Balance Opening</Text>
                <SwitchToggle
                  switchOn={values.positiveBalanceOpening}
                  onPress={() =>
                    setFieldValue(
                      "positiveBalanceOpening",
                      !values.positiveBalanceOpening
                    )
                  }
                  circleColorOn="#4cd137"
                  circleColorOff="#ecf0f1"
                  backgroundOn="#7bed9f"
                  backgroundOff="#95a5a6"
                />
                <Button title="Submit" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
};

export default AddAccountModel;

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
});
