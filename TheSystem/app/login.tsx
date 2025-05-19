  import React, { useState } from 'react';
  import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
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
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcome}>Welcome back!</Text>

          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.iconRow}>
            {[...Array(4)].map((_, index) => (
              <TouchableOpacity key={index} style={styles.iconButton} />
            ))}
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/register')}>
            <Text style={styles.signupText}>No account? Make one here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 40,
      height: '100%',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: 60,
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    welcome: {
      fontSize: 16,
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      marginBottom: 4,
    },
    input: {
      backgroundColor: '#ccc',
      borderRadius: 6,
      padding: 10,
      marginBottom: 16,
    },
    loginButton: {
      backgroundColor: '#888',
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
      backgroundColor: '#aaa',
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    signupButton: {
      backgroundColor: '#aaa',
      paddingVertical: 12,
      borderRadius: 6,
      alignItems: 'center',
    },
    signupText: {
      color: '#fff',
      fontSize: 14,
    },
  });
