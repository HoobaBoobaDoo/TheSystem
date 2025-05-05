import React from 'react';
import { Stack } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TypingText from '@components/TypingText';

export default function ConfirmScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.content}>
        <TypingText style={styles.text}>Are you sure?</TypingText>
        <TypingText style={styles.text}>In this mode you can't....</TypingText>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/dungeon')}> 
        <TypingText style={styles.buttonText}>Enter dungeon</TypingText>
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
