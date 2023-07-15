import React from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

import Feather from "react-native-vector-icons/Feather";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Search } from "../pages/Search";
import { NewPosts } from "../pages/NewPost";
import { PostsUser } from "../pages/PostsUser";

interface StackScreenOptions extends StackNavigationOptions {}

interface TabScreenOptions extends BottomTabNavigationOptions {}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false } as StackScreenOptions}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPosts}
        options={
          {
            title: "Novo Post",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#36393f",
            },
          } as StackScreenOptions
        }
      />
      <Stack.Screen
        name="PostsUser"
        component={PostsUser}
        options={
          {
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#36393f",
            },
          } as StackScreenOptions
        }
      />
    </Stack.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#202225",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackRoutes}
        options={
          {
            tabBarIcon: ({ color, size }) => {
              return <Feather name="home" color={color} size={size} />;
            },
          } as TabScreenOptions
        }
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={
          {
            tabBarIcon: ({ color, size }) => {
              return <Feather name="search" color={color} size={size} />;
            },
          } as TabScreenOptions
        }
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={
          {
            tabBarIcon: ({ color, size }) => {
              return <Feather name="user" color={color} size={size} />;
            },
          } as TabScreenOptions
        }
      />
    </Tab.Navigator>
  );
}
