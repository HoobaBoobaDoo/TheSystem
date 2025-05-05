import { View, Text, StyleSheet,TouchableOpacity, Button, ScrollView } from 'react-native';
import GoalDisplayCard from '@components/GoalDisplayCard';
import PrimaryButton from '@components/PrimaryButton';
import GoalCard from '@components/GoalCard';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TypingText from '@components/TypingText';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Goal Intentions */}
      <TypingText style={styles.label}>I will:</TypingText>
      <GoalDisplayCard text="999 steps" />
      <GoalDisplayCard text="10 pushups" />
      <GoalDisplayCard text="Daily planking" />
      <GoalDisplayCard text="99 minutes in dungeon" />

      {/* Enter Dungeon Button */}
      <TouchableOpacity 
      style={styles.button} 
      onPress={() => router.push('/confirm')}
      >
      <TypingText style={styles.buttonText}>Enter Dungeon</TypingText>
    </TouchableOpacity>


      {/* Progress / Stats Cards */}
      <View style={styles.cardGrid}>
        <GoalCard top="999" bottom="steps" />
        <GoalCard top="10" bottom="pushups" light />
        <GoalCard top="✓" bottom="planking" />
        <GoalCard top="99 min" bottom="dungeon" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardGrid: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    backgroundColor: '#6E6E6E',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
