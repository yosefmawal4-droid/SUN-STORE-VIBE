import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { faultCodeService, FaultCode } from '../services/faultCodeService';

export default function FaultDiagnosisScreen() {
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [code, setCode] = useState('');
  const [results, setResults] = useState<FaultCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    faultCodeService.getBrands()
      .then(setBrands)
      .catch(() => setError('تعذّر تحميل الشركات. تأكد أن الـ Backend يعمل.'));
  }, []);

  const chooseBrand = async (value: string) => {
    setBrand(value);
    setModel('');
    setModels([]);
    setResults([]);
    setError('');

    try {
      const data = await faultCodeService.getModels(value);
      setModels(data);
    } catch {
      setError('تعذّر تحميل الموديلات لهذه الشركة.');
    }
  };

  const searchFault = async () => {
    if (!brand || !model || !code.trim()) {
      setError('اختر الشركة والموديل وأدخل رمز العطل.');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const data = await faultCodeService.search({ brand, model, code });
      setResults(data);
      if (data.length === 0) {
        setError('لا يوجد عطل مطابق في قاعدة البيانات حالياً.');
      }
    } catch {
      setError('فشل البحث. تأكد من اتصال التطبيق بالـ API.');
    } finally {
      setLoading(false);
    }
  };

  const Choice = ({
    value,
    selected,
    onPress,
  }: {
    value: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.choice, selected && styles.choiceSelected]}
    >
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="construct-outline" size={30} color="#fff" />
        </View>
        <Text style={styles.title}>تشخيص أعطال الأجهزة</Text>
        <Text style={styles.subtitle}>
          ابحث عن رمز العطل لعرض المعلومات المتوفرة في قاعدة البيانات.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>1. الشركة المصنّعة</Text>
        {brands.length === 0 ? (
          <Text style={styles.muted}>جارٍ تحميل الشركات...</Text>
        ) : (
          <View style={styles.choices}>
            {brands.map((item) => (
              <Choice
                key={item}
                value={item}
                selected={brand === item}
                onPress={() => chooseBrand(item)}
              />
            ))}
          </View>
        )}

        <Text style={styles.label}>2. الموديل</Text>
        {!brand ? (
          <Text style={styles.muted}>اختر الشركة أولاً.</Text>
        ) : models.length === 0 ? (
          <Text style={styles.muted}>لا توجد موديلات متاحة أو تعذّر تحميلها.</Text>
        ) : (
          <View style={styles.choices}>
            {models.map((item) => (
              <Choice
                key={item}
                value={item}
                selected={model === item}
                onPress={() => {
                  setModel(item);
                  setResults([]);
                  setError('');
                }}
              />
            ))}
          </View>
        )}

        <Text style={styles.label}>3. رمز العطل</Text>
        <TextInput
          value={code}
          onChangeText={(value) => {
            setCode(value);
            setError('');
          }}
          placeholder="مثال: W0001"
          autoCapitalize="characters"
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.searchButton, loading && styles.disabled]}
          onPress={searchFault}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="search" size={19} color="#fff" />
              <Text style={styles.searchText}>تشخيص العطل</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {!!error && (
        <View style={styles.message}>
          <Ionicons name="information-circle-outline" size={21} color="#B45309" />
          <Text style={styles.messageText}>{error}</Text>
        </View>
      )}

      {results.map((fault) => (
        <View key={fault.id} style={styles.resultCard}>
          <Text style={styles.resultTitle}>
            {fault.brand} · {fault.model}
          </Text>
          <Text style={styles.code}>رمز العطل: {fault.code}</Text>

          <Text style={styles.sectionTitle}>الوصف</Text>
          <Text style={styles.body}>{fault.description || 'لا يوجد وصف مسجل.'}</Text>

          {!!fault.possibleCauses && (
            <>
              <Text style={styles.sectionTitle}>الأسباب المحتملة</Text>
              <Text style={styles.body}>{fault.possibleCauses}</Text>
            </>
          )}

          {!!fault.recommendedAction && (
            <>
              <Text style={styles.sectionTitle}>الإجراء المقترح</Text>
              <Text style={styles.body}>{fault.recommendedAction}</Text>
            </>
          )}

          {!!fault.safetyWarning && (
            <View style={styles.warning}>
              <Ionicons name="warning-outline" size={22} color="#B91C1C" />
              <View style={styles.warningContent}>
                <Text style={styles.warningTitle}>تحذير السلامة</Text>
                <Text style={styles.body}>{fault.safetyWarning}</Text>
              </View>
            </View>
          )}

          {!!fault.manualReference && (
            <Text style={styles.reference}>
              المرجع: {fault.manualReference}
            </Text>
          )}

          <Text style={styles.verification}>
            {fault.verified ? 'تم التحقق من السجل' : 'هذا السجل غير مؤكد'}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F6FA' },
  content: { paddingBottom: 32 },
  header: {
    backgroundColor: '#F28C28',
    paddingTop: 36,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  headerIcon: {
    width: 54, height: 54, borderRadius: 16,
    backgroundColor: '#FFFFFF30',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  title: { fontSize: 23, fontWeight: '800', color: '#fff' },
  subtitle: { fontSize: 14, color: '#fff', marginTop: 8, lineHeight: 21 },
  card: {
    backgroundColor: '#fff', margin: 16, padding: 16,
    borderRadius: 14, elevation: 2,
  },
  label: { fontSize: 15, fontWeight: '700', color: '#252525', marginTop: 12, marginBottom: 10 },
  muted: { fontSize: 13, color: '#777', marginBottom: 10 },
  choices: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  choice: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 9,
    paddingVertical: 9, paddingHorizontal: 12,
  },
  choiceSelected: { backgroundColor: '#FFF1E2', borderColor: '#F28C28' },
  choiceText: { color: '#444', fontSize: 13 },
  choiceTextSelected: { color: '#B85D00', fontWeight: '700' },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 9,
    paddingHorizontal: 12, paddingVertical: 12, fontSize: 15,
    color: '#222', marginBottom: 16,
  },
  searchButton: {
    backgroundColor: '#F28C28', borderRadius: 10, padding: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  disabled: { opacity: 0.65 },
  searchText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  message: {
    marginHorizontal: 16, marginBottom: 12, padding: 13,
    borderRadius: 10, backgroundColor: '#FFF7E6',
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  messageText: { flex: 1, color: '#92400E', lineHeight: 20 },
  resultCard: {
    backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 16,
    padding: 16, borderRadius: 14, elevation: 2,
  },
  resultTitle: { fontSize: 17, fontWeight: '800', color: '#222' },
  code: { color: '#D97706', fontWeight: '700', marginTop: 6 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#333', marginTop: 18, marginBottom: 6 },
  body: { fontSize: 14, color: '#555', lineHeight: 22 },
  warning: {
    flexDirection: 'row', gap: 10, padding: 12, marginTop: 16,
    borderRadius: 10, backgroundColor: '#FEF2F2',
  },
  warningContent: { flex: 1 },
  warningTitle: { color: '#B91C1C', fontWeight: '800', marginBottom: 5 },
  reference: { fontSize: 12, color: '#777', marginTop: 14 },
  verification: { fontSize: 12, color: '#777', marginTop: 12 },
});
