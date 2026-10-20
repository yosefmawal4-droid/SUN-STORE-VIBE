import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { productService, Product } from '../services/productService';
import { Colors, Spacing, Shadows } from '../constants';
import type { ProductsStackParamList } from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<ProductsStackParamList, 'ProductsList'>;

const STATUS_COLOR: Record<string, string> = {
  IN_STOCK:    '#27AE60',
  LOW_STOCK:   '#F39C12',
  OUT_OF_STOCK:'#E74C3C',
};
const STATUS_LABEL: Record<string, string> = {
  IN_STOCK:    'In Stock',
  LOW_STOCK:   'Low Stock',
  OUT_OF_STOCK:'Out of Stock',
};

export default function ProductsListScreen() {
  const navigation = useNavigation<NavProp>();
  const [products,   setProducts]   = useState<Product[]>([]);
  const [filtered,   setFiltered]   = useState<Product[]>([]);
  const [search,     setSearch]     = useState('');
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const res = await productService.getAll();
      setProducts(res);
      setFiltered(res);
    } catch {
      Alert.alert('Error', 'Failed to load products.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleSearch = (text: string) => {
    setSearch(text);
    if (!text.trim()) { setFiltered(products); return; }
    const lower = text.toLowerCase();
    setFiltered(products.filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.categoryName.toLowerCase().includes(lower)
    ));
  };

  const handleDelete = (product: Product) => {
    Alert.alert(
      'Delete Product',
      `Delete "${product.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive',
          onPress: async () => {
            try {
              await productService.delete(product.id);
              load();
            } catch {
              Alert.alert('Error', 'Could not delete product.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primaryContainer} /></View>;
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddProduct')}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
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
        {search !== '' && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.count}>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</Text>

      <FlatList
        data={filtered}
        keyExtractor={item => String(item.id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} colors={[Colors.primaryContainer]} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.categoryName}>{item.categoryName}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLOR[item.stockStatus] + '22' }]}>
                <Text style={[styles.statusText, { color: STATUS_COLOR[item.stockStatus] }]}>
                  {STATUS_LABEL[item.stockStatus]}
                </Text>
              </View>
            </View>
            <View style={styles.cardBottom}>
              <View style={styles.metaItem}>
                <Ionicons name="pricetag" size={14} color="#666" />
                <Text style={styles.metaText}>SAR {item.price.toLocaleString()}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="layers" size={14} color="#666" />
                <Text style={styles.metaText}>Qty: {item.stockQuantity}</Text>
              </View>
              <View style={styles.rowActions}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => navigation.navigate('EditProduct', { productId: item.id })}
                >
                  <Ionicons name="create-outline" size={18} color={Colors.primaryContainer} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.delBtn} onPress={() => handleDelete(item)}>
                  <Ionicons name="trash-outline" size={18} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="cube-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No products found</Text>
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
    paddingTop: 52,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title:  { color: '#fff', fontSize: 22, fontWeight: '700' },
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    ...Shadows.sm,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  count: { paddingHorizontal: 16, marginBottom: 4, fontSize: 12, color: '#999' },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 10,
    padding: 14,
    ...Shadows.sm,
  },
  cardTop:    { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  productName:{ fontSize: 15, fontWeight: '700', color: '#1b1c1c' },
  categoryName:{ fontSize: 12, color: '#888', marginTop: 2 },
  statusBadge:{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: '700' },

  cardBottom: { flexDirection: 'row', alignItems: 'center' },
  metaItem:   { flexDirection: 'row', alignItems: 'center', gap: 4, marginRight: 16 },
  metaText:   { fontSize: 12, color: '#666' },
  rowActions: { marginLeft: 'auto', flexDirection: 'row', gap: 8 },
  editBtn:    { padding: 6, borderRadius: 6, backgroundColor: '#fff5ee' },
  delBtn:     { padding: 6, borderRadius: 6, backgroundColor: '#fdecea' },

  empty:      { alignItems: 'center', paddingTop: 60 },
  emptyText:  { color: '#999', marginTop: 8, fontSize: 14 },
});
