import React, { useContext } from "react";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../contexts/authContext";

export function Routes() {
  const { signed, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#36393f",
        }}
      >
        <ActivityIndicator size={50} color="#e52246" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
