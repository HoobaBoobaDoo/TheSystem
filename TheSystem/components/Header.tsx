
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type HeaderProps = {
  onMenuPress: () => void;
};

export default function Header({ onMenuPress }: HeaderProps) {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/profile')}>
        <Ionicons name="person-circle-outline" size={32} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/')}>
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
