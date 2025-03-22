import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HomeScreenProps {
  route: {
    params: {
      username: string;
    };
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ route }) => {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welkom, {username}!</Text>
      <Text style={styles.subText}>Je bent succesvol ingelogd.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen;