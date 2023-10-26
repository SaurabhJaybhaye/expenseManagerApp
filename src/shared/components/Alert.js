import { ToastAndroid } from "react-native";

const Alert = (title) => {
  ToastAndroid.showWithGravity(title, ToastAndroid.SHORT, ToastAndroid.CENTER);
};

export default Alert;
