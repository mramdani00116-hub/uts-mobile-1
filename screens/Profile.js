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
  const nama = 'Ibnu Darma Maulana';
  const nim = '43E57027205006';
  const prodi = 'S1 Sistem Informasi';

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

      {/* Top Header persis seperti Foto 3 */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Text style={styles.headerSubtitle}>Informasi profil mahasiswa</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsCircle}
          activeOpacity={0.7}
          onPress={() => setShowLogoutModal(true)}
        >
          <Ionicons name="settings-sharp" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card Profil Utama persis seperti Foto 3 */}
        <View style={styles.profileCard}>
          {/* Avatar Lingkaran dengan border biru tebal & foto Ibnu */}
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

        {/* Tombol Logout Merah/Coral persis seperti Foto 3 */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setShowLogoutModal(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="exit-outline" size={20} color="#ffffff" style={styles.logoutIcon} />
          <Text style={styles.logoutButtonText}>Keluar Akun (Logout)</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Dialog Konfirmasi Logout persis seperti Foto 4 */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmCard}>
            <View style={styles.modalIconBox}>
              <Ionicons name="alert-circle-outline" size={42} color="#ef4444" />
            </View>
            <Text style={styles.confirmTitle}>Konfirmasi Logout</Text>
            <Text style={styles.confirmDesc}>
              Apakah Anda yakin ingin keluar dari akun? Anda perlu login kembali untuk mengakses data.
            </Text>

            <View style={styles.confirmButtonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelBtnText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={performLogout}
                activeOpacity={0.85}
              >
                <Text style={styles.confirmBtnText}>Ya, Keluar</Text>
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
    paddingBottom: 24,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 24,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#edf2f7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3.5,
    borderColor: '#2563eb', // Border biru terang Foto 3
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
    marginBottom: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  logoutButton: {
    backgroundColor: '#ef4444', // Warna merah/coral Foto 3
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  logoutIcon: {
    marginRight: 8,
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
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  modalIconBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmDesc: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 22,
  },
  confirmButtonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 14,
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#ef4444',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
