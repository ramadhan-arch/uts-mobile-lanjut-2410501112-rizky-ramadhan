import { useState, useContext } from 'react';
import {
  View, Text, Image, ScrollView,
  TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { BookContext } from '../context/BookContext';
import colors from '../constants/colors';

export default function DetailScreen({ route }) {
  const { book } = route.params;
  const { state, dispatch } = useContext(BookContext);

  const coverId = book.cover_id || null;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null;

  const isFavorite = state.favorites.some(f => f.key === book.key);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: book.key });
      Alert.alert('Dihapus', 'Buku dihapus dari favorit!');
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: book });
      Alert.alert('Ditambahkan', 'Buku ditambahkan ke favorit!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cover Buku */}
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={styles.cover} />
      ) : (
        <View style={styles.noCover}>
          <Text style={styles.noCoverText}>No Cover Available</Text>
        </View>
      )}

      <View style={styles.content}>
        {/* 1. Judul */}
        <Text style={styles.title}>{book.title}</Text>

        {/* 2. Penulis */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Penulis</Text>
          <Text style={styles.value}>
            {book.authors?.map(a => a.name).join(', ') || 'Unknown'}
          </Text>
        </View>

        {/* 3. Tahun Terbit */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tahun Terbit</Text>
          <Text style={styles.value}>
            {book.first_publish_year || 'N/A'}
          </Text>
        </View>

        {/* 4. Jumlah Edisi */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Jumlah Edisi</Text>
          <Text style={styles.value}>
            {book.edition_count || 'N/A'}
          </Text>
        </View>

        {/* 5. Subject/Genre */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Genre</Text>
          <Text style={styles.value}>
            {book.subject?.slice(0, 3).join(', ') || 'Fiction'}
          </Text>
        </View>

        {/* Tombol Favorit */}
        <TouchableOpacity
          style={[styles.favButton, isFavorite && styles.favButtonActive]}
          onPress={handleFavorite}
        >
          <Text style={styles.favButtonText}>
            {isFavorite ? '❤️ Hapus dari Favorit' : '🤍 Tambah ke Favorit'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cover: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: colors.border,
  },
  noCover: {
    width: '100%',
    height: 300,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCoverText: {
    color: colors.subtext,
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  infoRow: {
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 14,
  },
  label: {
    fontSize: 12,
    color: colors.subtext,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 15,
    color: colors.text,
  },
  favButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  favButtonActive: {
    backgroundColor: colors.error,
  },
  favButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});