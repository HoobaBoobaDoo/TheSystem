import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-facebook';
import { useNavigation } from '@react-navigation/native';

const RegistratieScherm: React.FC = () => {
  const navigation = useNavigation();

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_GOOGLE_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_GOOGLE_IOS_CLIENT_ID',
    androidClientId: 'YOUR_GOOGLE_ANDROID_CLIENT_ID',
  });

  const handleGoogleLogin = async () => {
    const result = await googlePromptAsync();
    if (result.type === 'success') {
      const { access_token } = result.params;
      // Verstuur de access_token naar je backend voor verificatie
      navigation.navigate('Home', { username: 'Google Gebruiker' });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: 'YOUR_FACEBOOK_APP_ID',
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Verstuur de token naar je backend voor verificatie
        navigation.navigate('Home', { username: 'Facebook Gebruiker' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registreren of Inloggen</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Inloggen met Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFacebookLogin}>
        <Text style={styles.buttonText}>Inloggen met Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RegistratieScherm;