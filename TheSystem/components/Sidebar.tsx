// components/Sidebar.tsx
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
};

export default function Sidebar({ visible, onClose }: SidebarProps) {
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close-outline" size={28} />
      </TouchableOpacity>

      <View style={styles.menu}>
        {Array(5).fill(0).map((_, i) => (
          <View key={i} style={styles.menuItem} />
        ))}
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.name}>Display naam</Text>
          <Text style={styles.username}>@username</Text>
        </View>
        <Ionicons name="person-circle-outline" size={32} />
      </View>

      <Text style={styles.logo}>The System Logo</Text>
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
    backgroundColor: '#fff',
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
  },
  username: {
    fontStyle: 'italic',
    color: '#666',
  },
  logo: {
    textAlign: 'center',
    marginTop: 16,
    color: '#aaa',
  },
});
