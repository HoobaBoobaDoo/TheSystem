import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import TypingText from '@components/TypingText';
import GoalCard from '@components/GoalCard';
import AddItem from '@components/AddItem';
import TodoList from '@components/Todo-list';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../utils/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function HomeScreen() {
  const router = useRouter();
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return;

      const ref = doc(db, 'users', firebaseUser.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setTodos(data.todos || []);
      }
    });

    return unsubscribe;
  }, []);

  const addTodo = async (text: string) => {
    const updated = [...todos, text];
    setTodos(updated);

    const user = auth.currentUser;
    if (!user) return;

    await updateDoc(doc(db, 'users', user.uid), {
      todos: updated,
    });
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

          <ScrollView style={styles.todoScroll} contentContainerStyle={styles.todoContent}>
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
            <GoalCard top="999" bottom="steps" />
            <GoalCard top="10" bottom="pushups" />
            <GoalCard top="✓" bottom="planking" />
            <GoalCard top="99 min" bottom="dungeon" />
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
