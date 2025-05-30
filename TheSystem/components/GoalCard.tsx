import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import TypingText from '@components/TypingText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '../utils/auth';
import { User } from '../types/User';


type GoalCardProps = {
  value: number | string;
  label: string;
  statKey?: 'pushups' | 'planking';
  refresh?: () => void;
};




export default function InteractiveGoalCard({ statKey, value, label, refresh }: GoalCardProps) {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleShortPress = async () => {
if (!statKey || !refresh) return;
  const user = await getCurrentUser();
  if (!user) return;

  if (statKey === 'pushups') user.stats.pushups += 1;

  await AsyncStorage.setItem('currentUser', JSON.stringify(user));
  refresh();
};

const handleLongPress = async () => {
if (!statKey || !refresh) return;
  const user = await getCurrentUser();
  if (!user) return;

  if (statKey === 'pushups') user.stats.pushups += 5;
  if (statKey === 'planking') {
    user.stats.planking = user.stats.planking === 0 ? 60 : 0;
  }

  await AsyncStorage.setItem('currentUser', JSON.stringify(user));
  refresh();
};


  return (
    <Pressable
  onPress={handleShortPress}
  onLongPress={handleLongPress}
  disabled={!statKey}
  style={styles.card}
>
  <TypingText style={styles.textTop}>{value}</TypingText>
  <TypingText style={styles.textBottom}>{label}</TypingText>
</Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    height: '100%',
    backgroundColor: 'rgba(114, 127, 131, 0.95)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textTop: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  textBottom: {
    fontSize: 14,
    color: '#eee',
    marginTop: 4,
  },
});
