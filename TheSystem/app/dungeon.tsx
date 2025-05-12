import { View, Text, StyleSheet,TouchableOpacity, Button, ScrollView, ImageBackground } from 'react-native';
import GoalDisplayCard from '@components/GoalDisplayCard';
import PrimaryButton from '@components/PrimaryButton';
import GoalCard from '@components/GoalCard';
import { useRouter } from 'expo-router';
import TypingText from '@components/TypingText';


export default function DungeonScreen() {
  const router = useRouter();
  return (
    <ImageBackground
            source={require('../assets/portal.jpeg')}
              style={styles.background}
              resizeMode="cover"
            >
    <ScrollView contentContainerStyle={styles.container}>
      {/* Goal Intentions */}
            <View style={styles.overlay}>
      <TypingText style={styles.label}>I will:</TypingText>
      <GoalDisplayCard text="999 steps" />
      <GoalDisplayCard text="10 pushups" />
      <GoalDisplayCard text="Daily planking" />
      <GoalDisplayCard text="99 minutes in dungeon" />

      {/* Enter Dungeon Button */}
      <TouchableOpacity 
      style={styles.button} 
      onPress={() => router.push('/leave')}
      >
      <TypingText style={styles.buttonText}>Leave Dungeon</TypingText>
    </TouchableOpacity>

      </View>

      {/* Progress / Stats Cards */}
            <View style={styles.overlay}>
      <View style={styles.cardGrid}>
        <GoalCard top="999" bottom="steps" />
        <GoalCard top="10" bottom="pushups" light />
        <GoalCard top="✓" bottom="planking" />
        <GoalCard top="99 min" bottom="dungeon" />
      </View>
      </ View>
    </ScrollView>
    </ ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
  },
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
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 35,
    color: '#fff',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    height: '45%',
  },
  button: {
    backgroundColor: 'rgba(138, 159, 165, 0.8)',
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
    color: 'rgba(0, 0, 0, 0.9)',
    fontSize: 16,
    fontWeight: '600',
  },
});
