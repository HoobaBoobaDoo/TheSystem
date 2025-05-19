import { Stack, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import Footer from '@components/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';

export default function Layout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  const segment = Array.isArray(segments) && segments.length > 0 ? segments[0] : null;

  const inDungeon = segments.includes('dungeon');
  const onAuthScreen = ['login', 'register', 'selectRank', 'selectProductivity', 'selectClass', 'profileCreated'].includes(segment || '');

  const navigate = (targetRoute: string) => {
    if (inDungeon) {
      router.push({ pathname: '/leave', params: { next: targetRoute } });
    } else {
      router.push(targetRoute);
    }
  };

  useEffect(() => {
    let didFinish = false;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isLoggedIn = !!user;

      if (!isLoggedIn && !onAuthScreen) {
        router.replace('/login');
      }

      if (!didFinish) {
        didFinish = true;
        setCheckingAuth(false);
      }
    });

    const timeout = setTimeout(() => {
      if (!didFinish) {
        console.warn('⚠️ Auth check timed out');
        setCheckingAuth(false);
      }
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [segment]);

  if (checkingAuth) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Header onMenuPress={() => setSidebarVisible(true)} navigate={navigate} />
      <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} navigate={navigate} />
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
