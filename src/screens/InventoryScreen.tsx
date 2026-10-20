import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, RefreshControl, TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { productService, Product } from '../services/productService';
import { Colors, Shadows } from '../constants';

const STATUS_CONFIG = {
  IN_STOCK:     { label: 'IN STOCK',    bg: '#e8f8ef', color: '#27AE60' },
  LOW_STOCK:    { label: 'LOW STOCK',   bg: '#fff7e6', color: '#F39C12' },
  OUT_OF_STOCK: { label: 'OUT OF STOCK',bg: '#fdecea', color: '#E74C3C' },
};

type FilterKey = 'ALL' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'IN_STOCK';

export default function InventoryScreen() {
  const [products,   setProducts]   = useState<Product[]>([]);
  const [filtered,   setFiltered]   = useState<Product[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search,     setSearch]     = useState('');
  const [filter,     setFilter]     = useState<FilterKey>('ALL');

  const load = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const res = await productService.getAll();
      setProducts(res);
      applyFilter(res, filter, search);
    } catch {
      // silent
    } finally {
      setLoading(false); setRefreshing(false);
    }
  }, [filter, search]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const applyFilter = (prods: Product[], f: FilterKey, s: string) => {
    let result = prods;
    if (f !== 'ALL') result = result.filter(p => p.stockStatus === f);
    if (s.trim()) result = result.filter(p => p.name.toLowerCase().includes(s.toLowerCase()) || p.categoryName.toLowerCase().includes(s.toLowerCase()));
    setFiltered(result);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    applyFilter(products, filter, text);
  };

  const handleFilter = (f: FilterKey) => {
    setFilter(f);
    applyFilter(products, f, search);
  };

  const counts = {
    ALL:          products.length,
    IN_STOCK:     products.filter(p => p.stockStatus === 'IN_STOCK').length,
    LOW_STOCK:    products.filter(p => p.stockStatus === 'LOW_STOCK').length,
    OUT_OF_STOCK: products.filter(p => p.stockStatus === 'OUT_OF_STOCK').length,
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primaryContainer} /></View>;

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Inventory</Text>
        <Text style={styles.subtitle}>{products.length} products</Text>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {(['ALL', 'IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'] as FilterKey[]).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => handleFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'ALL' ? `All (${counts.ALL})` :
               f === 'IN_STOCK' ? `OK (${counts.IN_STOCK})` :
               f === 'LOW_STOCK' ? `Low (${counts.LOW_STOCK})` :
               `Out (${counts.OUT_OF_STOCK})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => String(item.id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} colors={[Colors.primaryContainer]} />}
        contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
        renderItem={({ item }) => {
          const cfg = STATUS_CONFIG[item.stockStatus as keyof typeof STATUS_CONFIG];
          return (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.categoryName}>{item.categoryName}</Text>
              </View>
              <View style={styles.stockInfo}>
                <Text style={styles.stockQty}>{item.stockQuantity}</Text>
                <Text style={styles.stockMin}>min: {item.minimumStock}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
                <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="layers-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No products match</Text>
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
  },
  title:    { color: '#fff', fontSize: 22, fontWeight: '700' },
  subtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },

  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    margin: 12, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, ...Shadows.sm,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },

  filterRow: { flexDirection: 'row', paddingHorizontal: 12, gap: 6, marginBottom: 4 },
  filterTab: { flex: 1, paddingVertical: 6, borderRadius: 8, backgroundColor: '#e8e8e8', alignItems: 'center' },
  filterTabActive: { backgroundColor: Colors.primaryContainer },
  filterText:      { fontSize: 10, fontWeight: '700', color: '#666' },
  filterTextActive:{ color: '#fff' },

  card: {
    backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 8,
    flexDirection: 'row', alignItems: 'center', gap: 10, ...Shadows.sm,
  },
  productName:  { fontSize: 14, fontWeight: '700', color: '#333' },
  categoryName: { fontSize: 11, color: '#888', marginTop: 2 },
  stockInfo:    { alignItems: 'center', marginRight: 8 },
  stockQty:     { fontSize: 20, fontWeight: '800', color: '#333' },
  stockMin:     { fontSize: 10, color: '#aaa' },
  badge:        { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  badgeText:    { fontSize: 10, fontWeight: '800' },

  empty:     { alignItems: 'center', paddingTop: 60 },
  emptyText: { color: '#999', marginTop: 8 },
});
