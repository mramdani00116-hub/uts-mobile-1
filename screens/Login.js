import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (val) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(val);
  };

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      Alert.alert('Peringatan', 'Email dan password harus diisi!');
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      Alert.alert('Peringatan', 'Format email tidak valid! Contoh: user@gmail.com');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Peringatan', 'Password minimal 6 karakter!');
      return;
    }

    // Default nama Ibnu sesuai tampilan referensi
    let displayName = 'Ibnu';
    if (trimmedEmail.toLowerCase().includes('ibnu')) {
      displayName = 'Ibnu';
    }

    // Navigasi ke MainTab (Home + Profile)
    navigation.replace('MainTab', {
      userEmail: trimmedEmail,
      userName: displayName,
    });
  };

  const handleQuickFill = () => {
    setEmail('ibnu.darma@mahasiswa.ac.id');
    setPassword('123456');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1e90ff" />

      <View style={styles.content}>
        {/* Title persis seperti Foto 1 */}
        <Text style={styles.title}>Welcome Back!</Text>

        {/* Input Email */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Input Password */}
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#888888"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            style={styles.eyeBtn}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#888888"
            />
          </Pressable>
        </View>

        {/* Tombol Login persis seperti Foto 1 */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Shortcut isi cepat untuk kemudahan demo */}
        <TouchableOpacity
          style={styles.quickFillLink}
          onPress={handleQuickFill}
          activeOpacity={0.7}
        >
          <Text style={styles.quickFillText}>Isi Otomatis Akun Demo</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e90ff', // Warna biru cerah Foto 1
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 44,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    fontSize: 15,
    color: '#1e293b',
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  passwordWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1e293b',
    fontWeight: '500',
  },
  eyeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  button: {
    width: '100%',
    backgroundColor: '#ff6347', // Warna tombol orange/coral Foto 1
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  quickFillLink: {
    marginTop: 24,
    padding: 8,
  },
  quickFillText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
