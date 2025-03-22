import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RankBadge = ({ rank }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rank: {rank}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RankBadge;