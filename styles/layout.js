import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const LAYOUT = StyleSheet.create({
  // 🌑 Screen wrapper
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
  },

  // 🧊 Glass-style card
  glassCard: {
    backgroundColor: COLORS.surfaceGlass,
    borderRadius: moderateScale(20),
    padding: scale(16), // optimal for mobile touch targets
    marginBottom: verticalScale(20),
    minHeight: verticalScale(140),
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    shadowColor: COLORS.shadowSoft,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  // ↔️ Row layout
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
  },

  // 📝 Input field
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(12),
    padding: scale(14),
    fontSize: scale(16),
    color: COLORS.textPrimary,
    marginBottom: verticalScale(16),
  },

  // ✅ Button
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(16),
    paddingVertical: scale(14),
    paddingHorizontal: scale(24),
    alignItems: 'center',
  },

  buttonTextDark: {
    color: '#000',
    fontSize: scale(16),
    fontWeight: '600',
  },
});