import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl, ImageBackground } from 'react-native';
import GoalCard from '@components/GoalCard';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TypingText from '@components/TypingText';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig';
import { User } from '../utils/types';


export default function ProfileScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const docRef = doc(db, 'users', currentUser.uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      setUser(snap.data() as User);
    }
  }
};

const onRefresh = async () => {
  setRefreshing(true);
  await fetchUser();
  setRefreshing(false);
};

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      await fetchUser();
    } else {
      setUser(null);
    }
  });

  return unsubscribe;
}, []);


  return (
    <ImageBackground
      source={require('../assets/neon_stars.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.overlay}>
          <View style={styles.profileSection}>
            <Ionicons name="person-circle-outline" size={150} style={styles.white} />

            <TypingText style={[styles.name, styles.white]}>
              {user?.fullName || 'Unknown Hunter'}
            </TypingText>

            <TypingText style={[styles.bio, styles.white]}>
              I love being productive! That’s why I’m making this app!
            </TypingText>

            <View style={styles.groupInfo}>
              <Ionicons name="person-circle-outline" size={30} style={styles.white} />
              <TouchableOpacity onPress={() => router.push('/clan')}>
                <TypingText style={[styles.groupName, styles.white]}>
                  The productive monkeys
                </TypingText>
              </TouchableOpacity>
            </View>

            <View style={styles.statsRow}>
              <TypingText style={[styles.statText, styles.white]}>
                {user?.rank || 'Rank unknown'}
              </TypingText>
              <TypingText style={[styles.statText, styles.white]}>
                ⚡ {user?.class || 'No class'}
              </TypingText>
              <TypingText style={[styles.statText, styles.white]}>
                Level: 35
              </TypingText>
            </View>
          </View>
        </View>

        <View style={styles.overlay}>
          <View style={styles.cardGrid}>
            <GoalCard top="999" bottom="steps" />
            <GoalCard top="10" bottom="pushups" light />
            <GoalCard top="✓" bottom="Daily planking" />
            <GoalCard top="99 min" bottom="in dungeon" />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

ProfileScreen.screenOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0,
    marginTop: 0,
  },
  overlay: {
    marginTop: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
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
  groupName: {
    fontSize: 14,
    marginLeft: 10,
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
    height: '45%',
  },
  white: {
    color: '#fff',
  },
});
