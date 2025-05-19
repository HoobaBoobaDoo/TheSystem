import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { auth, db } from '../utils/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const classes = ['Knight', 'Mage', 'Rogue', 'Archer', 'Healer', 'Assassin'];

export default function SelectClassScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const { rank, productivity } = useLocalSearchParams();

  const finishProfile = () => {
    if (!selected) return;

    onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        Alert.alert('Error', 'User not logged in.');
        return;
      }

      try {
        await updateDoc(doc(db, 'users', firebaseUser.uid), {
          rank: rank as string,
          productivity: JSON.parse(productivity as string),
          class: selected,
        });

        router.push('/profileCreated');
      } catch (error: any) {
        Alert.alert('Error updating profile', error.message);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select your class:</Text>
      <View style={styles.grid}>
        {classes.map((cls, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.classBox, selected === cls && styles.selected]}
            onPress={() => setSelected(cls)}
          >
            <Image source={require('../assets/icon.png')} style={styles.icon} />
            <Text style={styles.classText}>{cls}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.nextButton, !selected && styles.disabled]}
        onPress={finishProfile}
      >
        <Text style={styles.nextText}>Finish hunter profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  classBox: {
    width: '47%',
    backgroundColor: '#555',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  selected: {
    backgroundColor: '#777',
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
    backgroundColor: '#888',
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
