import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/profile.jpg')}
          style={styles.photo}
        />
        <Text style={styles.name}>Rizky Ramadhan</Text>
        <Text style={styles.nim}>2410501112</Text>
        <Text style={styles.kelas}>Kelas A</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📱 Tema</Text>
        <Text style={styles.cardValue}>Tema C — BookShelf</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔗 API</Text>
        <Text style={styles.cardValue}>Open Library API</Text>
        <Text style={styles.cardSub}>openlibrary.org</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛠️ Tech Stack</Text>
        <Text style={styles.cardValue}>React Native + Expo</Text>
        <Text style={styles.cardValue}>React Navigation</Text>
        <Text style={styles.cardValue}>Context API + useReducer</Text>
      </View>

      <Text style={styles.credit}>
        Data buku disediakan oleh Open Library (openlibrary.org)
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: colors.primary,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: colors.white,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  nim: {
    fontSize: 15,
    color: colors.white,
    opacity: 0.9,
    marginTop: 4,
  },
  kelas: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.card,
    margin: 16,
    marginBottom: 0,
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 13,
    color: colors.subtext,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  cardValue: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 2,
  },
  cardSub: {
    fontSize: 13,
    color: colors.subtext,
  },
  credit: {
    textAlign: 'center',
    color: colors.subtext,
    fontSize: 12,
    padding: 20,
  },
});