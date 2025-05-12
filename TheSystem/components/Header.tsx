import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypingText from '@components/TypingText';

type HeaderProps = {
  onMenuPress: () => void;
  navigate: (route: string) => void;
};

export default function Header({ onMenuPress, navigate }: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('/profile')}>
        <Ionicons name="person-circle-outline" size={32} style={styles.white}  />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/')}>
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
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  white: {
    color: '#fff',
  }
});
