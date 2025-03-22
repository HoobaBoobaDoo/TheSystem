import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
}

interface GoalItemProps {
  goal: Goal;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{goal.title}</Text>
      <Text style={styles.text}>{goal.progress} / {goal.target}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});

export default GoalItem;