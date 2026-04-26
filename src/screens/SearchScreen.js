import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, ActivityIndicator, StyleSheet
} from 'react-native';
import BookCard from '../components/BookCard';
import colors from '../constants/colors';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (query.trim().length === 0) {
      setError('Kata kunci tidak boleh kosong!');
      return;
    }
    if (query.trim().length < 3) {
      setError('Minimal 3 karakter!');
      return;
    }
    setError('');
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
      );
      if (!res.ok) throw new Error('Gagal mencari buku');
      const data = await res.json();
      const mapped = data.docs.map(book => ({
        key: book.key,
        title: book.title,
        authors: book.author_name?.map(name => ({ name })) || [],
        first_publish_year: book.first_publish_year,
        cover_id: book.cover_i,
        edition_count: book.edition_count,
        subject: book.subject,
      }));
      setResults(mapped);
    } catch (e) {
      setError('Gagal mencari buku. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Cari buku..."
          placeholderTextColor={colors.subtext}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Cari</Text>
        </TouchableOpacity>
      </View>

      {/* Error */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Loading */}
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Mencari buku...</Text>
        </View>
      )}

      {/* Results */}
      {!loading && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <BookCard
              book={item}
              onPress={() => navigation.navigate('HomeTab', {
                screen: 'Detail',
                params: { book: item }
              })}
            />
          )}
          ListEmptyComponent={
            searched && !loading ? (
              <Text style={styles.emptyText}>Buku tidak ditemukan</Text>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBar: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  errorText: {
    color: colors.error,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: colors.subtext,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.subtext,
    marginTop: 40,
  },
});