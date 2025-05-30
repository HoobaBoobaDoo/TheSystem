import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const options = [
  'I want to start working out',
  'I want to improve/learn a skill',
  'I want to focus more on work',
  'I want to go outside more often',
];

export default function SelectProductivityScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const params = useLocalSearchParams();
  const rank = params.rank as string;
  const username = params.username as string;
  const fullName = params.fullName as string;
  const email = params.email as string;
  const password = params.password as string;

  const toggleSelect = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleNext = () => {
    if (selected.length === 0) {
      Alert.alert('Select at least one option');
      return;
    }

    router.push({
      pathname: '/selectClass',
      params: {
        rank,
        productivity: JSON.stringify(selected),
        username,
        fullName,
        email,
        password,
      },
    });
  };

  return (
    <ImageBackground
      source={require('../assets/neon_room.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.question}>What kind of productivity?</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.option, selected.includes(option) && styles.selected]}
              onPress={() => toggleSelect(option)}
            >
              <Text style={{ color: '#fff' }}>{option}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.nextButton, selected.length === 0 && styles.disabled]}
            onPress={handleNext}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  
  background: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  question: {
    fontSize: 28,
    marginBottom: 20,
    color: '#fff',
  },
  option: {
    backgroundColor: 'rgba(138, 159, 165, 0.7)',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  selected: {
    backgroundColor: 'rgba(138, 159, 165, 1)',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: 'rgba(138, 159, 165, 1)',
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
