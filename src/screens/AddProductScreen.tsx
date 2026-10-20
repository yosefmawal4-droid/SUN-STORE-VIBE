import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, ActivityIndicator, Alert, Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { productService, categoryService, Category } from '../services/productService';
import { Colors, Spacing, Layout } from '../constants';
import type { ProductsStackParamList } from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<ProductsStackParamList, 'AddProduct'>;

export default function AddProductScreen() {
  const navigation = useNavigation<NavProp>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading,    setLoading]    = useState(false);
  const [saving,     setSaving]     = useState(false);

  const [name,          setName]          = useState('');
  const [description,   setDescription]   = useState('');
  const [categoryId,    setCategoryId]    = useState<number | null>(null);
  const [price,         setPrice]         = useState('');
  const [costPrice,     setCostPrice]     = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [minimumStock,  setMinimumStock]  = useState('5');
  const [isActive,      setIsActive]      = useState(true);

  useEffect(() => {
    setLoading(true);
    categoryService.getAll()
      .then(res => {
        setCategories(res);
        if (res.length > 0) setCategoryId(res[0].id);
      })
      .catch(() => Alert.alert('Error', 'Failed to load categories.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!name.trim())    return Alert.alert('Validation', 'Product name is required.');
    if (!categoryId)     return Alert.alert('Validation', 'Please select a category.');
    if (!price || isNaN(Number(price)) || Number(price) <= 0)
                         return Alert.alert('Validation', 'Enter a valid price.');
    if (stockQuantity === '' || isNaN(Number(stockQuantity)))
                         return Alert.alert('Validation', 'Enter a valid stock quantity.');

    setSaving(true);
    try {
      await productService.create({
        name:          name.trim(),
        description:   description.trim() || undefined,
        categoryId:    categoryId!,
        price:         Number(price),
        costPrice:     Number(costPrice) || 0,
        stockQuantity: Number(stockQuantity),
        minimumStock:  Number(minimumStock) || 5,
        isActive,
      });
      Alert.alert('Success', 'Product added successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primaryContainer} /></View>;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Product</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        <Field label="Product Name *">
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Monocrystalline Panel 400W" placeholderTextColor="#aaa" />
        </Field>

        <Field label="Description">
          <TextInput style={[styles.input, styles.textarea]} value={description} onChangeText={setDescription} placeholder="Optional description" placeholderTextColor="#aaa" multiline numberOfLines={3} />
        </Field>

        <Field label="Category *">
          <View style={styles.pills}>
            {categories.map(c => (
              <TouchableOpacity
                key={c.id}
                style={[styles.pill, categoryId === c.id && styles.pillActive]}
                onPress={() => setCategoryId(c.id)}
              >
                <Text style={[styles.pillText, categoryId === c.id && styles.pillTextActive]}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Field>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Field label="Price (SAR) *">
              <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="0.00" placeholderTextColor="#aaa" keyboardType="decimal-pad" />
            </Field>
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Field label="Cost Price (SAR)">
              <TextInput style={styles.input} value={costPrice} onChangeText={setCostPrice} placeholder="0.00" placeholderTextColor="#aaa" keyboardType="decimal-pad" />
            </Field>
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Field label="Stock Qty *">
              <TextInput style={styles.input} value={stockQuantity} onChangeText={setStockQuantity} placeholder="0" placeholderTextColor="#aaa" keyboardType="number-pad" />
            </Field>
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Field label="Min. Stock">
              <TextInput style={styles.input} value={minimumStock} onChangeText={setMinimumStock} placeholder="5" placeholderTextColor="#aaa" keyboardType="number-pad" />
            </Field>
          </View>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Active</Text>
          <Switch
            value={isActive}
            onValueChange={setIsActive}
            trackColor={{ false: '#ccc', true: Colors.primaryContainer }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving} activeOpacity={0.85}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save Product</Text>}
        </TouchableOpacity>

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </View>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={fieldStyles.label}>{label}</Text>
      {children}
    </View>
  );
}
const fieldStyles = StyleSheet.create({ label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 5 } });

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F6FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    backgroundColor: Colors.primaryContainer,
    paddingTop: 52,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
  title:   { color: '#fff', fontSize: 20, fontWeight: '700' },

  form: { padding: 16 },
  row:  { flexDirection: 'row' },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  textarea: { minHeight: 72, textAlignVertical: 'top' },

  pills:         { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill:          { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#e8e8e8' },
  pillActive:    { backgroundColor: Colors.primaryContainer },
  pillText:      { fontSize: 12, color: '#555', fontWeight: '600' },
  pillTextActive:{ color: '#fff' },

  switchRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#e0e0e0' },
  switchLabel:{ fontSize: 14, fontWeight: '600', color: '#333' },

  saveBtn:     { backgroundColor: Colors.primaryContainer, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
