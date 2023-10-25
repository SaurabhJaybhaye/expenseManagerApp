import React, { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import SwitchToggle from "react-native-switch-toggle";
import { useDispatch } from "react-redux";
import { addAccount, updateAccount } from "../../redux/slices/accountSlice";
import { ACCOUNT_TYPES, CURRENCY_TYPES } from "../Constants";
import { addAccountSchema } from "../schema/addAccountSchema";
import { globalTextStyles } from "./GlobalStyles";
import IconSelectModel from "./IconSelectModel";
import { useFormik } from "formik";

const AddAccountModel = ({
  modalVisible,
  setModalVisible,
  selectedAccount,
  setSelectedAccount,
  edit,
  setEdit,
}) => {
  const dispatch = useDispatch();
  const [iconModalVisible, setIconModalVisible] = useState(false);

  const handleClose = () => {
    setSelectedAccount({});
    setEdit(false);
    formik.resetForm();
    setModalVisible(false);
  };

  const postData = async (values) => {
    const response = await dispatch(
      addAccount({
        accountName: values.accountName,
        description: values.description,
        icon: values.icon,
        type: values.type,
        currency: values.currency,
        balance: values.balance,
        limit: values.limit,
        positiveOpening: values.positiveBalanceOpening === true ? 1 : 0,
        showAccount: values.showAccount === true ? 1 : 0,
      })
    );
    console.log(values);
    handleClose();
  };

  const putData = async (values) => {
    const response = await dispatch(
      updateAccount({
        id: selectedAccount.id,
        accountName: values.accountName,
        description: values.description,
        icon: values.icon,
        type: values.type,
        currency: values.currency,
        balance: values.balance,
        limit: values.limit,
        positiveOpening: values.positiveBalanceOpening === true ? 1 : 0,
        showAccount: values.showAccount === true ? 1 : 0,
      })
    );
    handleClose();
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log(selectedAccount);
      if (edit && selectedAccount.id) {
        formik.setFieldValue("accountName", selectedAccount.accountName);
        formik.setFieldValue("description", selectedAccount.description);
        formik.setFieldValue("icon", Number(selectedAccount.icon));
        formik.setFieldValue("balance", String(selectedAccount.balance));
        formik.setFieldValue("limit", String(selectedAccount.limits));
        formik.setFieldValue(
          "showAccount",
          selectedAccount.showAccount == 0 ? false : true
        );
        formik.setFieldValue(
          "positiveBalanceOpening",
          selectedAccount.positiveOpening == 0 ? false : true
        );
        if (
          selectedAccount.types &&
          ACCOUNT_TYPES.includes(selectedAccount.types)
        ) {
          formik.setFieldValue("type", selectedAccount.types);
        }
        if (
          selectedAccount.currency &&
          CURRENCY_TYPES.includes(selectedAccount.currency)
        ) {
          formik.setFieldValue("currency", selectedAccount.currency);
        }
      }
    }, [modalVisible])
  );

  // Inside the `useEffect` block

  const formik = useFormik({
    validationSchema: addAccountSchema,
    initialValues: {
      accountName: "",
      description: "",
      icon: 20,
      type: "",
      currency: "",
      balance: "",
      limit: "",
      showAccount: true,
      positiveBalanceOpening: true,
    },
    onSubmit: (values) => {
      if (edit) {
        putData(values);
      } else {
        postData(values);
      }
      formik.resetForm();
    },
  });

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          handleClose();
        }}
        style={{ justifyContent: "center" }}
      >
        <View style={styles.modal}>
          {edit ? (
            <Text style={globalTextStyles.headingText}>Update Account</Text>
          ) : (
            <Text style={globalTextStyles.headingText}>New Account</Text>
          )}
          <View style={styles.from}>
            <TouchableOpacity
              style={styles.imageView}
              onPress={() => setIconModalVisible(true)}
            >
              <Image source={formik.values.icon} style={styles.selectedIcon} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={formik.handleChange("accountName")}
              value={formik.values.accountName}
              placeholder="Account Name"
              name="accountName"
            />
            {formik.touched.accountName && formik.errors.accountName && (
              <Text style={styles.errors}>{formik.errors.accountName}</Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={formik.handleChange("description")}
              value={formik.values.description}
              placeholder="Description"
              name="description"
            />
            {formik.touched.description && formik.errors.description && (
              <Text style={styles.errors}>{formik.errors.description}</Text>
            )}
            <SelectDropdown
              style={styles.select}
              data={ACCOUNT_TYPES}
              name="type"
              defaultValue={formik.values.type}
              onSelect={(selectedItem) =>
                formik.handleChange("type")(selectedItem)
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
            {formik.touched.type && formik.errors.type && (
              <Text style={styles.errors}>{formik.errors.type}</Text>
            )}
            <SelectDropdown
              data={CURRENCY_TYPES}
              onSelect={(selectedItem) =>
                formik.handleChange("currency")(selectedItem)
              }
              name="currency"
              defaultValue={formik.values.currency}
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
            {formik.touched.currency && formik.errors.currency && (
              <Text style={styles.errors}>{formik.errors.currency}</Text>
            )}

            <TextInput
              onChangeText={formik.handleChange("balance")}
              value={formik.values.balance}
              placeholder="Initial Balance"
              keyboardType="numeric"
              style={styles.input}
              name="balance"
            />
            {formik.touched.balance && formik.errors.balance && (
              <Text style={styles.errors}>{formik.errors.balance}</Text>
            )}
            <TextInput
              onChangeText={formik.handleChange("limit")}
              value={formik.values.limit}
              placeholder="Limit"
              keyboardType="numeric"
              style={styles.input}
              name="limit"
            />
            {formik.touched.limit && formik.errors.limit && (
              <Text style={styles.errors}>{formik.errors.limit}</Text>
            )}
            <Text style={styles.label}>Show Account</Text>
            <SwitchToggle
              switchOn={formik.values.showAccount}
              onPress={() =>
                formik.setFieldValue("showAccount", !formik.values.showAccount)
              }
              circleColorOn="#4cd137"
              circleColorOff="#ecf0f1"
              backgroundOn="#7bed9f"
              backgroundOff="#95a5a6"
            />
            <Text style={styles.label}>Positive Balance Opening</Text>
            <SwitchToggle
              switchOn={formik.values.positiveBalanceOpening}
              onPress={() =>
                formik.setFieldValue(
                  "positiveBalanceOpening",
                  !formik.values.positiveBalanceOpening
                )
              }
              circleColorOn="#4cd137"
              circleColorOff="#ecf0f1"
              backgroundOn="#7bed9f"
              backgroundOff="#95a5a6"
            />
            <View style={styles.btn}>
              <Button title="Submit" onPress={formik.handleSubmit} />
            </View>
            <View style={styles.btn}>
              <Button
                title="Cancel"
                color="#ed0909"
                onPress={() => {
                  handleClose();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <IconSelectModel
        iconModalVisible={iconModalVisible}
        setIconModalVisible={setIconModalVisible}
        setSelectedIcon={(icon) => formik.setFieldValue("icon", icon)}
      />
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
  selectedIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5,
  },
  imageView: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 50,
    width: 65,
    height: 65,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5,
  },
});
