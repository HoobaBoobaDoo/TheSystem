import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import TypingText from '@components/TypingText';
import { getCurrentUser, User } from '../utils/auth';

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
  navigate: (route: string) => void;
};

export default function Sidebar({ visible, onClose, navigate }: SidebarProps) {
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const [user, setUser] = useState<User | null>(null);

  const menuItems = [
    { label: 'Home', route: '/' },
    { label: 'Profile', route: '/profile' },
    { label: 'Edit Dashboard', route: '/edit' },
    { label: 'Clan', route: '/clan' },
    { label: 'Settings', route: '/settings' }
  ];

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, [visible]);

  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close-outline" size={28} style={styles.white} />
      </TouchableOpacity>

      <View style={styles.menu}>
        {menuItems.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.menuItem}
            onPress={() => {
              navigate(item.route);
              onClose();
            }}
          >
            <TypingText style={{ padding: 10 }}>{item.label}</TypingText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <View>
          <TypingText style={styles.name}>{user?.fullName || 'Display naam'}</TypingText>
          <TypingText style={styles.username}>@{user?.username || 'username'}</TypingText>
        </View>
        <Ionicons name="person-circle-outline" size={32} style={styles.white} />
      </View>

      <TypingText style={styles.logo}>The System Logo</TypingText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: 'rgba(27, 27, 27, 1)',
    padding: 20,
    zIndex: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  menu: {
    marginTop: 40,
  },
  menuItem: {
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  name: {
    fontWeight: 'bold',
    color: '#fff',
  },
  username: {
    fontStyle: 'italic',
    color: '#fff',
  },
  logo: {
    textAlign: 'center',
    marginTop: 16,
    color: '#fff',
  },
  white: {
    color: '#fff',
  },
});
