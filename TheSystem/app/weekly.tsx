// WeeklyScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentUser } from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/User';
import AddWeekly from '@components/AddWeekly';

type WeeklyTask = {
  label: string;
  done?: boolean;
};

type WeeklyCategory = {
  name: string;
  tasks: WeeklyTask[];
};

export default function WeeklyScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [weeklies, setWeeklies] = useState<WeeklyCategory[]>([]);
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [undoItem, setUndoItem] = useState<null | { type: 'task' | 'category'; data: any }> (null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getCurrentUser();
    if (data) {
      const safeWeeklies = data.weeklies ?? [];
      setUser(data);
      setWeeklies(safeWeeklies);
    }
  };

  const save = async (newWeeklies: WeeklyCategory[]) => {
    if (!user) return;
    const updatedUser: User = { ...user, weeklies: newWeeklies };
    await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setWeeklies(newWeeklies);
  };

  const markDone = (categoryName: string, index: number) => {
    const updated = weeklies.map((cat) =>
      cat.name === categoryName
        ? {
            ...cat,
            tasks: cat.tasks.map((t, i) =>
              i === index ? { ...t, done: true } : t
            ),
          }
        : cat
    );
    save(updated);
  };

  const removeTask = (categoryName: string, index: number) => {
    const removed = weeklies.find(w => w.name === categoryName)?.tasks[index];
    const updated = weeklies.map((cat) =>
      cat.name === categoryName
        ? {
            ...cat,
            tasks: cat.tasks.filter((_, i) => i !== index),
          }
        : cat
    );
    save(updated);
    setUndoItem({ type: 'task', data: { categoryName, index, task: removed } });
    setTimeout(() => setUndoItem(null), 5000);
  };

  const undoTask = () => {
    if (!undoItem || undoItem.type !== 'task') return;
    const { categoryName, index, task } = undoItem.data;
    const updated = weeklies.map(cat =>
      cat.name === categoryName
        ? {
            ...cat,
            tasks: [
              ...cat.tasks.slice(0, index),
              task,
              ...cat.tasks.slice(index),
            ],
          }
        : cat
    );
    save(updated);
    setUndoItem(null);
  };

  const removeCategory = (name: string) => {
    const removed = weeklies.find(c => c.name === name);
    const updated = weeklies.filter(c => c.name !== name);
    save(updated);
    setUndoItem({ type: 'category', data: removed });
    setTimeout(() => setUndoItem(null), 5000);
  };

  const undoCategory = () => {
    if (!undoItem || undoItem.type !== 'category') return;
    const updated = [...weeklies, undoItem.data];
    save(updated);
    setUndoItem(null);
  };

  const addTask = () => {
    if (!newTask.trim() || !selectedCategory) return;
    const updated = weeklies.map(category => {
      if (category.name !== selectedCategory) return category;
      return {
        ...category,
        tasks: [...category.tasks, { label: newTask.trim(), done: false }],
      };
    });
    save(updated);
    setNewTask('');
  };

  const renderCategory = (category: WeeklyCategory) => {
    const completed = category.tasks.filter(t => t.done).length;
    const total = category.tasks.length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
      <View key={category.name} style={styles.category}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{category.name} {percent}%</Text>
          <TouchableOpacity onPress={() => removeCategory(category.name)}>
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${percent}%` }]} />
        </View>

        {[...category.tasks.filter(t => !t.done), ...category.tasks.filter(t => t.done)].map((task, i) => (
          <View key={i} style={styles.subTask}>
            <Text style={[styles.subLabel, task.done && styles.strikethrough]}>
              {task.label}
            </Text>
            <View style={styles.actionButtons}>
              {!task.done && (
                <TouchableOpacity onPress={() => markDone(category.name, i)}>
                  <Ionicons name="checkmark" size={20} color="white" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => removeTask(category.name, i)}>
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TextInput
          value={newTask}
          onChangeText={setNewTask}
          placeholder="New task"
          style={styles.input}
          onFocus={() => setSelectedCategory(category.name)}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addText}>Add new</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleAddCategory = (name: string) => {
    const updated = [...weeklies, { name, tasks: [] }];
    setWeeklies(updated);
    save(updated);
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ScrollView style={styles.wrapper}>
        {weeklies.map(renderCategory)}
        {weeklies.length === 0 && <Text style={styles.white}>No tasks yet</Text>}
      </ScrollView>

      <AddWeekly onAdd={handleAddCategory} />

      {undoItem && (
        <TouchableOpacity onPress={undoItem.type === 'task' ? undoTask : undoCategory} style={styles.undoBar}>
          <Text style={styles.undoText}>Undo {undoItem.type === 'task' ? 'task' : 'category'} delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    backgroundColor: '#111',
    flex: 1,
  },
  category: {
    marginBottom: 24,
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#aaa',
  },
  subTask: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  subLabel: {
    color: 'white',
    flex: 1,
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#444',
    marginTop: 8,
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  addText: {
    color: 'white',
  },
  white: {
    color: 'white',
    textAlign: 'center',
    marginTop: 40,
  },
  undoBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
  },
  undoText: {
    color: 'white',
    fontSize: 14,
  },
});
