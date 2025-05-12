import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '../utils/auth';

export default function ProfileCreatedScreen() {
  const router = useRouter();
  const { rank, productivity, class: selectedClass, username } = useLocalSearchParams();

  useEffect(() => {
    const finalize = async () => {
      const user = await getCurrentUser();
      if (!user) return;

      const updatedUser = {
        ...user,
        rank: rank as string,
        class: selectedClass as string,
        productivity: JSON.parse(productivity as string),
      };

      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
    };

    finalize();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile created!</Text>
      <Text style={styles.text}>
        Welcome {rank} hunter <Text style={styles.highlight}>{username ?? ''}</Text>!
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Finish profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#888',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
  },
});
