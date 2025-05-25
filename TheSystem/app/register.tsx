import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { registerUser } from '../utils/auth';
import { User } from '../types/User';

export default function RegisterScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !fullName || !email || !password) {
      Alert.alert('Missing information', 'Please fill in all fields.');
      return;
    }

    const baseUser: User = {
  username,
  fullName,
  email,
  password,
  profilePicture: '',
  rank: '',
  class: '',
  tags: [],
  todos: [],
  level: 1,
  productivity: [],
};


    const error = await registerUser(baseUser);
    if (error) {
      Alert.alert('Registration failed', error);
    } else {
      router.push({
        pathname: '/selectRank',
        params: { username },
      });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/neon_room.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.welcome}>Register now!</Text>

            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Your username"
              placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>Full Name:</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Your full name"
              placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#ccc"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#ccc"
              secureTextEntry
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
              <Text style={styles.loginButtonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.iconRow}>
              {[...Array(4)].map((_, index) => (
                <TouchableOpacity key={index} style={styles.iconButton} />
              ))}
            </View>

            <TouchableOpacity style={styles.signupButton}>
              <Text style={styles.signupText}>Already have an account? Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  background: {
    flex: 1,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    color: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcome: {
    fontSize: 36,
    marginBottom: 20,
    color: "#fff",
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#fff",
  },
  input: {
    backgroundColor: 'rgba(138, 159, 165, 0.8)',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: 'rgba(138, 159, 165, 0.9)',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(138, 159, 165, 0.6)',
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  signupButton: {
    backgroundColor: 'rgba(138, 159, 165, 0.9)',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  signupText: {
    color: "#fff",
    fontSize: 14,
  },
});
