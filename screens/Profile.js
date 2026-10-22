import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation, route }) {
  const initialName = route?.params?.userName || 'muhammmad ramdani saputra';
  const [nama] = useState(
    initialName === 'putra' ? 'muhammad ramdani saputra' : initialName
  );
  const nim = '4112755201250084';
  const prodi = 'S1 Informatika';

  // State untuk modal konfirmasi logout
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Fungsi logout yang mengembalikan navigasi ke halaman Login
  const performLogout = () => {
    setShowLogoutModal(false);
    const rootNavigator = navigation.getParent() || navigation;
    if (rootNavigator?.reset) {
      rootNavigator.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else if (rootNavigator?.replace) {
      rootNavigator.replace('Login');
    } else {
      rootNavigator.navigate('Login');
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Top Header persis seperti gambar */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Text style={styles.headerSubtitle}>Informasi profil mahasiswa</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsCircle}
          onPress={() => setShowLogoutModal(true)}
        >
          <Ionicons name="settings-sharp" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card Profil Utama persis seperti gambar */}
        <View style={styles.profileCard}>
          {/* Avatar Lingkaran dengan border biru tebal & foto dari asset */}
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../assets/profile.jpg')}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>

          {/* Nama Mahasiswa */}
          <Text style={styles.nameText}>{nama}</Text>

          {/* Field NIM */}
          <TouchableOpacity
            style={styles.infoBox}
            activeOpacity={0.7}
            onPress={() =>
              Alert.alert('Info NIM', `NIM ${nim} tersalin!`)
            }
          >
            <Text style={styles.infoLabel}>NIM</Text>
            <Text style={styles.infoValue}>{nim}</Text>
          </TouchableOpacity>

          {/* Field Program Studi */}
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Program Studi</Text>
            <Text style={styles.infoValue}>{prodi}</Text>
          </View>
        </View>

        {/* Tombol Logout Fungsional */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setShowLogoutModal(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={20} color="#ffffff" />
          <Text style={styles.logoutButtonText}>Keluar Akun (Logout)</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Dialog Konfirmasi Logout (Bekerja lancar di Web, Android, dan iOS) */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmCard}>
            <View style={styles.modalIconBox}>
              <Ionicons name="alert-circle-outline" size={38} color="#ef4444" />
            </View>
            <Text style={styles.confirmTitle}>Konfirmasi Logout</Text>
            <Text style={styles.confirmDesc}>
              Apakah Anda yakin ingin keluar dari akun? Anda perlu login kembali untuk mengakses data.
            </Text>

            <View style={styles.confirmButtonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.cancelBtnText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.exitBtn}
                onPress={performLogout}
              >
                <Text style={styles.exitBtnText}>Ya, Keluar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  settingsCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarWrapper: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 3.5,
    borderColor: '#1e6fe9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarImage: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 18,
    textAlign: 'center',
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  infoLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  logoutButton: {
    marginTop: 22,
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  confirmCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  modalIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  confirmDesc: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  confirmButtonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  exitBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    alignItems: 'center',
  },
  exitBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
