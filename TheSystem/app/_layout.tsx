import { Stack, useRouter, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import Footer from "@components/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

export default function Layout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  const inDungeon = segments.includes("dungeon");
  const onAuthScreen =
    segments.includes("login") ||
    segments.includes("register") ||
    segments.includes("selectRank") ||
    segments.includes("selectProductivity") ||
    segments.includes("selectClass") ||
    segments.includes("profileCreated");

  const navigate = (targetRoute: string) => {
    if (inDungeon) {
      router.push({ pathname: "/leave", params: { next: targetRoute } });
    } else {
      router.push(targetRoute);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔐 Auth state changed:", user?.uid || "No user");

      if (!user && !onAuthScreen) {
        router.replace("/login");
      }

      if (user && onAuthScreen) {
        router.replace("/");
      }

      setCheckingAuth(false);
    });

    return unsubscribe;
  }, [segments]);

  if (checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Header onMenuPress={() => setSidebarVisible(true)} navigate={navigate} />
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
    </GestureHandlerRootView>
  );
}
