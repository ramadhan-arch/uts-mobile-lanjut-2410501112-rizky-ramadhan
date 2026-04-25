import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function BookCard({ book, onPress }) {
  const coverId = book.cover_id || (book.cover_edition_key ? book.cover_edition_key : null);
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={styles.cover} />
      ) : (
        <View style={styles.noCover}>
          <Text style={styles.noCoverText}>No Cover</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.authors?.[0]?.name || 'Unknown Author'}
        </Text>
        <Text style={styles.year}>
          {book.first_publish_year || 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cover: {
    width: 70,
    height: 100,
    borderRadius: 6,
    backgroundColor: colors.border,
  },
  noCover: {
    width: 70,
    height: 100,
    borderRadius: 6,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCoverText: {
    fontSize: 10,
    color: colors.subtext,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    color: colors.subtext,
    marginBottom: 4,
  },
  year: {
    fontSize: 12,
    color: colors.primary,
  },
});