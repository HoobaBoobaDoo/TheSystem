import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypingText from '@components/TypingText';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const settingsOptions = [
    { label: 'Account', route: '/settings/account' },
    { label: 'Notifications', route: '/settings/notifications' },
    { label: 'Privacy', route: '/settings/privacy' },
    { label: 'Appearance', route: '/settings/appearance' },
    { label: 'About', route: '/settings/about' }
  ];

  return (
    <View style={styles.container}>
      <TypingText style={styles.title}>Settings</TypingText>
      <View style={styles.list}>
        {settingsOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => router.push(item.route)}
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
