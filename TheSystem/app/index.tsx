import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import GoalCard from '@components/GoalCard';
import { useRouter } from 'expo-router';
import TypingText from '@components/TypingText';
import React, { useEffect, useState } from 'react';
import AddItem from '@components/AddItem';
import TodoList from '@components/Todo-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pedometer } from 'expo-sensors';

import { User } from "../types/User";
import { getCurrentUser } from "../utils/auth";

export default function HomeScreen() {
  const router = useRouter();

  const [todos, setTodos] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [stepCount, setStepCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    const updated = await getCurrentUser();
    if (updated) setUser(updated);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setTimeout(() => setRefreshing(false), 800);
  };

  useEffect(() => {
    const loadUser = async () => {
      const current = await getCurrentUser();
      if (current) {
        setUser(current);
        setTodos(current.todos);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const subscription = Pedometer.watchStepCount(async (result) => {
      setStepCount((prev) => {
        const updated = prev + result.steps;
        updateUserSteps(updated);
        return updated;
      });
    });
    return () => subscription?.remove();
  }, []);

  const updateUserSteps = async (newSteps: number) => {
    const current = await getCurrentUser();
    if (!current) return;
    current.stats.steps = newSteps;
    await AsyncStorage.setItem('currentUser', JSON.stringify(current));
    setUser(current);
  };

  const addTodo = async (text: string) => {
    if (!user) return;

    const updatedTodos = [...user.todos, text];
    const updatedUser: User = {
      ...user,
      todos: updatedTodos,
    };

    await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setTodos(updatedTodos);
    setUser(updatedUser);
  };

  return (
    <ImageBackground
      source={require('../assets/neon_room.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <TypingText style={styles.label}>I will:</TypingText>

          <ScrollView
            style={styles.todoScroll}
            contentContainerStyle={styles.todoContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <TodoList todos={todos} setTodos={setTodos} />
          </ScrollView>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/confirm')}
          >
            <TypingText style={styles.buttonText}>Enter Dungeon</TypingText>
          </TouchableOpacity>
        </View>

        <View style={styles.overlay}>
          <View style={styles.cardGrid}>
            <GoalCard
              statKey="pushups"
              value={user?.stats.pushups ?? 0}
              label="pushups"
              refresh={refresh}
            />
            <GoalCard
              statKey="planking"
              value={user?.stats.planking === 0 ? '✓' : `${user?.stats.planking}s`}
              label="Daily planking"
              refresh={refresh}
            />
            <GoalCard
              value={`${user?.stats.steps ?? 0}`}
              label="steps"
            />
            <GoalCard
              value={`${user?.stats.dungeonTime ?? 0}`}
              label="in dungeon"
            />
          </View>
        </View>
      </View>

      <AddItem onAdd={addTodo} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontWeight: '900',
    color: 'white',
    fontSize: 30,
  },
  todoScroll: {
    maxHeight: 200,
    marginBottom: 10,
  },
  todoContent: {
    paddingRight: 6,
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
    height: 60,
  },
  buttonText: {
    color: 'rgba(0, 0, 0, 0.9)',
    fontSize: 16,
    fontWeight: '600',
  },
});
