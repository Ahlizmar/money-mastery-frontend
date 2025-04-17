import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';
import { TYPOGRAPHY } from '../../styles/typography';
import { LAYOUT } from '../../styles/layout';
import { scale, verticalScale } from 'react-native-size-matters';
import XPRing from '../gamification/XPRing';

// RewardsCard displays user XP and badges earned
export default function RewardsCard({ xp = 150, level = 2, maxXP = 500, badges = 2 }) {
  return (
    <View style={LAYOUT.glassCard}>
      {/* Card header */}
      <View style={styles.cardHeader}>
        <Text style={[TYPOGRAPHY.sectionTitle, { color: COLORS.xpGold }]}>
          🏆 Rewards & Badges
        </Text>
      </View>

      {/* XP ring and badge summary */}
      <View style={styles.row}>
        <XPRing xp={xp} level={level} maxXP={maxXP} size={64} />

        <View style={styles.textBlock}>
          <Text style={TYPOGRAPHY.text}>
            🎉 You’ve earned <Text style={{ color: COLORS.xpGold }}>+{xp} XP</Text>{' '}
            and unlocked{' '}
            <Text style={{ color: COLORS.badgePink }}>
              {badges} new badge{badges !== 1 ? 's' : ''}
            </Text>!
          </Text>
        </View>
      </View>
    </View>
  );
}

// Style definitions
const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(16),
  },
  textBlock: {
    flex: 1,
    justifyContent: 'center',
  },
});