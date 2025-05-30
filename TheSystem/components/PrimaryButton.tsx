
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import TypingText from '@components/TypingText';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
};

export default function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <TypingText style={styles.label}>{label}</TypingText>
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
