import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const options = [
  'I want to start working out',
  'I want to improve/learn a skill',
  'I want to focus more on work',
  'I want to go outside more often',
];

export default function ClassScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const { rank } = useLocalSearchParams();

  const toggleSelect = (option: string) => {
    setSelected(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const goNext = () => {
    if (selected.length === 0) return;

    router.push({
      pathname: '/selectClass',
      params: {
        rank: rank as string,
        productivity: JSON.stringify(selected),
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.question}>What kind of productivity?</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.option, selected.includes(option) && styles.selected]}
          onPress={() => toggleSelect(option)}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.nextButton, selected.length === 0 && styles.disabled]}
        onPress={goNext}
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
