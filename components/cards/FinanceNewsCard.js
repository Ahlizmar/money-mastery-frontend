import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../styles/colors';
import { TYPOGRAPHY } from '../../styles/typography';
import { LAYOUT } from '../../styles/layout';
import { scale, verticalScale } from 'react-native-size-matters';

const API_URL = 'https://money-mastery-backend.onrender.com/api/news';

export default function FinanceNewsCard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch news headlines from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error('Error loading news:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <View style={LAYOUT.glassCard}>
      <View style={styles.cardHeader}>
        <Text style={TYPOGRAPHY.sectionTitle}>📰 Finance News</Text>
      </View>

      {loading ? (
        <ActivityIndicator color={COLORS.primary} />
      ) : (
        news.slice(0, 5).map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(item.url)}
            style={styles.newsItem}
          >
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(6),
  },
  bullet: {
    color: COLORS.primary,
    marginRight: scale(8),
    fontSize: scale(14),
  },
  title: {
    ...TYPOGRAPHY.text,
    textDecorationLine: 'underline',
    flex: 1,
  },
});