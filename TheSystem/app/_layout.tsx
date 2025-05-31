import { Stack, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import Footer from '@components/Footer';
import { getCurrentUser } from '../utils/auth';

import * as ScreenOrientation from 'expo-screen-orientation';

export default function Layout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  const inDungeon = segments.includes('dungeon');
  const onAuthScreen =
    segments.includes('login') ||
    segments.includes('register') ||
    segments.includes('selectRank') ||
    segments.includes('selectProductivity') ||
    segments.includes('selectClass') ||
    segments.includes('profileCreated');

  const navigate = (targetRoute: string) => {
    if (inDungeon) {
      router.push({ pathname: '/leave', params: { next: targetRoute } });
    } else {
      router.push(targetRoute);
    }
  };

   useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      const isIncomplete =
        !user?.rank || !user?.class || !user?.productivity;

      if ((!user || isIncomplete) && !onAuthScreen) {
        router.replace('/login');
      }
    };
    checkAuth();
  }, [segments]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Header onMenuPress={() => setSidebarVisible(true)} navigate={navigate} />
      {sidebarVisible && (
  <Sidebar
    visible={sidebarVisible}
    onClose={() => setSidebarVisible(false)}
    navigate={navigate}
  />
)}


      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </View>

      <Footer navigate={navigate} />
    </GestureHandlerRootView>
  );
}
