import React from 'react';
import { Stack } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity,ImageBackground } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TypingText from '@components/TypingText';

export default function ConfirmScreen() {
  const router = useRouter();
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
        <TypingText style={styles.header}>Are you sure?</TypingText>
        <TypingText style={styles.text}>In this mode you can't....</TypingText>
        <TypingText style={styles.text}>   - Exit the page</TypingText>
        <TypingText style={styles.text}>   - Exit the app</TypingText>
        <TypingText style={styles.text}>If you do so, you will lose all fail this dungeon and lose all your dungeon progress!</TypingText>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/dungeon')}> 
        <TypingText style={styles.buttonText}>Enter dungeon</TypingText>
      </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={() => router.back()}>
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
