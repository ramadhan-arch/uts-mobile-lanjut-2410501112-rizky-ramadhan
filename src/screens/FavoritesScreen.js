import {
  View, Text, FlatList,
  TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';
import colors from '../constants/colors';

export default function FavoritesScreen({ navigation }) {
  const { state, dispatch } = useContext(BookContext);

  const handleRemove = (bookKey) => {
    Alert.alert(
      'Hapus Favorit',
      'Yakin mau hapus buku ini dari favorit?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => dispatch({ type: 'REMOVE_FAVORITE', payload: bookKey }),
        },
      ]
    );
  };

  if (state.favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyIcon}>📚</Text>
        <Text style={styles.emptyText}>Belum ada buku favorit!</Text>
        <Text style={styles.emptySubtext}>
          Tambahkan buku dari halaman Detail
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.favorites}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            <BookCard
              book={item}
              onPress={() => navigation.navigate('HomeTab', {
                screen: 'Detail',
                params: { book: item }
              })}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemove(item.key)}
            >
              <Text style={styles.removeText}>🗑️ Hapus dari Favorit</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.subtext,
  },
  removeButton: {
    marginHorizontal: 16,
    marginTop: -4,
    marginBottom: 8,
    backgroundColor: colors.error,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  removeText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});