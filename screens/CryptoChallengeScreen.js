import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TYPOGRAPHY } from '../styles/typography';
import { LAYOUT } from '../styles/layout';
import { COLORS } from '../styles/colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CryptoChallengeScreen() {
  const navigation = useNavigation();
  const [usdSaved, setUsdSaved] = useState('');
  const [btcGoal, setBtcGoal] = useState('');
  const [result, setResult] = useState(null);
  const [btcPrice, setBtcPrice] = useState(null);

  // Fetch real-time BTC price from CoinGecko
  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await res.json();
        setBtcPrice(data.bitcoin.usd);
      } catch (err) {
        console.error('Failed to fetch BTC price:', err);
      }
    };

    fetchBTCPrice();
  }, []);

  // Submit challenge input and calculate backend result
  const handleCheckProgress = async () => {
    const usd = parseFloat(usdSaved);
    const btc = parseFloat(btcGoal);

    if (!usd || !btc || isNaN(usd) || isNaN(btc)) {
      return Alert.alert('Missing Input', 'Please enter valid USD saved and BTC goal.');
    }

    try {
      const res = await fetch('https://money-mastery-backend.onrender.com/api/crypto-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usdSaved: usd, btcGoal: btc }),
      });

      const data = await res.json();
      console.log('Crypto challenge result:', data);

      if (data.btcSaved && data.btcGoal && data.percent) {
        setResult({
          ...data,
          percent: parseFloat(data.percent),
        });
      } else {
        Alert.alert('Error', 'Incomplete response from server.');
      }
    } catch (err) {
      console.error('Error fetching challenge data:', err);
      Alert.alert('Network Error', 'Unable to calculate progress. Please try again.');
    }
  };

  // Set bar color based on percent progress
  const getProgressColor = (percent) => {
    if (percent >= 100) return COLORS.success;
    if (percent >= 75) return COLORS.primary;
    if (percent >= 50) return COLORS.xpGold;
    return COLORS.alert;
  };

  return (
    <SafeAreaView style={LAYOUT.screen}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={scale(22)} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Crypto Challenge</Text>
        <View style={{ width: scale(22) }} />
      </View>

      {/* Input card */}
      <View style={styles.card}>
        {btcPrice && (
          <Text style={[TYPOGRAPHY.muted, { marginBottom: verticalScale(10), textAlign: 'center' }]}>
            1 BTC = ${btcPrice.toLocaleString()}
          </Text>
        )}

        <Text style={TYPOGRAPHY.label}>USD Saved</Text>
        <TextInput
          style={LAYOUT.input}
          placeholder="$"
          placeholderTextColor={COLORS.textMuted}
          keyboardType="numeric"
          value={usdSaved}
          onChangeText={setUsdSaved}
        />

        <Text style={TYPOGRAPHY.label}>BTC Goal</Text>
        <TextInput
          style={LAYOUT.input}
          placeholder="0.01"
          placeholderTextColor={COLORS.textMuted}
          keyboardType="numeric"
          value={btcGoal}
          onChangeText={setBtcGoal}
        />

        <TouchableOpacity style={LAYOUT.buttonPrimary} onPress={handleCheckProgress}>
          <Text style={LAYOUT.buttonTextDark}>Check Progress</Text>
        </TouchableOpacity>

        {/* Display result if available */}
        {result && (
          <View style={styles.progressCard}>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>BTC Saved:</Text>
              <Text style={styles.resultValue}>{result.btcSaved} BTC</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Goal:</Text>
              <Text style={styles.resultValue}>{result.btcGoal} BTC</Text>
            </View>

            {/* Progress bar */}
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${isNaN(result.percent) ? 0 : result.percent}%`,
                    backgroundColor: getProgressColor(result.percent),
                  },
                ]}
              />
            </View>

            <Text style={[TYPOGRAPHY.muted, { marginTop: 6, textAlign: 'center' }]}>
              {result.percent}% complete
            </Text>

            {/* Completion badge */}
            {result.percent >= 100 && (
              <View style={styles.badge}>
                <Ionicons
                  name="trophy"
                  size={scale(22)}
                  color="#000"
                  style={{ marginRight: scale(8) }}
                />
                <Text style={styles.badgeText}>Goal Completed!</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// Style definitions
const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(12),
  },
  topTitle: {
    color: COLORS.textPrimary,
    fontSize: scale(16),
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.surfaceGlass,
    borderRadius: moderateScale(20),
    padding: scale(20),
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  progressCard: {
    marginTop: verticalScale(24),
  },
  progressBar: {
    backgroundColor: '#1F2430',
    borderRadius: moderateScale(12),
    height: verticalScale(10),
    marginTop: verticalScale(12),
  },
  progressFill: {
    height: '100%',
    borderRadius: moderateScale(12),
  },
  badge: {
    backgroundColor: COLORS.success,
    marginTop: verticalScale(16),
    padding: verticalScale(10),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: 'transparent',
  },
  badgeText: {
    color: '#000',
    fontWeight: '600',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(6),
  },
  resultLabel: {
    color: COLORS.textMuted,
    fontSize: scale(14),
  },
  resultValue: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: scale(14),
  },
});