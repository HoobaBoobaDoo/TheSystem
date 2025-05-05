import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import GoalCard from '@components/GoalCard';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TypingText from '@components/TypingText';

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.profileSection}>
        
      <Ionicons name="person-circle-outline" size={150} />
        <TypingText style={styles.name}>Ruben Jamart</TypingText>
        <TypingText style={styles.bio}>
          I love being productive! That’s why I’m making this app!
        </TypingText>

        <View style={styles.groupInfo}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.groupIcon}
          />
          <TouchableOpacity onPress={() => router.push('/clan')}>
            <TypingText style={styles.groupName}>The productive monkeys</TypingText>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <TypingText style={styles.statText}>S-rank</TypingText>
          <TypingText style={styles.statText}>⚡ Warrior</TypingText>
          <TypingText style={styles.statText}>Level: 35</TypingText>
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
    height: '100%',
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
