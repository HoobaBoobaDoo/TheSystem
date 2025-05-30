import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const classes = ['Knight', 'Mage', 'Rogue', 'Archer', 'Healer', 'Assassin'];

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
            {classes.map((cls) => (
              <TouchableOpacity
                key={cls}
                style={[styles.classBox, selected === cls && styles.selected]}
                onPress={() => setSelected(cls)}
              >
                <Image
                  source={require('../assets/icon.png')}
                  style={styles.icon}
                />
                <Text style={styles.classText}>{cls}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.nextButton, !selected && styles.disabled]}
            onPress={handleFinish}
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
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
    tintColor: 'white',
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
