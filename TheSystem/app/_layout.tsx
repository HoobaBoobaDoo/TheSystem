import { Stack, useRouter, useSegments } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";

export default function Layout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const router = useRouter();
  const segments = useSegments();

  // Check if we're inside the dungeon
  const inDungeon = segments.includes("dungeon");

  // Wrapped navigation function
  const navigate = (targetRoute: string) => {
    if (inDungeon) {
      router.push({ pathname: '/leave', params: { next: targetRoute } });
    } else {
      router.push(targetRoute);
    }
  };
  

  return (
    <>
      <Header 
        onMenuPress={() => setSidebarVisible(true)} 
        navigate={navigate}  // Pass the custom navigation to header
      />
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        navigate={navigate}  // Pass the custom navigation to sidebar
      />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </>
  );
}
