import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypingText from '@components/TypingText';
import { useRouter } from 'expo-router';
import { logoutUser } from '../utils/auth';
import * as LocalAuthentication from 'expo-local-authentication';

export default function SettingsScreen() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Biometric authentication not supported on this device.');
        router.replace('/login');
        return;
      }
      const savedCredentials = await LocalAuthentication.isEnrolledAsync();
      if (!savedCredentials) {
        Alert.alert('No biometric credentials enrolled.');
        router.replace('/login');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access Settings',
        fallbackLabel: 'Use Passcode',
        disableDeviceFallback: false,
      });

      if (!result.success) {
        Alert.alert('Authentication failed. Access denied.');
        router.replace('/login');
      }
    })();
  }, []);

  const settingsOptions = [
    { label: 'Account', route: '/settings/account' },
    { label: 'Notifications', route: '/settings/notifications' },
    { label: 'Privacy', route: '/settings/privacy' },
    { label: 'Appearance', route: '/settings/appearance' },
    { label: 'About', route: '/settings/about' },
    { label: 'Share App', route: 'share' }, // Nieuw
    { label: 'Logout', route: 'logout' },
  ];

  const handlePress = async (item: { label: string; route: string }) => {
    if (item.route === 'logout') {
      Alert.alert('Log out', 'Are you sure you want to log out?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log out',
          style: 'destructive',
          onPress: async () => {
            await logoutUser();
            router.replace('/login');
          },
        },
      ]);
    } else if (item.route === 'share') {
      try {
        await Share.share({
          message: 'We should get productive together! https://thesystem.com',
          url: 'https://thesystem.com',
          title: 'TheSystem App',
        });
      } catch (error) {
        Alert.alert('Error', 'Could not open share dialog.');
      }
    } else {
      router.push(item.route);
    }
  };

  return (
    <View style={styles.container}>
      <TypingText style={styles.title}>Settings</TypingText>
      <View style={styles.list}>
        {settingsOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => handlePress(item)}
          >
            <TypingText style={styles.optionText}>{item.label}</TypingText>
            <Ionicons name="chevron-forward" size={20} color="#444" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    gap: 12,
  },
  option: {
    backgroundColor: '#eee',
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});
