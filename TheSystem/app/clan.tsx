import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypingText from '@components/TypingText';

export default function GuildScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ImageBackground
      source={require('../assets/neon_squares.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
      <View style={styles.overlay}>
        <Ionicons name="person-circle" size={80} color="#fff" />

        <TypingText style={styles.guildTitle}>The productive monkeys</TypingText>

        <TypingText style={styles.subtitle}>
          Our goal is to be the most productive monkeys on the planet!
        </TypingText>
        </View>

      <View style={styles.overlay}>
        {Array.from({ length: 20 }).map((_, index) => (
          <TouchableOpacity key={index} style={styles.member} >
            <TypingText style={{ color: '#fff', textAlign: 'center' }}>
              Member
            </TypingText>
          </TouchableOpacity>
        ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    marginTop: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  guildTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
  },
  member: {
    width: '90%',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 6,
    marginTop: 12,
    alignSelf: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
});
