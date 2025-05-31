import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '../utils/auth';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const error = await loginUser(email, password);
    if (error) {
      Alert.alert('Login failed', error);
    } else {
      router.replace('/');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/neon_room.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={styles.overlay}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.welcome}>Welcome hunter!</Text>

            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              textContentType="password"
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.iconRow}>
              {[...Array(4)].map((_, index) => (
                <TouchableOpacity key={index} style={styles.iconButton} />
              ))}
            </View>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.signupText}>No account? Make one here!</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    height: '100%',
  },
  background: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcome: {
    fontSize: 30,
    marginBottom: 20,
    color: '#fff',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#fff',
  },
  input: {
    backgroundColor: 'rgba(138, 159, 165, 0.6)',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    color: '#fff',
  },
  loginButton: {
    backgroundColor: 'rgba(138, 159, 165, 0.9)',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(138, 159, 165, 0.8)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButton: {
    backgroundColor: 'rgba(138, 159, 165, 0.9)',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 14,
  },
});
