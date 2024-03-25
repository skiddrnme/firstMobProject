import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { theme } from "./theme";
import { TabBarIcon } from "./components/TabBarIcon";
import { Home } from "./screens/Home";
import { Categories } from "./screens/Categories";
import { useRef, useState } from "react";
import { Login } from "./screens/Login";
import { BSON } from "realm";
import { Provider } from "react-redux";
import { store } from "./store/store";
import * as Sentry from "sentry-expo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const Stack = createStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <StatusBar style="light" />
        <Stack.Navigator>
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Категории" component={Categories} />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    color: "#fff",
  },
});
