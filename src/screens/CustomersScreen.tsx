import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, ActivityIndicator, Alert, RefreshControl,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { customerService, Customer } from '../services/customerService';
import { Colors, Shadows } from '../constants';

export default function CustomersScreen() {
  const navigation = useNavigation<any>();
  const [customers,  setCustomers]  = useState<Customer[]>([]);
  const [filtered,   setFiltered]   = useState<Customer[]>([]);
  const [search,     setSearch]     = useState('');
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const res = await customerService.getAll();
      setCustomers(res);
      setFiltered(res);
    } catch {
      Alert.alert('Error', 'Failed to load customers.');
    } finally {
      setLoading(false); setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleSearch = (text: string) => {
    setSearch(text);
    if (!text.trim()) { setFiltered(customers); return; }
    const lower = text.toLowerCase();
    setFiltered(customers.filter(c =>
      c.name.toLowerCase().includes(lower) ||
      (c.phone && c.phone.includes(text))
    ));
  };

  const handleDelete = (customer: Customer) => {
    Alert.alert('Delete Customer', `Delete "${customer.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          try {
            await customerService.delete(customer.id); load();
          } catch (e: any) {
            Alert.alert('Error', e?.message ?? 'Cannot delete customer.');
          }
        },
      },
    ]);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primaryContainer} /></View>;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Customers</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddCustomer')}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or phone..."
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
      <Text style={styles.count}>{filtered.length} customer{filtered.length !== 1 ? 's' : ''}</Text>

      <FlatList
        data={filtered}
        keyExtractor={item => String(item.id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} colors={[Colors.primaryContainer]} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.customerName}>{item.name}</Text>
              {item.phone ? <Text style={styles.customerPhone}>{item.phone}</Text> : null}
              {item.address ? <Text style={styles.customerAddr} numberOfLines={1}>{item.address}</Text> : null}
            </View>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.navigate('EditCustomer', { customerId: item.id })}
            >
              <Ionicons name="create-outline" size={20} color={Colors.primaryContainer} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.delBtn} onPress={() => handleDelete(item)}>
              <Ionicons name="trash-outline" size={20} color="#E74C3C" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No customers found</Text>
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
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
  title:   { color: '#fff', fontSize: 22, fontWeight: '700' },
  addBtn:  { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },

  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    margin: 12, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, ...Shadows.sm,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  count: { paddingHorizontal: 16, marginBottom: 4, fontSize: 12, color: '#999' },

  card: {
    backgroundColor: '#fff', marginHorizontal: 12, marginBottom: 8,
    borderRadius: 10, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, ...Shadows.sm,
  },
  avatar:      { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primaryContainer + '22', alignItems: 'center', justifyContent: 'center' },
  avatarText:  { fontSize: 18, fontWeight: '700', color: Colors.primaryContainer },
  customerName:{ fontSize: 15, fontWeight: '700', color: '#333' },
  customerPhone:{ fontSize: 12, color: '#666', marginTop: 2 },
  customerAddr: { fontSize: 11, color: '#999', marginTop: 1 },
  editBtn:     { padding: 6, borderRadius: 6, backgroundColor: '#fff5ee', marginLeft: 4 },
  delBtn:      { padding: 6, borderRadius: 6, backgroundColor: '#fdecea' },

  empty:     { alignItems: 'center', paddingTop: 60 },
  emptyText: { color: '#999', marginTop: 8 },
});
