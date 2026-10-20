import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { customerService } from '../services/customerService';
import { Colors, Spacing } from '../constants';

export default function AddCustomerScreen() {
  const navigation = useNavigation<any>();
  const [name,    setName]    = useState('');
  const [phone,   setPhone]   = useState('');
  const [address, setAddress] = useState('');
  const [notes,   setNotes]   = useState('');
  const [saving,  setSaving]  = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return Alert.alert('Validation', 'Customer name is required.');
    setSaving(true);
    try {
      await customerService.create({
        name:    name.trim(),
        phone:   phone.trim() || undefined,
        address: address.trim() || undefined,
        notes:   notes.trim() || undefined,
      });
      Alert.alert('Success', 'Customer added!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Failed to save customer.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Customer</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        {[
          { label: 'Name *',    value: name,    set: setName,    placeholder: 'Full name',            keyboard: 'default' as const },
          { label: 'Phone',     value: phone,   set: setPhone,   placeholder: '+966 5x xxx xxxx',     keyboard: 'phone-pad' as const },
          { label: 'Address',   value: address, set: setAddress, placeholder: 'City, district',       keyboard: 'default' as const },
        ].map(field => (
          <View key={field.label} style={{ marginBottom: 14 }}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.set}
              placeholder={field.placeholder}
              placeholderTextColor="#aaa"
              keyboardType={field.keyboard}
            />
          </View>
        ))}

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Any additional notes..."
          placeholderTextColor="#aaa"
          multiline
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving} activeOpacity={0.85}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save Customer</Text>}
        </TouchableOpacity>
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F6FA' },
  header: {
    backgroundColor: Colors.primaryContainer,
    paddingTop: 52, paddingBottom: 16, paddingHorizontal: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  backBtn:     { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
  title:       { color: '#fff', fontSize: 20, fontWeight: '700' },
  form:        { padding: 16 },
  label:       { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 5 },
  input:       { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: '#333', marginBottom: 0 },
  saveBtn:     { backgroundColor: Colors.primaryContainer, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
