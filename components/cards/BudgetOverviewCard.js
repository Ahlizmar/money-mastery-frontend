import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../styles/colors';
import { TYPOGRAPHY } from '../../styles/typography';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// Live backend route
const API_BASE = 'https://money-mastery-backend.onrender.com/api/budget/status';

// Animated budget bar with category name and usage percentage
const BudgetBar = ({ label, percent }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percent,
      duration: 800,
      useNativeDriver: false,
    }).start();

    if (percent >= 90) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1.05, duration: 500, useNativeDriver: false }),
          Animated.timing(glowAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
        ])
      ).start();
    }
  }, [percent]);

  const animatedStyle = {
    width: animatedWidth.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    }),
    backgroundColor:
      percent >= 90
        ? COLORS.alert
        : percent >= 75
        ? COLORS.accent
        : percent >= 50
        ? COLORS.primary
        : COLORS.success,
    transform: [{ scaleY: percent >= 90 ? glowAnim : 1 }],
  };

  return (
    <View style={styles.budgetItem}>
      <View style={styles.labelRow}>
        <Text style={styles.barLabel}>{label}</Text>
        {percent >= 90 && <Text style={styles.warningLabel}>⚠ Limit</Text>}
      </View>
      <View style={styles.barBackground}>
        <Animated.View style={[styles.animatedBar, animatedStyle]} />
      </View>
      <Text style={TYPOGRAPHY.muted}>{percent}% used</Text>
    </View>
  );
};

// Card header with icon and title
const CardHeader = ({ icon, title }) => (
  <View style={styles.cardHeader}>
    <Text style={styles.headerIcon}>{icon}</Text>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

// Main budget card showing one or more categories
export default function BudgetOverviewCard() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'u123', category: 'Groceries' })
        });

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }

        const data = await res.json();

        // Set single category into state
        setCategories([{ label: data.category, percent: Math.round(data.percent) }]);
      } catch (err) {
        console.error('Failed to load budget status:', err.message);
        setCategories([{ label: 'Error loading budget', percent: 0 }]); // fallback display
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
  }, []);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Budgets')} activeOpacity={0.9}>
      <View style={styles.card}>
        <CardHeader icon="🪙" title="Budget Overview" />

        {/* Show spinner or bar */}
        {loading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          categories.map((item, index) => (
            <BudgetBar key={index} label={item.label} percent={item.percent} />
          ))
        )}
      </View>
    </TouchableOpacity>
  );
}

// Style definitions
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceGlass,
    borderRadius: moderateScale(20),
    padding: scale(16),
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    shadowColor: COLORS.shadowSoft,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
    marginBottom: verticalScale(20),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  headerIcon: {
    fontSize: scale(18),
    marginRight: scale(8),
  },
  headerText: {
    ...TYPOGRAPHY.sectionTitle,
  },
  budgetItem: {
    marginBottom: verticalScale(18),
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(6),
  },
  barLabel: {
    color: COLORS.textMuted,
    fontSize: scale(14),
    fontWeight: '500',
  },
  warningLabel: {
    fontSize: scale(12),
    color: COLORS.alert,
    fontWeight: '600',
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    backgroundColor: 'rgba(246, 170, 140, 0.15)',
    borderRadius: scale(6),
  },
  barBackground: {
    backgroundColor: '#2B3445',
    borderRadius: moderateScale(10),
    height: verticalScale(8),
    overflow: 'hidden',
    marginBottom: verticalScale(4),
  },
  animatedBar: {
    height: '100%',
    borderRadius: moderateScale(10),
  },
});