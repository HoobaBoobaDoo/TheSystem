import { View, Text, StyleSheet } from 'react-native';

type GoalDisplayCardProps = {
  text: string;
};

export default function GoalDisplayCard({ text }: GoalDisplayCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginVertical: 6,
  },
  text: {
    fontSize: 16,
  },
});
