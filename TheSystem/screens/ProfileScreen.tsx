import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RankBadge from '../components/RankBadge';
import { AppContext } from '../context/AppContext';

const ProfileScreen: React.FC = () => {
  const { rank, exp } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profiel</Text>
      <RankBadge rank={rank} />
      <Text style={styles.text}>EXP: {exp}</Text>
    </View>
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
  text: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default ProfileScreen;