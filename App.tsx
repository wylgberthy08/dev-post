import "react-native-gesture-handler";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Routes } from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/authContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider >
        <StatusBar
          backgroundColor="#36393f"
          barStyle="light-content"
          translucent={false}
        />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
