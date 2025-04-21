import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";

export default function Layout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      <Header onMenuPress={() => setSidebarVisible(true)} />
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right", // or 'fade', 'slide_from_bottom', etc.
        }}
      />
    </>
  );
}
