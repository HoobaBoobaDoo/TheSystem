import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Animated, Pressable, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Props = {
  onAdd: (text: string) => void;
};

export default function AddItem({ onAdd }: Props) {
  const [showInput, setShowInput] = useState(false);
  const [newItem, setNewItem] = useState('');
  const inputRef = useRef<TextInput>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  let holdTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (showInput) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showInput]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
    holdTimeout = setTimeout(() => {
      router.push('/edit');
    }, 300);
  };

  const handlePressOut = () => {
    clearTimeout(holdTimeout);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (!showInput) setShowInput(true);
    else if (newItem.trim()) {
      onAdd(newItem.trim());
      setNewItem('');
      setShowInput(false);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.wrapper}>
      {showInput && (
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="New item"
          value={newItem}
          onChangeText={setNewItem}
          onSubmitEditing={handlePress}
          returnKeyType="done"
        />
      )}
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={styles.pressWrapper}
      >
        <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
          <Ionicons name="add" size={48} color="#555" />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    alignItems: 'flex-end',
  },
  pressWrapper: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  button: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    backgroundColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    width: 250,
    marginBottom: 10,
  },
});
