import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypingText from '@components/TypingText';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../utils/auth';
import { User } from '../types/User';

type HeaderProps = {
  onMenuPress: () => void;
  navigate: (route: string) => void;
};

export default function Header({ onMenuPress, navigate }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('/profile')}>
        {user?.profilePicture ? (
          <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
        ) : (
          <Ionicons name="person-circle-outline" size={32} style={styles.white} />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('/')} style={styles.titleWrapper}>
        <Image
          source={require('../assets/TheSystem-Icon.png')} // pas pad aan indien nodig
          style={styles.logo}
          resizeMode="contain"
        />
        <TypingText style={[styles.title, styles.white]}>The System</TypingText>
      </TouchableOpacity>

      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu-outline" size={28} style={styles.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 1)',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  white: {
    color: '#fff',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
