import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import LeaderboardItem from '../components/LeaderboardItem';

const LeaderboardScreen: React.FC = () => {
  const leaderboardData = [
    { id: '1', username: 'User1', exp: 1200, profilePic: 'https://via.placeholder.com/150' },
    { id: '2', username: 'User2', exp: 1100, profilePic: 'https://via.placeholder.com/150' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={leaderboardData.sort((a, b) => b.exp - a.exp)}
        renderItem={({ item }) => <LeaderboardItem user={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default LeaderboardScreen;