import { View, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, RefreshControl } from 'react-native';
import GoalCard from '@components/GoalCard';
import { useRouter } from 'expo-router';
import TypingText from '@components/TypingText';
import React, { useEffect, useState, useRef } from 'react';
import TodoList from '@components/Todo-list';
import AddItem from '@components/AddItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from "../types/User";
import { getCurrentUser } from "../utils/auth";

export default function DungeonScreen() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const current = await getCurrentUser();
      if (current) {
        // Zorg dat dungeonTime minimaal 0 is
        if (typeof current.stats.dungeonTime !== 'number') {
          current.stats.dungeonTime = 0;
        }
        setUser(current);
        setTodos(current.todos);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Start timer om elke 60 seconden dungeonTime met 1 minuut te verhogen
    timerRef.current = setInterval(async () => {
      const current = await getCurrentUser();
      if (!current) return;

      const currentDungeonTime = typeof current.stats.dungeonTime === 'number' ? current.stats.dungeonTime : 0;
      const newDungeonTime = Math.floor(currentDungeonTime) + 1; // Tel 1 minuut erbij

      current.stats.dungeonTime = newDungeonTime;
      await AsyncStorage.setItem('currentUser', JSON.stringify(current));
      setUser(current);
    }, 60000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [user]);

  const refresh = async () => {
    setRefreshing(true);
    const updated = await getCurrentUser();
    if (updated) setUser(updated);
    setRefreshing(false);
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
      source={require('../assets/portal.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        {/* Goal Intentions */}
        <View style={styles.overlay}>
          <TypingText style={styles.label}>I will:</TypingText>

          {/* Todo List */}
          <ScrollView style={styles.todoScroll} contentContainerStyle={styles.todoContent}>
            <TodoList todos={todos} setTodos={setTodos} />
          </ScrollView>

          {/* Leave Dungeon Button */}
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
              value={`${Math.floor(user?.stats.dungeonTime ?? 0)} min`}
              label="in dungeon"
            />
          </View>
        </View>
      </ScrollView>
      <AddItem onAdd={addTodo} />
    </ImageBackground>
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
    marginTop: 10,
    height: 60,
  },
  buttonText: {
    color: 'rgba(0, 0, 0, 0.9)',
    fontSize: 16,
    fontWeight: '600',
  },
});
