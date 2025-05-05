import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LeaveScreen() {
  const router = useRouter();
  const { next } = useLocalSearchParams();
  const nextRoute = typeof next === 'string' ? next : '/';

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.content}>
        <Text style={styles.text}>Are you sure you want to leave?</Text>
        <Text style={styles.text}>You will fail this dungeon!</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push(nextRoute)}>
        <Text style={styles.buttonText}>Leave dungeon</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go back to dungeon</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    color: '#000',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#888',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});
