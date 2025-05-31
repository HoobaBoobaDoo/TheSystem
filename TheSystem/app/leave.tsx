import React, { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import TypingText from '@components/TypingText';
import { getCurrentUser } from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LeaveScreen() {
  const router = useRouter();
  const { next } = useLocalSearchParams();
  const nextRoute = typeof next === 'string' ? next : '/';

  const [loading, setLoading] = useState(false);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const handleLeave = async () => {
    setLoading(true);
    const user = await getCurrentUser();
    if (user) {
      user.level = (user.level ?? 0) + 1;
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    }
    setLoading(false);
    router.push(nextRoute);
  };

  return (
    <ImageBackground
      source={require('../assets/portal.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.container, isLandscape && styles.containerLandscape]}>
        <View style={[styles.overlay, isLandscape && styles.overlayLandscape]}>
          <Stack.Screen options={{ headerShown: false }} />

          <View style={[styles.content, isLandscape && styles.contentLandscape]}>
            <View style={styles.textContainer}>
              <TypingText style={[styles.header, isLandscape && styles.headerLandscape]}>
                Are you sure you want to leave?
              </TypingText>
              <TypingText style={[styles.text, isLandscape && styles.textLandscape]}>
                You will fail this dungeon!
              </TypingText>
            </View>

            <View style={[styles.buttonsContainer, isLandscape && styles.buttonsContainerLandscape]}>
              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.7 }, isLandscape && styles.buttonLandscape]}
                onPress={handleLeave}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <TypingText style={[styles.buttonText, isLandscape && styles.buttonTextLandscape]}>
                    Leave dungeon
                  </TypingText>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonCancel, isLandscape && styles.buttonCancelLandscape]}
                onPress={() => router.back()}
                disabled={loading}
              >
                <TypingText style={[styles.buttonText, isLandscape && styles.buttonTextLandscape]}>
                  Go back
                </TypingText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
    height: '100%',
  },
  containerLandscape: {
    paddingHorizontal: 40,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0,
    marginTop: 0,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    height: '100%',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  overlayLandscape: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  contentLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 20,
  },
  header: {
    fontSize: 50,
    marginBottom: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerLandscape: {
    fontSize: 32,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
  textLandscape: {
    fontSize: 14,
  },
  buttonsContainer: {
    marginTop: 20,
  },
  buttonsContainerLandscape: {
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'rgba(206, 220, 224, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginBottom: 20,
  },
  buttonLandscape: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  buttonCancel: {
    alignSelf: 'center',
    backgroundColor: 'rgba(147, 158, 161, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  buttonCancelLandscape: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
  },
  buttonTextLandscape: {
    fontSize: 18,
  },
});
