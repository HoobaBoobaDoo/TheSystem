
import { View, Text, StyleSheet } from 'react-native';
import TypingText from '@components/TypingText';

type GoalCardProps = {
  top: string;
  bottom: string;
  light?: boolean;
};

export default function GoalCard({ top, bottom, light = false }: GoalCardProps) {
  return (
    <View style={styles.card}>
      <TypingText style={styles.textTop}>{top}</TypingText>
      <TypingText style={styles.textBottom}>{bottom}</TypingText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    height: '100%',
    backgroundColor: '#555',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textTop: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  textBottom: {
    fontSize: 14,
    color: '#eee',
    marginTop: 4,
  },
});
