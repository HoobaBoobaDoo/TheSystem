import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSegments } from 'expo-router';

type FooterTabsProps = {
  navigate: (route: string) => void;
};

export default function FooterTabs({ navigate }: FooterTabsProps) {
  const segments = useSegments();
  const current = '/' + segments[0];

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.tab} onPress={() => navigate('/')}>
        <Ionicons name="home-outline" size={24} color="#fff" />
        <Text style={[styles.tabText, current === '/' && styles.active]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => navigate('/clan')}>
        <Ionicons name="people-outline" size={24} color="#fff" />
        <Text style={[styles.tabText, current === '/clan' && styles.active]}>Clan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => navigate('/weekly')}>
        <Ionicons name="calendar-outline" size={24} color="#fff" />
        <Text style={[styles.tabText, current === '/weekly' && styles.active]}>Weekly</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  active: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
