import { useState, useEffect } from 'react';
import {
  View, Text, FlatList, ActivityIndicator,
  StyleSheet, RefreshControl, TouchableOpacity
} from 'react-native';
import BookCard from '../components/BookCard';
import colors from '../constants/colors';

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        'https://openlibrary.org/subjects/fiction.json?limit=20'
      );
      if (!res.ok) throw new Error('Gagal mengambil data');
      const data = await res.json();
      setBooks(data.works);
    } catch (e) {
      setError('Gagal memuat data. Periksa koneksi internet kamu!');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Memuat buku...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>📡</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchBooks}>
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 BookShelf</Text>
        <Text style={styles.headerSub}>Temukan buku favoritmu</Text>
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => navigation.navigate('Detail', { book: item })}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Tidak ada buku ditemukan</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
header: {
  backgroundColor: colors.primary,
  padding: 14,
  paddingTop: 10,
},
headerTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: colors.white,
},
headerSub: {
  fontSize: 11,
  color: colors.white,
  opacity: 0.8,
  marginTop: 2,
},
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 10,
    color: colors.subtext,
  },
  errorIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  errorText: {
    color: colors.error,
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  list: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.subtext,
    marginTop: 40,
  },
});