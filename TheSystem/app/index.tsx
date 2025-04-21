// app/index.tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GoalDisplayCard from '@components/GoalDisplayCard';
import PrimaryButton from '@components/PrimaryButton';
import GoalCard from '@components/GoalCard';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Goal Intentions */}
      <Text style={styles.label}>I will:</Text>
      <GoalDisplayCard text="999 steps" />
      <GoalDisplayCard text="10 pushups" />
      <GoalDisplayCard text="Daily planking" />
      <GoalDisplayCard text="99 minutes in dungeon" />

      {/* Enter Dungeon CTA */}
      <PrimaryButton label="Enter dungeon" onPress={() => {}} />

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
});
