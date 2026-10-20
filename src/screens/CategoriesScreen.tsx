import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  Alert, ActivityIndicator, TextInput, Modal, RefreshControl,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { categoryService, Category } from '../services/productService';
import { Colors, Shadows } from '../constants';

export default function CategoriesScreen() {
  const navigation = useNavigation<any>();
  const [categories,  setCategories]  = useState<Category[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [refreshing,  setRefreshing]  = useState(false);
  const [modalVisible,setModalVisible]= useState(false);
  const [editTarget,  setEditTarget]  = useState<Category | null>(null);
  const [nameInput,   setNameInput]   = useState('');
  const [descInput,   setDescInput]   = useState('');
  const [saving,      setSaving]      = useState(false);

  const load = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      setCategories(await categoryService.getAll());
    } catch {
      Alert.alert('Error', 'Failed to load categories.');
    } finally {
      setLoading(false); setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const openAdd = () => {
    setEditTarget(null); setNameInput(''); setDescInput(''); setModalVisible(true);
  };
  const openEdit = (cat: Category) => {
    setEditTarget(cat); setNameInput(cat.name); setDescInput(cat.description ?? ''); setModalVisible(true);
  };

  const handleSave = async () => {
    if (!nameInput.trim()) return Alert.alert('Validation', 'Category name is required.');
    setSaving(true);
    try {
      if (editTarget) {
        await categoryService.update(editTarget.id, { name: nameInput.trim(), description: descInput.trim() || undefined });
      } else {
        await categoryService.create({ name: nameInput.trim(), description: descInput.trim() || undefined });
      }
      setModalVisible(false);
      load();
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Failed to save category.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (cat: Category) => {
    Alert.alert('Delete Category', `Delete "${cat.name}"? This fails if it has products.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          try {
            await categoryService.delete(cat.id); load();
          } catch (e: any) {
            Alert.alert('Error', e?.message ?? 'Cannot delete category.');
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
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        keyExtractor={item => String(item.id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} colors={[Colors.primaryContainer]} />}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <Ionicons name="grid" size={22} color={Colors.primaryContainer} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.catName}>{item.name}</Text>
              <Text style={styles.catDesc}>{item.productCount} product{item.productCount !== 1 ? 's' : ''}</Text>
            </View>
            <TouchableOpacity onPress={() => openEdit(item)} style={styles.iconBtn}>
              <Ionicons name="create-outline" size={20} color={Colors.primaryContainer} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item)} style={styles.iconBtn}>
              <Ionicons name="trash-outline" size={20} color="#E74C3C" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="grid-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No categories yet</Text>
          </View>
        }
      />

      {/* Add/Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{editTarget ? 'Edit Category' : 'New Category'}</Text>
            <Text style={styles.modalLabel}>Name *</Text>
            <TextInput
              style={styles.modalInput}
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Category name"
              placeholderTextColor="#aaa"
              autoFocus
            />
            <Text style={styles.modalLabel}>Description</Text>
            <TextInput
              style={[styles.modalInput, { minHeight: 60, textAlignVertical: 'top' }]}
              value={descInput}
              onChangeText={setDescInput}
              placeholder="Optional"
              placeholderTextColor="#aaa"
              multiline
            />
            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
                {saving ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.saveText}>Save</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

  card:   { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 12, ...Shadows.sm },
  iconBox:{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff5ee', alignItems: 'center', justifyContent: 'center' },
  catName:{ fontSize: 15, fontWeight: '700', color: '#333' },
  catDesc:{ fontSize: 12, color: '#888', marginTop: 2 },
  iconBtn:{ padding: 6 },

  empty:     { alignItems: 'center', paddingTop: 60 },
  emptyText: { color: '#999', marginTop: 8 },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal:   { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 16 },
  modalLabel: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 5 },
  modalInput: { backgroundColor: '#f5f5f5', borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: '#333', marginBottom: 12 },
  modalBtns:  { flexDirection: 'row', gap: 10, marginTop: 8 },
  cancelBtn:  { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', alignItems: 'center' },
  cancelText: { color: '#555', fontWeight: '600' },
  saveBtn:    { flex: 1, padding: 12, borderRadius: 8, backgroundColor: Colors.primaryContainer, alignItems: 'center' },
  saveText:   { color: '#fff', fontWeight: '700' },
});
