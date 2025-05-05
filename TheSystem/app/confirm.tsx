import React from 'react';
import { Stack } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ConfirmScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.content}>
        <Text style={styles.text}>Are you sure?</Text>
        <Text style={styles.text}>In this mode you can't....</Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/dungeon')}> 
        <Text style={styles.buttonText}>Enter dungeon</Text>
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
  header: {
    height: 120,
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
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
