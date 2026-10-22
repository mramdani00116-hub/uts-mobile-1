import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ route, navigation }) {
  const userName = route?.params?.userName || 'Ibnu';

  // State interaktif modal
  const [activeModal, setActiveModal] = useState(null); // 'tugas' | 'jadwal' | 'absensi' | 'pengumuman'

  // Data interaktif Tugas
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Tugas Mobile Programming Pertemuan 6', done: false },
    { id: '2', title: 'Laporan Praktikum Basis Data', done: false },
    { id: '3', title: 'Desain Wireframe UI Mahasiswa', done: false },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const pendingTasksCount = tasks.filter((t) => !t.done).length;

  // Data Jadwal
  const schedules = [
    { id: '1', matkul: 'Pemrograman Mobile 1', jam: '08:00 - 10:30', ruang: 'Lab Komputer 3' },
    { id: '2', matkul: 'Interaksi Manusia & Komputer', jam: '13:00 - 15:30', ruang: 'R. 204' },
  ];

  // Data Absensi
  const [hadirHariIni, setHadirHariIni] = useState(false);

  // Data Pengumuman
  const announcements = [
    { id: '1', title: 'Jadwal KRS Semester Ganjil 2026/2027 telah dibuka' },
    { id: '2', title: 'Kuliah Umum Mobile App Development via Zoom' },
  ];

  const handleLogoutConfirm = () => {
    const rootNav = navigation.getParent() || navigation;
    if (rootNav?.reset) {
      rootNav.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else if (rootNav?.replace) {
      rootNav.replace('Login');
    } else {
      rootNav.navigate('Login');
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Top Header persis seperti Foto 2 */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Home Page</Text>
        <TouchableOpacity
          style={styles.settingsCircle}
          activeOpacity={0.7}
          onPress={() => {
            Alert.alert(
              'Menu Pengaturan',
              'Pilih opsi yang ingin dilakukan:',
              [
                { text: 'Batal', style: 'cancel' },
                {
                  text: 'Buka Profil',
                  onPress: () => navigation.navigate('Profile'),
                },
                {
                  text: 'Keluar Akun (Logout)',
                  style: 'destructive',
                  onPress: handleLogoutConfirm,
                },
              ]
            );
          }}
        >
          <Ionicons name="settings-sharp" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner Biru (Hallo, Ibnu) persis seperti Foto 2 */}
        <View style={styles.blueBanner}>
          <Text style={styles.greetingTitle}>Hallo, {userName}</Text>
          <Text style={styles.greetingMessage}>
            Selamat datang di aplikasi mahasiswa. Semoga aktivitas kuliahmu hari ini berjalan lancar.
          </Text>
        </View>

        {/* Section Heading "Aktivitas" */}
        <Text style={styles.sectionTitle}>Aktivitas</Text>

        {/* 2x2 Grid Cards persis seperti Foto 2 */}
        <View style={styles.grid}>
          {/* Card Tugas */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => setActiveModal('tugas')}
          >
            <Text style={styles.cardTitle}>Tugas</Text>
            <Text style={styles.cardNumber}>{pendingTasksCount}</Text>
            <Text style={styles.cardSub}>Tugas belum selesai</Text>
          </TouchableOpacity>

          {/* Card Jadwal */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => setActiveModal('jadwal')}
          >
            <Text style={styles.cardTitle}>Jadwal</Text>
            <Text style={styles.cardNumber}>2</Text>
            <Text style={styles.cardSub}>Mata Kuliah hari ini</Text>
          </TouchableOpacity>

          {/* Card Absensi */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => setActiveModal('absensi')}
          >
            <Text style={styles.cardTitle}>Absensi</Text>
            <Text style={styles.cardNumber}>{hadirHariIni ? '100%' : '97%'}</Text>
            <Text style={styles.cardSub}>semua mata kuliah</Text>
          </TouchableOpacity>

          {/* Card Pengumuman */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => setActiveModal('pengumuman')}
          >
            <Text style={styles.cardTitle}>Pengumuman</Text>
            <Text style={styles.cardNumber}>2</Text>
            <Text style={styles.cardSub}>Pengumuman baru</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Interaktif untuk Aktivitas */}
      <Modal
        visible={activeModal !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeading}>
                {activeModal === 'tugas' && 'Daftar Tugas Kuliah'}
                {activeModal === 'jadwal' && 'Jadwal Kuliah Hari Ini'}
                {activeModal === 'absensi' && 'Status Kehadiran'}
                {activeModal === 'pengumuman' && 'Pengumuman Baru'}
              </Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Ionicons name="close-circle" size={26} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            {/* Konten Tugas */}
            {activeModal === 'tugas' && (
              <View>
                <Text style={styles.modalHint}>
                  Ketuk untuk menandai tugas telah selesai:
                </Text>
                {tasks.map((item) => (
                  <Pressable
                    key={item.id}
                    onPress={() => toggleTask(item.id)}
                    style={[styles.itemRow, item.done && styles.itemRowDone]}
                  >
                    <Ionicons
                      name={item.done ? 'checkbox' : 'square-outline'}
                      size={22}
                      color={item.done ? '#16a34a' : '#2563eb'}
                    />
                    <Text
                      style={[
                        styles.itemText,
                        item.done && styles.itemTextDone,
                      ]}
                    >
                      {item.title}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}

            {/* Konten Jadwal */}
            {activeModal === 'jadwal' && (
              <View>
                {schedules.map((item) => (
                  <View key={item.id} style={styles.scheduleRow}>
                    <Text style={styles.scheduleMatkul}>{item.matkul}</Text>
                    <Text style={styles.scheduleInfo}>
                      {item.jam} • {item.ruang}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Konten Absensi */}
            {activeModal === 'absensi' && (
              <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#2563eb' }}>
                  {hadirHariIni ? '100%' : '97%'}
                </Text>
                <Text style={{ color: '#64748b', marginVertical: 8 }}>
                  {hadirHariIni ? 'Presensi hari ini sudah tercatat!' : 'Presensi kuliah hari ini belum diisi'}
                </Text>
                <TouchableOpacity
                  style={styles.presensiBtn}
                  onPress={() => {
                    setHadirHariIni(true);
                    Alert.alert('Sukses', 'Presensi hari ini berhasil dikonfirmasi!');
                  }}
                  disabled={hadirHariIni}
                >
                  <Text style={styles.presensiBtnText}>
                    {hadirHariIni ? 'Sudah Presensi' : 'Isi Presensi Sekarang'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Konten Pengumuman */}
            {activeModal === 'pengumuman' && (
              <View>
                {announcements.map((item) => (
                  <View key={item.id} style={styles.announcementRow}>
                    <Ionicons name="notifications-outline" size={18} color="#2563eb" />
                    <Text style={styles.announcementText}>{item.title}</Text>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setActiveModal(null)}
            >
              <Text style={styles.modalCloseBtnText}>Tutup</Text>
            </TouchableOpacity>
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
  blueBanner: {
    backgroundColor: '#2563eb', // Biru royal Foto 2
    borderRadius: 18,
    padding: 20,
    marginTop: 8,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  greetingMessage: {
    fontSize: 13,
    color: '#ffffff',
    lineHeight: 18,
    opacity: 0.95,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 26,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
  },
  card: {
    width: '47.5%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#edf2f7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
    marginBottom: 6,
  },
  cardNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 11,
    color: '#64748b',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 22,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  modalHint: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    gap: 10,
  },
  itemRowDone: {
    backgroundColor: '#f0fdf4',
  },
  itemText: {
    flex: 1,
    fontSize: 13,
    color: '#1e293b',
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  scheduleRow: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  scheduleMatkul: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  scheduleInfo: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  presensiBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    marginTop: 8,
  },
  presensiBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  announcementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  announcementText: {
    flex: 1,
    fontSize: 13,
    color: '#1e293b',
  },
  modalCloseBtn: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  modalCloseBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
});
