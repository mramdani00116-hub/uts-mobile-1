import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
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
  const userName = route?.params?.userName || 'Muhammad Ramdani Saputra';
  const nim = '4112755201250084';
  const prodi = 'S1 Informatika';

  // State interaktif modal detail setiap Menu
  const [activeModal, setActiveModal] = useState(null); // 'menu1' | 'menu2' | 'menu3' | 'menu4'

  // Data interaktif Menu 1 (Tugas)
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Tugas Mobile Programming Pertemuan 6', done: false },
    { id: '2', title: 'Laporan Praktikum Basis Data', done: false },
    { id: '3', title: 'Desain Wireframe UI UTS Mobile 1', done: true },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const pendingTasksCount = tasks.filter((t) => !t.done).length;

  // Data Menu 2 (Jadwal)
  const schedules = [
    { id: '1', matkul: 'Pemrograman Mobile 1', jam: '08:00 - 10:30', ruang: 'Lab Komputer 3' },
    { id: '2', matkul: 'Interaksi Manusia & Komputer', jam: '13:00 - 15:30', ruang: 'R. 204' },
  ];

  // Data Menu 3 (Absensi)
  const [hadirHariIni, setHadirHariIni] = useState(false);

  // Data Menu 4 (Pengumuman)
  const announcements = [
    { id: '1', title: 'Ujian Tengah Semester (UTS) Mobile 1 Berlangsung' },
    { id: '2', title: 'Pengumpulan Project Wireframe & Prototype Mahasiswa' },
  ];

  // Tombol Logout: langsung kembali ke Login
  const handleLogout = () => {
    const nav = navigation.getParent() || navigation;
    if (nav?.reset) {
      nav.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else if (nav?.replace) {
      nav.replace('Login');
    } else {
      nav.navigate('Login');
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header HOME PAGE sesuai sketsa Gambar 1 */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>HOME PAGE</Text>
        </View>

        {/* KOTAK BESAR (Menggantikan banner Hallo Muhammad menjadi Foto Profil Mahasiswa) */}
        <View style={styles.profileBox}>
          {/* FOTO PROFIL */}
          <View style={styles.photoWrapper}>
            <Image
              source={require('../assets/profile.jpg')}
              style={styles.profilePhoto}
              resizeMode="cover"
            />
          </View>

          {/* NAMA KAMU */}
          <Text style={styles.userNameText}>{userName}</Text>
          <Text style={styles.nimText}>NIM: {nim}</Text>
          <Text style={styles.prodiText}>{prodi}</Text>
        </View>

        {/* 4 KOTAK MENU DALAM GRID 2x2 sesuai sketsa Gambar 1 */}
        <View style={styles.menuGrid}>
          {/* MENU 1 */}
          <TouchableOpacity
            style={styles.menuCard}
            activeOpacity={0.8}
            onPress={() => setActiveModal('menu1')}
          >
            <View style={styles.menuHeaderRow}>
              <Text style={styles.menuCode}>MENU 1</Text>
              <Ionicons name="document-text-outline" size={20} color="#1e90ff" />
            </View>
            <Text style={styles.menuValue}>{pendingTasksCount}</Text>
            <Text style={styles.menuDesc}>Tugas belum selesai</Text>
          </TouchableOpacity>

          {/* MENU 2 */}
          <TouchableOpacity
            style={styles.menuCard}
            activeOpacity={0.8}
            onPress={() => setActiveModal('menu2')}
          >
            <View style={styles.menuHeaderRow}>
              <Text style={styles.menuCode}>MENU 2</Text>
              <Ionicons name="calendar-outline" size={20} color="#1e90ff" />
            </View>
            <Text style={styles.menuValue}>2</Text>
            <Text style={styles.menuDesc}>Mata Kuliah hari ini</Text>
          </TouchableOpacity>

          {/* MENU 3 */}
          <TouchableOpacity
            style={styles.menuCard}
            activeOpacity={0.8}
            onPress={() => setActiveModal('menu3')}
          >
            <View style={styles.menuHeaderRow}>
              <Text style={styles.menuCode}>MENU 3</Text>
              <Ionicons name="checkmark-circle-outline" size={20} color="#1e90ff" />
            </View>
            <Text style={styles.menuValue}>{hadirHariIni ? '100%' : '97%'}</Text>
            <Text style={styles.menuDesc}>Semua mata kuliah</Text>
          </TouchableOpacity>

          {/* MENU 4 */}
          <TouchableOpacity
            style={styles.menuCard}
            activeOpacity={0.8}
            onPress={() => setActiveModal('menu4')}
          >
            <View style={styles.menuHeaderRow}>
              <Text style={styles.menuCode}>MENU 4</Text>
              <Ionicons name="notifications-outline" size={20} color="#1e90ff" />
            </View>
            <Text style={styles.menuValue}>2</Text>
            <Text style={styles.menuDesc}>Pengumuman baru</Text>
          </TouchableOpacity>
        </View>

        {/* TOMBOL LOGOUT sesuai sketsa Gambar 1 dengan warna Gambar 2 */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={20} color="#ffffff" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>TOMBOL LOGOUT</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MODAL INTERAKTIF UNTUK SETIAP MENU */}
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
                {activeModal === 'menu1' && 'MENU 1 - Daftar Tugas'}
                {activeModal === 'menu2' && 'MENU 2 - Jadwal Kuliah'}
                {activeModal === 'menu3' && 'MENU 3 - Presensi Mahasiswa'}
                {activeModal === 'menu4' && 'MENU 4 - Pengumuman Kampus'}
              </Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Ionicons name="close-circle" size={26} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            {/* Konten Menu 1 */}
            {activeModal === 'menu1' && (
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
                      color={item.done ? '#16a34a' : '#1e90ff'}
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

            {/* Konten Menu 2 */}
            {activeModal === 'menu2' && (
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

            {/* Konten Menu 3 */}
            {activeModal === 'menu3' && (
              <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#1e90ff' }}>
                  {hadirHariIni ? '100%' : '97%'}
                </Text>
                <Text style={{ color: '#64748b', marginVertical: 8 }}>
                  {hadirHariIni
                    ? 'Presensi hari ini sudah terkonfirmasi!'
                    : 'Presensi kuliah hari ini belum diisi'}
                </Text>
                <TouchableOpacity
                  style={styles.presensiBtn}
                  onPress={() => {
                    setHadirHariIni(true);
                    Alert.alert('Sukses', 'Presensi berhasil dikonfirmasi!');
                  }}
                  disabled={hadirHariIni}
                >
                  <Text style={styles.presensiBtnText}>
                    {hadirHariIni ? 'Sudah Presensi' : 'Isi Presensi Sekarang'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Konten Menu 4 */}
            {activeModal === 'menu4' && (
              <View>
                {announcements.map((item) => (
                  <View key={item.id} style={styles.announcementRow}>
                    <Ionicons name="notifications-outline" size={18} color="#1e90ff" />
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
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 36,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    letterSpacing: 1.2,
  },
  profileBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  photoWrapper: {
    width: 104,
    height: 104,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#1e90ff', // Warna aksen biru Gambar 2
    padding: 3,
    backgroundColor: '#ffffff',
    marginBottom: 14,
    shadowColor: '#1e90ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 4,
  },
  nimText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 2,
  },
  prodiText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
    marginBottom: 28,
  },
  menuCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#edf2f7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  menuHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuCode: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  menuValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e90ff', // Warna biru angka Gambar 2
    marginBottom: 4,
  },
  menuDesc: {
    fontSize: 11,
    color: '#64748b',
  },
  logoutButton: {
    backgroundColor: '#ff6347', // Warna tombol orange Gambar 2
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
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
    backgroundColor: '#1e90ff',
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
