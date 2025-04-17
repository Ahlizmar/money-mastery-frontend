import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './styles/colors';

// Screens
import OnboardingScreen from './screens/OnboardingScreen';
import DashboardScreen from './screens/DashboardScreen';
import AddTransactionScreen from './screens/AddTransactionScreen';
import BudgetScreen from './screens/BudgetScreen';
import CryptoChallengeScreen from './screens/CryptoChallengeScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Drawer navigator for the main app after login
function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.surface,
          width: 260,
        },
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.textMuted,
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
          paddingLeft: 8,
          letterSpacing: 0.3,
        },
        sceneContainerStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Add Transaction" component={AddTransactionScreen} />
      <Drawer.Screen name="Budgets" component={BudgetScreen} />
      <Drawer.Screen name="Crypto Challenge" component={CryptoChallengeScreen} />
    </Drawer.Navigator>
  );
}

// Main app component with login and post-login navigation
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Onboarding">
            {props => (
              <OnboardingScreen
                {...props}
                onLoginSuccess={() => setIsAuthenticated(true)}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="MainDrawer" component={MainDrawer} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}