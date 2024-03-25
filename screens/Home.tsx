import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomSheet from "@gorhom/bottom-sheet";

import { Expenses } from "./Expenses";
import Add from "./Add";
import { Settings } from "./Settings";
import { Reports } from "./Reports";
import { TabBarIcon } from "../components/TabBarIcon";
import { theme } from "../theme";
import React, { useRef } from "react";

const Tab = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        tabBarStyle: {
          backgroundColor: theme.colors.card,
        },
        headerStyle: {
          height: 120,
        },
        headerTitleStyle: {
          fontSize: 30,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type="expenses" />,
        }}
        name="Расходы"
        component={Expenses}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type="reports" />,
        }}
        name="Анализ"
        component={Reports}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type="add" />,
        }}
        name="Добавить"
        component={Add}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type="settings" />,
        }}
        name="Настройки"
        component={Settings}
      />
    </Tab.Navigator>
  );
};
