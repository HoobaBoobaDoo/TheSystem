import React, { useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TodoList({ todos, setTodos }: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [lastDeleted, setLastDeleted] = useState<{
    item: string;
    index: number;
  } | null>(null);

  const inputRef = useRef<TextInput>(null);

const handleDelete = async (index: number) => {
  const removed = todos[index];
  const updated = [...todos];
  updated.splice(index, 1);
  setTodos(updated);
  setLastDeleted({ item: removed, index });
  await AsyncStorage.setItem('todos', JSON.stringify(updated));
};

const handleUndo = async () => {
  if (!lastDeleted) return;
  const updated = [...todos];
  updated.splice(lastDeleted.index, 0, lastDeleted.item);
  setTodos(updated);
  setLastDeleted(null);
  await AsyncStorage.setItem('todos', JSON.stringify(updated));
};


  const handleLongPress = (index: number) => {
    setEditingIndex(index);
    setEditingText(todos[index]);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const updated = [...todos];
    updated[editingIndex] = editingText.trim();
    setTodos(updated);
    setEditingIndex(null);
    Keyboard.dismiss();
  };

  const renderLeftActions = (index: number) => (
    <Pressable
      onPress={() => handleDelete(index)}
      style={styles.deleteButton}
    >
      <Ionicons name="trash" size={28} color="white" />
    </Pressable>
  );

  const renderRightActions = (index: number) => (
    <Pressable
      onPress={async () => {
  const removed = todos[index];
  const updated = [...todos];
  updated.splice(index, 1);
  setTodos(updated);
  setLastDeleted({ item: removed, index });
  await AsyncStorage.setItem('todos', JSON.stringify(updated));
}}
      style={styles.completeButton}
    >
      <Ionicons name="checkmark-done" size={28} color="white" />
    </Pressable>
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.list}>
        {todos.map((item, index) => (
          <Swipeable
            key={index}
            renderLeftActions={() => renderLeftActions(index)}
            renderRightActions={() => renderRightActions(index)}
            overshootLeft={false}
            overshootRight={false}
          >
            <Pressable
              onLongPress={() => handleLongPress(index)}
              style={styles.item}
            >
              {editingIndex === index ? (
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  value={editingText}
                  onChangeText={setEditingText}
                  onSubmitEditing={saveEdit}
                  onBlur={saveEdit}
                  returnKeyType="done"
                />
              ) : (
                <Text style={styles.text}>{item}</Text>
              )}
            </Pressable>
          </Swipeable>
        ))}
      </ScrollView>

      {lastDeleted && (
        <Pressable onPress={handleUndo} style={styles.undo}>
          <Text style={styles.undoText}>Undo</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 6,
    flex: 1,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    fontSize: 18,
    color: 'white',
    padding: 0,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    borderRadius: 6,
    marginVertical: 5,
    marginRight: 6,
  },
  completeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    borderRadius: 6,
    marginVertical: 5,
    marginLeft: 6,
  },
  undo: {
    backgroundColor: '#444',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  undoText: {
    color: 'white',
    fontSize: 14,
  },
});
