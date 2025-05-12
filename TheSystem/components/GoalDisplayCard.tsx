import { View, Text, StyleSheet } from 'react-native';
import TypingText from '@components/TypingText';

type GoalDisplayCardProps = {
  text: string;
};

export default function GoalDisplayCard({ text }: GoalDisplayCardProps) {
  return (
    <View style={styles.card}>
      <TypingText style={styles.text}>{text}</TypingText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(168, 168, 168, 0.8)',
    borderRadius: 6,
    padding: 12,
    marginVertical: 6,
  },
  text: {
    fontSize: 16,
  },
});
