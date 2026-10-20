import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { Colors, Shadows, Spacing } from '../constants';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const MenuItem = ({ icon, label, color = '#333', onPress }: { icon: any; label: string; color?: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.menuIcon, { backgroundColor: color + '18' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.fullName?.charAt(0)?.toUpperCase() ?? 'A'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.fullName ?? 'Admin'}</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Management</Text>
        <View style={styles.card}>
          <MenuItem
            icon="people"
            label="Customers"
            color="#4A90E2"
            onPress={() => navigation.navigate('Customers')}
          />
          <View style={styles.divider} />
          <MenuItem
            icon="construct"
            label="Fault Diagnosis"
            color="#E67E22"
            onPress={() => navigation.navigate('FaultDiagnosis')}
          />
          <View style={styles.divider} />
          <MenuItem
            icon="grid"
            label="Categories"
            color="#27AE60"
            onPress={() => navigation.navigate('Categories')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>App Version</Text>
            <Text style={styles.infoValue}>1.0.0 MVP</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Backend</Text>
            <Text style={styles.infoValue}>ASP.NET Core 10</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Database</Text>
            <Text style={styles.infoValue}>SQL Server</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F6FA' },

  header: {
    backgroundColor: Colors.primaryContainer,
    paddingTop: 52, paddingBottom: 32, paddingHorizontal: 16,
    alignItems: 'center',
  },
  avatar:     { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 32, fontWeight: '800', color: '#fff' },
  name:       { fontSize: 20, fontWeight: '700', color: '#fff' },
  email:      { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 },

  section:      { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: '#999', letterSpacing: 0.8, marginBottom: 8, textTransform: 'uppercase' },

  card:     { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', ...Shadows.sm },
  divider:  { height: 1, backgroundColor: '#f5f5f5', marginLeft: 56 },

  menuItem:  { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 14 },
  menuIcon:  { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: '#333' },

  infoRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  infoLabel: { fontSize: 14, color: '#555' },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#333' },

  logoutBtn:  { backgroundColor: '#E74C3C', borderRadius: 12, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
