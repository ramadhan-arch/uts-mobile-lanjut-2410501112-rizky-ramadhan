import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function BookCard({ book, onPress }) {
  const coverId = book.cover_id || null;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={styles.cover} />
      ) : (
        <View style={styles.noCover}>
          <Text style={styles.noCoverText}>📚</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>
          ✍️ {book.authors?.[0]?.name || 'Unknown'}
        </Text>
        <View style={styles.yearBadge}>
          <Text style={styles.yearText}>
            📅 {book.first_publish_year || 'N/A'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    margin: 8,
    flex: 1,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cover: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  noCover: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCoverText: {
    fontSize: 50,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  author: {
    fontSize: 11,
    color: colors.subtext,
    marginBottom: 6,
  },
  yearBadge: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  yearText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});