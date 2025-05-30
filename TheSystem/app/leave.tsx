import React, { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import TypingText from '@components/TypingText';
import { getCurrentUser } from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LeaveScreen() {
  const router = useRouter();
  const { next } = useLocalSearchParams();
  const nextRoute = typeof next === 'string' ? next : '/';

  const [loading, setLoading] = useState(false);

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
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Stack.Screen options={{ headerShown: false }} />
          <View style={styles.content}>
            <TypingText style={styles.header}>Are you sure you want to leave?</TypingText>
            <TypingText style={styles.text}>You will fail this dungeon!</TypingText>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleLeave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <TypingText style={styles.buttonText}>Leave dungeon</TypingText>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => router.back()}
            disabled={loading}
          >
            <TypingText style={styles.buttonText}>Go back</TypingText>
          </TouchableOpacity>
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
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
  header: {
    fontSize: 50,
    marginBottom: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'rgba(206, 220, 224, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginBottom: 30,
  },
  buttonCancel: {
    alignSelf: 'center',
    backgroundColor: 'rgba(147, 158, 161, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
  },
});
