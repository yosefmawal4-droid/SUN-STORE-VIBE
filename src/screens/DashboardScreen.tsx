import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator, RefreshControl,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { dashboardService, DashboardData } from '../services/dashboardService';
import { useAuth } from '../context/AuthContext';
import { Colors, Spacing, Layout, Shadows } from '../constants';

type NavProp = any;

export default function DashboardScreen() {
  const navigation = useNavigation<NavProp>();
  const { user } = useAuth();
  const [data,     setData]     = useState<DashboardData | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      setError('');
      const res = await dashboardService.get();
      setData(res);
    } catch {
      setError('Failed to load dashboard. Is the backend running?');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primaryContainer} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} colors={[Colors.primaryContainer]} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>مرحباً 👋</Text>
          <Text style={styles.name}>{user?.fullName ?? 'Admin'}</Text>
        </View>
        <View style={styles.logoBox}>
          <Ionicons name="sunny" size={26} color="#fff" />
        </View>
      </View>

      {error !== '' && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {data && (
        <>
          {/* Stats Grid */}
          <View style={styles.grid}>
            <StatCard label="Products"       value={data.totalProducts}       icon="cube"        color="#FF6B00" />
            <StatCard label="Customers"      value={data.totalCustomers}      icon="people"      color="#4A90E2" />
            <StatCard label="Sales"          value={data.totalSales}          icon="cart"        color="#27AE60" />
            <StatCard label="Low Stock"      value={data.lowStockCount + data.outOfStockCount} icon="warning" color="#E74C3C" />
          </View>

          {/* Revenue & Inventory Value */}
          <View style={styles.wideCards}>
            <WideCard
              label="Total Revenue"
              value={`SAR ${data.totalRevenue.toLocaleString('en-SA', { minimumFractionDigits: 0 })}`}
              icon="trending-up"
              color="#27AE60"
            />
            <WideCard
              label="Inventory Value"
              value={`SAR ${data.totalInventoryValue.toLocaleString('en-SA', { minimumFractionDigits: 0 })}`}
              icon="layers"
              color="#4A90E2"
            />
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actions}>
            <ActionBtn label="Products"   icon="cube-outline"   onPress={() => navigation.navigate('Products')} />
            <ActionBtn label="New Sale"   icon="cart-outline"   onPress={() => navigation.navigate('Sales', { screen: 'NewSale' })} />
            <ActionBtn label="Customers"  icon="people-outline" onPress={() => navigation.navigate('More',  { screen: 'Customers' })} />
            <ActionBtn label="Inventory"  icon="layers-outline" onPress={() => navigation.navigate('Inventory')} />
          </View>

          {/* Stock Alerts */}
          {data.lowStockProducts.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>⚠️ Stock Alerts</Text>
              {data.lowStockProducts.slice(0, 5).map(p => (
                <View key={p.id} style={[styles.alertRow, p.status === 'OUT_OF_STOCK' && styles.alertOut]}>
                  <Text style={styles.alertName} numberOfLines={1}>{p.name}</Text>
                  <View style={[styles.badge, p.status === 'OUT_OF_STOCK' ? styles.badgeOut : styles.badgeLow]}>
                    <Text style={styles.badgeText}>
                      {p.status === 'OUT_OF_STOCK' ? 'OUT' : `${p.stockQuantity} left`}
                    </Text>
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Recent Sales */}
          {data.recentSales.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Recent Sales</Text>
              {data.recentSales.map(s => (
                <View key={s.id} style={styles.saleRow}>
                  <View>
                    <Text style={styles.saleName}>{s.customerName}</Text>
                    <Text style={styles.saleDate}>{new Date(s.createdAt).toLocaleDateString()}</Text>
                  </View>
                  <Text style={styles.saleAmount}>SAR {s.totalAmount.toLocaleString()}</Text>
                </View>
              ))}
            </>
          )}

          <View style={{ height: Spacing.xxl }} />
        </>
      )}
    </ScrollView>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: any; color: string }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Ionicons name={icon} size={22} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function WideCard({ label, value, icon, color }: { label: string; value: string; icon: any; color: string }) {
  return (
    <View style={[styles.wideCard, { borderLeftColor: color }]}>
      <Ionicons name={icon} size={20} color={color} style={{ marginBottom: 4 }} />
      <Text style={styles.wideValue}>{value}</Text>
      <Text style={styles.wideLabel}>{label}</Text>
    </View>
  );
}

function ActionBtn({ label, icon, onPress }: { label: string; icon: any; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.actionIcon}>
        <Ionicons name={icon} size={22} color={Colors.primaryContainer} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F6FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    backgroundColor: Colors.primaryContainer,
    paddingTop: 52,
    paddingBottom: 24,
    paddingHorizontal: Layout.screenPaddingH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  name:     { color: '#fff', fontSize: 20, fontWeight: '700' },
  logoBox:  { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },

  errorBanner: { backgroundColor: '#fdecea', margin: 16, borderRadius: 8, padding: 12 },
  errorText:   { color: '#c0392b', textAlign: 'center', fontSize: 13 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingTop: 16,
    gap: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    width: '47%',
    borderLeftWidth: 4,
    ...Shadows.sm,
  },
  statValue: { fontSize: 28, fontWeight: '800', color: '#1b1c1c', marginTop: 6 },
  statLabel: { fontSize: 12, color: '#666', marginTop: 2 },

  wideCards: { flexDirection: 'row', gap: 10, paddingHorizontal: 12, marginTop: 10 },
  wideCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    ...Shadows.sm,
  },
  wideValue: { fontSize: 16, fontWeight: '700', color: '#1b1c1c' },
  wideLabel: { fontSize: 11, color: '#666', marginTop: 2 },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1b1c1c',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },

  actions: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 8,
  },
  actionBtn: { flex: 1, alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 12, ...Shadows.sm },
  actionIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff5ee', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  actionLabel: { fontSize: 10, fontWeight: '600', color: '#333', textAlign: 'center' },

  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 6,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#f39c12',
  },
  alertOut:   { borderLeftColor: '#e74c3c' },
  alertName:  { fontSize: 13, color: '#333', flex: 1, marginRight: 8 },
  badge:      { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  badgeLow:   { backgroundColor: '#fff3cd' },
  badgeOut:   { backgroundColor: '#fdecea' },
  badgeText:  { fontSize: 11, fontWeight: '700', color: '#333' },

  saleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 6,
    padding: 12,
    borderRadius: 8,
    ...Shadows.sm,
  },
  saleName:   { fontSize: 13, fontWeight: '600', color: '#333' },
  saleDate:   { fontSize: 11, color: '#999', marginTop: 2 },
  saleAmount: { fontSize: 14, fontWeight: '700', color: Colors.primaryContainer },
});
