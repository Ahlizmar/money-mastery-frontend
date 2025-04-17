import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../styles/colors';
import { TYPOGRAPHY } from '../styles/typography';
import { LAYOUT } from '../styles/layout';

const API_URL = 'http://localhost:3000/api/transactions/add'; // Change this when deployed

export default function AddTransactionScreen() {
  const navigation = useNavigation();

  // Form state
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [type, setType] = useState('Expense');

  // Sends form data to backend
  const handleSubmit = async () => {
    if (!amount) {
      Alert.alert('Validation', 'Please enter an amount.');
      return;
    }

    try {
      const payload = {
        userId: 'u123', // Replace with dynamic user ID if needed
        amount: parseFloat(amount),
        category,
        type: type.toLowerCase(),
        date: new Date().toISOString(),
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add transaction');
      }

      Alert.alert('Success', 'Transaction added successfully');
      setAmount('');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <SafeAreaView style={LAYOUT.screen}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={scale(22)} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Transaction</Text>
        <View style={{ width: scale(22) }} />
      </View>

      {/* Form */}
      <View style={LAYOUT.glassCard}>
        <Text style={TYPOGRAPHY.label}>Amount</Text>
        <TextInput
          style={[LAYOUT.input, { marginBottom: verticalScale(8) }]}
          placeholder="$"
          placeholderTextColor={COLORS.textMuted}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={TYPOGRAPHY.label}>Category</Text>
        <Pressable
          style={[
            LAYOUT.input,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: verticalScale(8),
            },
          ]}
        >
          <Text style={TYPOGRAPHY.muted}>{category}</Text>
          <Ionicons name="chevron-down" size={moderateScale(18)} color={COLORS.textMuted} />
        </Pressable>

        <Text style={TYPOGRAPHY.label}>Type</Text>
        <View
          style={[
            LAYOUT.row,
            {
              backgroundColor: COLORS.surface,
              borderRadius: moderateScale(12),
              padding: scale(4),
              marginBottom: verticalScale(8),
            },
          ]}
        >
          {['Expense', 'Income'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                {
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: verticalScale(10),
                  borderRadius: moderateScale(10),
                },
                type === option && { backgroundColor: COLORS.primary },
              ]}
              onPress={() => setType(option)}
            >
              <Text style={type === option ? LAYOUT.buttonTextDark : TYPOGRAPHY.muted}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={TYPOGRAPHY.label}>Date</Text>
        <Pressable
          style={[
            LAYOUT.input,
            LAYOUT.row,
            { gap: scale(8), marginBottom: verticalScale(16) },
          ]}
        >
          <Ionicons name="calendar-outline" size={moderateScale(18)} color={COLORS.textMuted} />
          <Text style={TYPOGRAPHY.muted}>Today</Text>
        </Pressable>

        {/* Submit Button */}
        <TouchableOpacity style={LAYOUT.buttonPrimary} onPress={handleSubmit}>
          <Text style={LAYOUT.buttonTextDark}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(8),
    paddingBottom: verticalScale(12),
  },
  topTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});