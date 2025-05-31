import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const classes = [
  { name: 'Knight', icon: 'shield-checkmark' as const },
  { name: 'Mage', icon: 'flame' as const },
  { name: 'Rogue', icon: 'eye-off' as const },
  { name: 'Archer', icon: 'grid' as const },
  { name: 'Healer', icon: 'medkit' as const },
  { name: 'Assassin', icon: 'skull' as const },
];


export default function SelectClassScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const params = useLocalSearchParams();

  const username = params.username as string;
  const fullName = params.fullName as string;
  const email = params.email as string;
  const password = params.password as string;
  const rank = params.rank as string;
  const productivity = params.productivity as string;

  const handleFinish = () => {
    if (!selected) {
      Alert.alert('Select a class', 'Please choose a class to continue.');
      return;
    }

    router.push({
      pathname: '/profileCreated',
      params: {
        username,
        fullName,
        email,
        password,
        rank,
        productivity,
        class: selected,
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
          <Text style={styles.title}>Select your class:</Text>
          <View style={styles.grid}>
            {classes.map(({ name, icon }) => (
              <TouchableOpacity
                key={name}
                style={[styles.classBox, selected === name && styles.selected]}
                onPress={() => setSelected(name)}
              >
                <Ionicons name={icon} size={40} color="white" style={{ marginBottom: 8 }} />
                <Text style={styles.classText}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.nextButton, !selected && styles.disabled]}
            onPress={handleFinish}
            disabled={!selected}
          >
            <Text style={styles.nextText}>Finish hunter profile</Text>
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
  title: {
    fontSize: 28,
    marginBottom: 16,
    color: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  classBox: {
    width: '47%',
    backgroundColor: 'rgba(138, 159, 165, 0.6)',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  selected: {
    backgroundColor: 'rgba(138, 159, 165, 1)',
  },
  classText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  nextButton: {
    backgroundColor: 'rgba(138, 159, 165, 0.9)',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  disabled: {
    opacity: 0.5,
  },
  nextText: {
    color: '#fff',
  },
});
