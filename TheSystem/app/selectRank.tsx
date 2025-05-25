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

  const handleNext = () => {
    if (!selected) {
      Alert.alert('Select a rank', 'Please choose a rank to continue.');
      return;
    }

    router.push({
      pathname: '/selectProductivity',
      params: {
        ...params,
        rank: selected,
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
          <Text style={styles.question}>How serious are you about productivity?</Text>

          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[styles.option, selected === option.value && styles.selected]}
              onPress={() => setSelected(option.value)}
            >
              <Text style={{ color: '#fff' }}>{option.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.nextButton, !selected && styles.disabled]}
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
    backgroundColor: 'rgba(138, 159, 165, 0.9)',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  nextText: {
    fontSize: 18,
    color: '#fff',
  },
});
