import { Formik } from "formik";
import React from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import SwitchToggle from "react-native-switch-toggle";
import { useDispatch } from "react-redux";
import { addAccount } from "../../redux/slices/accountSlice";
import { ACCOUNT_TYPES, CURRENCY_TYPES } from "../Constants";
import { addAccountSchema } from "../schema/addAccountSchema";
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
    setModalVisible(false);
  };

  const initialValues = {
    accountName: "",
    description: "",
    icon: "",
    type: "",
    currency: "",
    balance: "",
    limit: "",
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
          <Formik
            validationSchema={addAccountSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              setFieldValue,
              touched,
              errors,
            }) => (
              <View style={styles.from}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("accountName")}
                  value={values.accountName}
                  placeholder="Account Name"
                  name="accountName"
                />
                {touched.accountName && errors.accountName && (
                  <Text style={styles.errors}>{errors.accountName}</Text>
                )}
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("description")}
                  value={values.description}
                  placeholder="Description"
                  name="description"
                />
                {touched.description && errors.description && (
                  <Text style={styles.errors}>{errors.description}</Text>
                )}
                <SelectDropdown
                  style={styles.select}
                  data={ACCOUNT_TYPES}
                  name="type"
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
                  buttonStyle={{
                    borderColor: "#ccc",
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#fff",
                    marginTop: 10,
                  }}
                  buttonTextStyle={{
                    color: "#333",
                    fontSize: 16,
                  }}
                  rowStyle={{
                    borderBottomColor: "#ccc",
                    borderBottomWidth: 1,
                    padding: 10,
                  }}
                  rowTextStyle={{
                    color: "#333",
                    fontSize: 16,
                  }}
                />
                {touched.type && errors.type && (
                  <Text style={styles.errors}>{errors.type}</Text>
                )}
                <SelectDropdown
                  data={CURRENCY_TYPES}
                  onSelect={(selectedItem) =>
                    handleChange("currency")(selectedItem)
                  }
                  name="currency"
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  defaultButtonText="Select Currency"
                  buttonStyle={{
                    borderColor: "#ccc",
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#fff",
                    marginTop: 10,
                  }}
                  buttonTextStyle={{
                    color: "#333",
                    fontSize: 16,
                  }}
                  rowStyle={{
                    borderBottomColor: "#ccc",
                    borderBottomWidth: 1,
                    padding: 10,
                  }}
                  rowTextStyle={{
                    color: "#333",
                    fontSize: 16,
                  }}
                />
                {touched.currency && errors.currency && (
                  <Text style={styles.errors}>{errors.currency}</Text>
                )}

                <TextInput
                  onChangeText={handleChange("balance")}
                  value={values.balance}
                  placeholder="Initial Balance"
                  keyboardType="numeric"
                  style={styles.input}
                  name="balance"
                />
                {touched.balance && errors.balance && (
                  <Text style={styles.errors}>{errors.balance}</Text>
                )}
                <TextInput
                  onChangeText={handleChange("limit")}
                  value={values.limit}
                  placeholder="Limit"
                  keyboardType="numeric"
                  style={styles.input}
                  name="limit"
                />
                {touched.limit && errors.limit && (
                  <Text style={styles.errors}>{errors.limit}</Text>
                )}
                <Text style={styles.label}>Show Account</Text>
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
                <Text style={styles.label}>Positive Balance Opening</Text>
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
                <View style={styles.btn}>
                  <Button title="Submit" onPress={handleSubmit} />
                </View>
                <View style={styles.btn}>
                  <Button
                    title="Cancel"
                    color="#ed0909"
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
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
  from: {
    marginTop: 10,
  },
  input: {
    borderBottomColor: "#2cfc03",
    borderBottomWidth: 1,
    height: 40,
    marginTop: 5,
  },
  label: {
    marginTop: 5,
    marginBottom: -10,
  },
  btn: {
    marginTop: 5,
  },
  errors: {
    color: "#c21906",
  },
});
