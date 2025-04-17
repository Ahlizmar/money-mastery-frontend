import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const API_BASE = 'https://money-mastery-backend.onrender.com/api/users';

// Login and registration screen
export default function OnboardingScreen({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login/register
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle login or register request
  const handleAuth = async () => {
    const endpoint = isRegistering ? 'register' : 'login';
    const payload = isRegistering
      ? { username, email, password }
      : { email, password };

    try {
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('API response:', data);

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Unknown error');
      }

      Alert.alert('Success', isRegistering ? 'Registered!' : 'Logged in!');
      onLoginSuccess(); // Navigate to app
    } catch (err) {
      Alert.alert('Error', err.message); // Show API error
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>{isRegistering ? 'Register' : 'Login'}</Text>

      {/* Username only for registration */}
      {isRegistering && (
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      )}

      {/* Email field */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password field */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Submit button */}
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isRegistering ? 'Sign Up' : 'Login'}</Text>
      </TouchableOpacity>

      {/* Toggle login/register */}
      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.switchText}>
          {isRegistering
            ? 'Already have an account? Log in'
            : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Layout styles
const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#4B9CD3',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  switchText: { color: '#555', textAlign: 'center', marginTop: 10 },
});