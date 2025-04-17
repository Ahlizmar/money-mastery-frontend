import React from 'react';
import { View, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { COLORS } from '../../styles/colors';
import { scale } from 'react-native-size-matters';

// XPRing displays the user’s XP progress visually
export default function XPRing({ xp = 320, level = 3, maxXP = 500, size = 100 }) {
  // Calculate percent progress, capped at 100%
  const progress = Math.min((xp / maxXP) * 100, 100);

  return (
    <View style={styles.container}>
      <CircularProgress
        value={progress}
        maxValue={100}
        radius={size / 2}
        activeStrokeWidth={12}
        inActiveStrokeWidth={12}
        valueSuffix="%"
        progressValueColor={COLORS.textPrimary}
        title={`Lvl ${level}`}
        titleColor={COLORS.textMuted}
        titleStyle={{ fontSize: scale(12), marginTop: 4 }}
        activeStrokeColor={COLORS.primary}
        inActiveStrokeColor={COLORS.surfaceBorder}
        activeStrokeSecondaryColor={COLORS.accent}
        duration={1000}
      />
    </View>
  );
}

// Simple centered layout
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});