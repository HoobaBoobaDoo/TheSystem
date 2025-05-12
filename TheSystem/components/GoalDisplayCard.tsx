import { View, Text, StyleSheet } from 'react-native';
import TypingText from '@components/TypingText';

type GoalDisplayCardProps = {
  text: string;
};

export default function GoalDisplayCard({ text }: { text: string }) {
  return (
    <View style={{ backgroundColor: '#ccc', padding: 16, marginBottom: 10, borderRadius: 6 }}>
      <TypingText style={{ fontWeight: 'bold' }}>{text}</TypingText>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(176, 190, 194, 0.8)',
    borderRadius: 6,
    padding: 12,
    marginVertical: 6,
  },
  text: {
    fontSize: 16,
  },
});
