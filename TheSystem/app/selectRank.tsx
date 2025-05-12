import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const options = [
  { label: 'I am doing this for fun', value: 'E-rank' },
  { label: 'I just wanna be a little more productive', value: 'C-rank' },
  { label: 'I want to be more motivated to be productive', value: 'B-rank' },
  { label: 'I want to change my life', value: 'A-rank' },
  { label: 'The grindset is the new mindset', value: 'S-rank' },
];

export default function SelectRankScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.question}>How serious are you about productivity?</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.option, selected === option.value && styles.selected]}
          onPress={() => setSelected(option.value)}
        >
          <Text>{option.label}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[styles.nextButton, !selected && styles.disabled]}
        onPress={() => {
          if (selected) {
            router.push({
              pathname: '/selectProductivity',
              params: {
                ...params,
                rank: selected,
              },
            });
          }
        }}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  question: {
    fontSize: 16,
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  selected: {
    backgroundColor: '#aaa',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#888',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  nextText: {
    color: '#fff',
  },
});
