import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import Header from '@components/Header';
import GoalCard from '@components/GoalCard';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.profileSection}>
        <Image
          source={require('../assets/icon.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Ruben Jamart</Text>
        <Text style={styles.bio}>
          I love being productive!{'\n'}That’s why I’m making this app!
        </Text>

        <View style={styles.groupInfo}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.groupIcon}
          />
          <Text style={styles.groupName}>The productive monkeys</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statText}>S-rank</Text>
          <Text style={styles.statText}>⚡ Warrior</Text>
          <Text style={styles.statText}>Level: 35</Text>
        </View>
      </View>

      <View style={styles.cardGrid}>
        <GoalCard top="999" bottom="steps" />
        <GoalCard top="10" bottom="pushups" light />
        <GoalCard top="✓" bottom="Daily planking" />
        <GoalCard top="99 min" bottom="in dungeon" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bio: {
    textAlign: 'center',
    marginVertical: 10,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  groupIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  groupName: {
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 12,
  },
  statText: {
    fontSize: 14,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
  },
});
