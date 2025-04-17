import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../styles/colors';
import { TYPOGRAPHY } from '../styles/typography';
import { LAYOUT } from '../styles/layout';
import { scale, verticalScale } from 'react-native-size-matters';

// Dashboard cards (all should be default exports)
import SmartTipsCard from '../components/cards/SmartTipsCard';
import BudgetOverviewCard from '../components/cards/BudgetOverviewCard';
import RewardsCard from '../components/cards/RewardsCard';
import FinanceNewsCard from '../components/cards/FinanceNewsCard';

export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={LAYOUT.screen}>
      {/* Top bar with drawer toggle and title */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={scale(22)} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Welcome Back!</Text>
        <TouchableOpacity onPress={() => console.log('Notifications')}>
          <Ionicons name="notifications-outline" size={scale(22)} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Main dashboard scroll area */}
      <ScrollView contentContainerStyle={{ paddingBottom: verticalScale(40) }}>
        <SmartTipsCard />
        <BudgetOverviewCard />

        {/* Savings challenge (placeholder text) */}
        <View style={LAYOUT.glassCard}>
          <View style={styles.cardHeader}>
            <Text style={[TYPOGRAPHY.sectionTitle, { color: COLORS.primary }]}>
              🎯 Savings Challenge
            </Text>
          </View>
          <Text style={TYPOGRAPHY.text}>
            💪 You're halfway through your 7-day $100 saving streak!
          </Text>
        </View>

        <RewardsCard xp={150} badges={2} />

        {/* Static crypto goal display */}
        <View style={LAYOUT.glassCard}>
          <View style={styles.cardHeader}>
            <Text style={[TYPOGRAPHY.sectionTitle, { color: COLORS.cryptoBlue }]}>
              ₿ Crypto Challenge
            </Text>
          </View>
          <View style={[LAYOUT.row, { justifyContent: 'space-between' }]}>
            <Text style={TYPOGRAPHY.text}>
              You’ve saved <Text style={{ color: COLORS.cryptoBlue }}>0.0006 BTC</Text> of your goal.
            </Text>
            <Ionicons name="arrow-forward-circle" size={scale(20)} color={COLORS.primary} />
          </View>
        </View>

        <FinanceNewsCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(16),
  },
  topTitle: {
    color: COLORS.textPrimary,
    fontSize: scale(16),
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
});