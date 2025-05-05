
import { View, Text, StyleSheet } from 'react-native';

type GoalCardProps = {
  top: string;
  bottom: string;
  light?: boolean;
};

export default function GoalCard({ top, bottom, light = false }: GoalCardProps) {
  return (
    <View style={[styles.card, light && styles.light]}>
      <Text style={styles.textTop}>{top}</Text>
      <Text style={styles.textBottom}>{bottom}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    height: '40%',
    backgroundColor: '#555',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  light: {
    backgroundColor: '#ddd',
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
