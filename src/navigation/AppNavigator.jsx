import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PATHS } from "../shared/Constants";
import DrawerNavigator from "./DrawerNavigator";
import FormsScreen from "../screens/FormsScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={PATHS.DRAWER}
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PATHS.FORMS}
          component={FormsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
