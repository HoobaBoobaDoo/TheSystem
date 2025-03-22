import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, FlatList, TouchableOpacity } from 'react-native';

const DungeonModal = ({ visible, onClose, tasks }) => {
  const [taskList, setTaskList] = useState(tasks);

  const completeTask = (id) => {
    setTaskList(taskList.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Dungeon Clearing</Text>
        <FlatList
          data={taskList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => completeTask(item.id)}>
              <Text style={[styles.task, item.completed && styles.completedTask]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        <Button title="Close Dungeon" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  task: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default DungeonModal;