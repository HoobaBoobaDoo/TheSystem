import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypingText from '@components/TypingText';

export default function EditStatsScreen() {
  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.content}>

        <TypingText style={styles.sectionTitle}>Selected stats</TypingText>
        {Array.from({ length: 4 }).map((_, index) => (
          <TouchableOpacity key={`selected-${index}`} style={styles.statBox} />
        ))}

        <TypingText style={styles.sectionTitle}>Other stats</TypingText>
        {Array.from({ length: 6 }).map((_, index) => (
          <TouchableOpacity key={`other-${index}`} style={styles.statBox} />
        ))}

        <TouchableOpacity style={styles.doneButton}>
          <TypingText style={styles.doneButtonText}>Done</TypingText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  statBox: {
    width: '100%',
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },
  doneButton: {
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
