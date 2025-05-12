import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, ImageBackground } from 'react-native';
import GoalDisplayCard from '@components/GoalDisplayCard';
import GoalCard from '@components/GoalCard';
import { useRouter } from 'expo-router';
import TypingText from '@components/TypingText';
import React, { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
      <ImageBackground
        source={require('../assets/neon_room.jpeg')}
          style={styles.background}
          resizeMode="cover"
        >
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.overlay}>
      <TypingText style={styles.label}>I will:</TypingText>
      <GoalDisplayCard text="999 steps" />
      <GoalDisplayCard text="10 pushups" />
      <GoalDisplayCard text="Daily planking" />
      <GoalDisplayCard text="99 minutes in dungeon" />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/confirm')}
      >
        <TypingText style={styles.buttonText}>Enter Dungeon</TypingText>
      </TouchableOpacity>
      </View>

      <View style={styles.overlay}>
      <View style={styles.cardGrid}>
        <GoalCard top="999" bottom="steps" />
        <GoalCard top="10" bottom="pushups" />
        <GoalCard top="✓" bottom="planking" />
        <GoalCard top="99 min" bottom="dungeon" />
      </View>
      </View>
    </ScrollView>
</ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0,
    marginTop: 0,
  },
  overlay: {
    marginTop: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 10,
  },
  container: {
    padding: 16,
    height: '100%',
    paddingTop: 0,
    marginTop: 0,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    height: '45%',
  },
  button: {
    backgroundColor: 'rgba(38, 33, 63, 0.9)',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
    height: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
