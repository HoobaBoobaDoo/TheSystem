
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
};

export default function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 6,
    marginTop: 16,
  },
  label: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
