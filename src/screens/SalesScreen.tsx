import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { saleService, Sale } from '../services/saleService';
import { Colors, Shadows } from '../constants';
import type { SalesStackParamList } from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<SalesStackParamList, 'SalesList'>;

export default function SalesScreen() {
  const navigation = useNavigation<NavProp>();
  const [sales,      setSales]      = useState<Sale[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      setSales(await saleService.getAll());
    } catch {
      Alert.alert('Error', 'Failed to load sales.');
    } finally {
      setLoading(false); setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const totalRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primaryContainer} /></View>;

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sales</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewSale')}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Summary bar */}
      <View style={styles.summaryBar}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{sales.length}</Text>
          <Text style={styles.summaryLabel}>Total Sales</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>SAR {totalRevenue.toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>Total Revenue</Text>
        </View>
      </View>

      <FlatList
        data={sales}
        keyExtractor={item => String(item.id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} colors={[Colors.primaryContainer]} />}
        contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.saleIcon}>
                <Ionicons name="receipt" size={18} color={Colors.primaryContainer} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.customerName}>{item.customerName}</Text>
                <Text style={styles.saleDate}>{new Date(item.createdAt).toLocaleDateString('en-SA', { year: 'numeric', month: 'short', day: 'numeric' })}</Text>
              </View>
              <Text style={styles.amount}>SAR {item.totalAmount.toLocaleString()}</Text>
            </View>

            {/* Items */}
            {item.items.length > 0 && (
              <View style={styles.itemsBox}>
                {item.items.map(si => (
                  <View key={si.id} style={styles.itemRow}>
                    <Text style={styles.itemName} numberOfLines={1}>{si.productName}</Text>
                    <Text style={styles.itemQty}>×{si.quantity}</Text>
                    <Text style={styles.itemTotal}>SAR {si.totalPrice.toLocaleString()}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No sales yet</Text>
            <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate('NewSale')}>
              <Text style={styles.emptyBtnText}>Create First Sale</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F6FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    backgroundColor: Colors.primaryContainer,
    paddingTop: 52, paddingBottom: 16, paddingHorizontal: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  title:  { color: '#fff', fontSize: 22, fontWeight: '700' },
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },

  summaryBar: { backgroundColor: '#fff', flexDirection: 'row', marginHorizontal: 12, marginTop: 12, borderRadius: 10, padding: 14, ...Shadows.sm },
  summaryItem:    { flex: 1, alignItems: 'center' },
  summaryValue:   { fontSize: 18, fontWeight: '800', color: Colors.primaryContainer },
  summaryLabel:   { fontSize: 11, color: '#888', marginTop: 2 },
  summaryDivider: { width: 1, backgroundColor: '#e0e0e0', marginVertical: 4 },

  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 10, ...Shadows.sm },
  cardHeader:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
  saleIcon:     { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff5ee', alignItems: 'center', justifyContent: 'center' },
  customerName: { fontSize: 14, fontWeight: '700', color: '#333' },
  saleDate:     { fontSize: 11, color: '#999', marginTop: 2 },
  amount:       { fontSize: 16, fontWeight: '800', color: Colors.primaryContainer },

  itemsBox: { marginTop: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 8 },
  itemRow:  { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  itemName: { flex: 1, fontSize: 12, color: '#555' },
  itemQty:  { fontSize: 12, color: '#888', marginHorizontal: 8 },
  itemTotal:{ fontSize: 12, fontWeight: '700', color: '#333' },

  empty:       { alignItems: 'center', paddingTop: 60 },
  emptyText:   { color: '#999', marginTop: 8, fontSize: 14 },
  emptyBtn:    { marginTop: 16, backgroundColor: Colors.primaryContainer, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 },
  emptyBtnText:{ color: '#fff', fontWeight: '700' },
});
