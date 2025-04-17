import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';
import { LAYOUT } from '../styles/layout';
import { TYPOGRAPHY } from '../styles/typography';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function BudgetScreen() {
  const navigation = useNavigation();

  // Budget data (can be replaced with API data later)
  const [budgets, setBudgets] = useState([
    { name: 'Groceries', limit: 300, spent: 220 },
    { name: 'Dining', limit: 150, spent: 90 },
    { name: 'Subscriptions', limit: 80, spent: 80 },
  ]);

  const [editingCategory, setEditingCategory] = useState(null); // Active category being edited
  const [newLimit, setNewLimit] = useState(''); // New value for budget limit

  // Update the limit for a selected budget category
  const handleSave = () => {
    const updated = budgets.map(b =>
      b.name === editingCategory.name ? { ...b, limit: parseFloat(newLimit) } : b
    );
    setBudgets(updated);
    setEditingCategory(null);
    setNewLimit('');
  };

  return (
    <SafeAreaView style={LAYOUT.screen}>
      {/* Top bar with back button and screen title */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={scale(22)} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Budget Categories</Text>
        <View style={{ width: scale(22) }} />
      </View>

      {/* List of budget cards */}
      <ScrollView contentContainerStyle={{ paddingBottom: verticalScale(40) }}>
        {budgets.map((item, index) => {
          const percent = Math.min(Math.round((item.spent / item.limit) * 100), 100);

          return (
            <View key={index} style={LAYOUT.glassCard}>
              {/* Category name and edit icon */}
              <View style={LAYOUT.row}>
                <Text style={TYPOGRAPHY.sectionTitle}>{item.name}</Text>
                <TouchableOpacity onPress={() => {
                  setEditingCategory(item);
                  setNewLimit(item.limit.toString());
                }}>
                  <Ionicons name="pencil-outline" size={scale(18)} color={COLORS.primary} />
                </TouchableOpacity>
              </View>

              {/* Display current limit and spent amount */}
              <Text style={TYPOGRAPHY.text}>Limit: ${item.limit.toFixed(2)}</Text>
              <Text style={TYPOGRAPHY.text}>Spent: ${item.spent.toFixed(2)}</Text>

              {/* Progress bar for budget used */}
              <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${percent}%` }]} />
              </View>
              <Text style={TYPOGRAPHY.muted}>{percent}% used</Text>
            </View>
          );
        })}

        {/* Add new budget category (coming soon placeholder) */}
        <TouchableOpacity style={styles.addButton} onPress={() => alert('Coming soon')}>
          <Ionicons name="add-circle-outline" size={scale(20)} color={COLORS.primary} />
          <Text style={[TYPOGRAPHY.sectionTitle, { marginLeft: scale(8) }]}>
            Add Category
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for editing budget limits */}
      <Modal transparent visible={!!editingCategory} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={TYPOGRAPHY.header}>Edit {editingCategory?.name}</Text>

            {/* Numeric input for new budget limit */}
            <TextInput
              style={[LAYOUT.input, { marginBottom: verticalScale(16) }]}
              keyboardType="numeric"
              value={newLimit}
              onChangeText={setNewLimit}
              placeholder="New Limit"
              placeholderTextColor={COLORS.textMuted}
            />

            {/* Save and cancel actions */}
            <TouchableOpacity style={LAYOUT.buttonPrimary} onPress={handleSave}>
              <Text style={LAYOUT.buttonTextDark}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: verticalScale(12) }}
              onPress={() => setEditingCategory(null)}
            >
              <Text style={TYPOGRAPHY.muted}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Style definitions
const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(16),
  },
  topTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  barBackground: {
    backgroundColor: '#2B3445',
    borderRadius: moderateScale(10),
    height: verticalScale(8),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
  },
  barFill: {
    backgroundColor: COLORS.primary,
    height: verticalScale(8),
    borderRadius: moderateScale(10),
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginLeft: scale(8),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: scale(20),
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(16),
    padding: scale(20),
  },
});