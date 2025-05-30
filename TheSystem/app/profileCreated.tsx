import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getCurrentUser } from '../utils/auth';
import { User } from '../types/User';

export default function ProfileCreatedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const rank = params.rank as string;
  const productivity = params.productivity as string;
  const selectedClass = params.class as string;
  const username = params.username as string;

  useEffect(() => {
    const finalize = async () => {
      const user = await getCurrentUser();
      if (!user) {
        console.warn('No current user found');
        return;
      }

      let parsedProductivity: string[] = [];

      try {
        parsedProductivity = JSON.parse(productivity);
        if (!Array.isArray(parsedProductivity)) throw new Error('Invalid structure');
      } catch (e) {
        console.error('Failed to parse productivity:', e);
        parsedProductivity = [];
      }

      const updatedUser: User = {
        ...user,
        rank,
        class: selectedClass,
        productivity: parsedProductivity,
      };

      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
    };

    finalize();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/neon_room.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.text}>Profile created!</Text>
        <Text style={styles.text}>
          Welcome {rank ?? ''} hunter{' '}
          <Text style={styles.highlight}>{username ?? 'Unknown hunter'}</Text>!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.buttonText}>Finish profile</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  background: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  highlight: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 30,
    backgroundColor: 'rgba(138, 159, 165, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
  },
});
