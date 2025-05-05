import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type HeaderProps = {
  onMenuPress: () => void;
  navigate: (route: string) => void;
};

export default function Header({ onMenuPress, navigate }: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('/profile')}>
        <Ionicons name="person-circle-outline" size={32} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/')}>
        <Text style={styles.title}>The System</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu-outline" size={28} />
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
});
