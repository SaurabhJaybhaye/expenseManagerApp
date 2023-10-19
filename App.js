import "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./src/redux/app/store";
import { initDatabase } from "./src/shared/db/database";
import { useEffect } from "react";
import Loader from "./src/screens/Loader";

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);
  return (
    <Provider store={store}>
      <Loader />
      <AppNavigator />
    </Provider>
  );
}
