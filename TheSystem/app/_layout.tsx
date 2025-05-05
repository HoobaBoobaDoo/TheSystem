import { Stack, useRouter, useSegments } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import Footer from "@components/Footer";

export default function Layout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const router = useRouter();
  const segments = useSegments();

  const inDungeon = segments.includes("dungeon");

  const navigate = (targetRoute: string) => {
    if (inDungeon) {
      router.push({ pathname: '/leave', params: { next: targetRoute } });
    } else {
      router.push(targetRoute);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header 
        onMenuPress={() => setSidebarVisible(true)} 
        navigate={navigate}
      />
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        navigate={navigate}
      />

      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </View>

      <Footer navigate={navigate} />
    </View>
  );
}
