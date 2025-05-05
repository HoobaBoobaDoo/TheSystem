// app/index.tsx
import { View, Text, StyleSheet,TouchableOpacity, Button, ScrollView } from 'react-native';
import GoalDisplayCard from '@components/GoalDisplayCard';
import PrimaryButton from '@components/PrimaryButton';
import GoalCard from '@components/GoalCard';
import { useRouter } from 'expo-router';


export default function DungeonScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Goal Intentions */}
      <Text style={styles.label}>I will:</Text>
      <GoalDisplayCard text="999 steps" />
      <GoalDisplayCard text="10 pushups" />
      <GoalDisplayCard text="Daily planking" />
      <GoalDisplayCard text="99 minutes in dungeon" />

      {/* Enter Dungeon Button */}
      <TouchableOpacity 
      style={styles.button} 
      onPress={() => router.push('/leave')}
      >
      <Text style={styles.buttonText}>Leave Dungeon</Text>
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
    backgroundColor: '#000',
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
    backgroundColor: '#6E6E6E',    // primary background color
    paddingVertical: 14,        // vertical spacing
    paddingHorizontal: 32,      // horizontal spacing
    borderRadius: 6,            // rounded corners
    alignItems: 'center',       // center text horizontally
    justifyContent: 'center',   // center text vertically
    shadowColor: '#000',        // subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,               // Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',          // semi-bold
  },
});
