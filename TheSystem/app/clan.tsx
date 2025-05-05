import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GuildScreen() {
  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.content}>
        <Ionicons name="person-circle" size={80} color="#555" />

        <Text style={styles.guildTitle}>The productive monkeys</Text>

        <Text style={styles.subtitle}>
          Our goal is to be the most productive monkeys on the planet!
        </Text>

        {Array.from({ length: 6 }).map((_, index) => (
          <TouchableOpacity key={index} style={styles.placeholderBox} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    backgroundColor: '#222',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  guildTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  placeholderBox: {
    width: '90%',
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 6,
    marginTop: 12,
  },
});
