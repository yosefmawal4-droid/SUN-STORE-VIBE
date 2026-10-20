import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, Alert, FlatList, Modal, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { productService, Product } from '../services/productService';
import { customerService, Customer } from '../services/customerService';
import { saleService } from '../services/saleService';
import { Colors, Shadows, Spacing } from '../constants';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function NewSaleScreen() {
  const navigation = useNavigation<any>();

  const [products,   setProducts]   = useState<Product[]>([]);
  const [customers,  setCustomers]  = useState<Customer[]>([]);
  const [loading,    setLoading]    = useState(true);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [cart,             setCart]             = useState<CartItem[]>([]);

  // Modals
  const [showCustomerPicker, setShowCustomerPicker] = useState(false);
  const [showProductPicker,  setShowProductPicker]  = useState(false);
  const [qtyTarget,          setQtyTarget]          = useState<Product | null>(null);
  const [qtyInput,           setQtyInput]           = useState('1');

  const [submitting, setSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [saleSuccess, setSaleSuccess] = useState<string | null>(null);
  const [saleError, setSaleError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([productService.getAll(), customerService.getAll()])
      .then(([prods, custs]) => {
        setProducts(prods.filter(p => p.stockQuantity > 0));
        setCustomers(custs);
      })
      .catch(() => Alert.alert('Error', 'Failed to load data.'))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product: Product, qty: number) => {
    if (qty < 1) return;
    if (qty > product.stockQuantity) {
      return Alert.alert('Insufficient Stock', `Only ${product.stockQuantity} available.`);
    }
    setCart(prev => {
      const existing = prev.find(c => c.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + qty;
        if (newQty > product.stockQuantity) {
          Alert.alert('Insufficient Stock', `Only ${product.stockQuantity} available.`);
          return prev;
        }
        return prev.map(c => c.product.id === product.id ? { ...c, quantity: newQty } : c);
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(c => c.product.id !== productId));
  };

  const updateQty = (productId: number, qty: number) => {
    const item = cart.find(c => c.product.id === productId);
    if (!item) return;
    if (qty < 1) return removeFromCart(productId);
    if (qty > item.product.stockQuantity) {
      return Alert.alert('Insufficient Stock', `Only ${item.product.stockQuantity} available.`);
    }
    setCart(prev => prev.map(c => c.product.id === productId ? { ...c, quantity: qty } : c));
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.product.price * c.quantity, 0);

const handleConfirm = () => {
  if (!selectedCustomer) {
    setSaleError('Please select a customer.');
    return;
  }

  if (cart.length === 0) {
    setSaleError('Add at least one product.');
    return;
  }

  setSaleError(null);
  setShowConfirmModal(true);
};

const submitSale = async () => {
  if (submitting || !selectedCustomer || cart.length === 0) return;

  setSubmitting(true);
  setSaleError(null);

  try {
    const sale = await saleService.create({
      customerId: selectedCustomer.id,
      items: cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    });

    setShowConfirmModal(false);
    setCart([]);

    setSaleSuccess(
      `Sale #${sale.id} completed successfully. Total: SAR ${sale.totalAmount.toLocaleString()}. Stock updated.`
    );

    try {
      const refreshedProducts = await productService.getAll();
      setProducts(refreshedProducts.filter(p => p.stockQuantity > 0));
    } catch (refreshError) {
      if (__DEV__) {
        console.error('Could not refresh products:', refreshError);
      }
    }
  } catch (e: any) {
    if (__DEV__) {
      console.error('[NewSaleScreen] sale submit failed', {
        status: e?.status,
        name: e?.name,
        message: e?.message,
        errors: e?.errors,
      });
    }

    setSaleError(e?.message ?? 'Failed to complete sale.');
  } finally {
    setSubmitting(false);
  }
};

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primaryContainer} /></View>;

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>New Sale</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
                {saleSuccess ? (
          <View style={{
            backgroundColor: '#e8f7ed',
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
          }}>
            <Text style={{ color: '#187640', fontWeight: '700', fontSize: 16 }}>
              Sale Completed
            </Text>

            <Text style={{ color: '#187640', marginTop: 6 }}>
              {saleSuccess}
            </Text>

            <TouchableOpacity
  onPress={() => {
    setSelectedCustomer(null);
    setCart([]);
    setSaleSuccess(null);
    setSaleError(null);
    setShowConfirmModal(false);
    navigation.goBack();
  }}
  style={[styles.addToCartBtn, { marginTop: 12 }]}
>
  <Text style={{ color: '#fff', fontWeight: '700' }}>Done</Text>
</TouchableOpacity>
          </View>
        ) : null}

        {/* Step 1 â€” Customer */}
        <Text style={styles.stepLabel}>â‘  Select Customer</Text>
        <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowCustomerPicker(true)}>
          {selectedCustomer
            ? <>
                <Ionicons name="person" size={18} color={Colors.primaryContainer} />
                <Text style={styles.pickerSelected}>{selectedCustomer.name}</Text>
              </>
            : <>
                <Ionicons name="person-add-outline" size={18} color="#999" />
                <Text style={styles.pickerPlaceholder}>Tap to select customer</Text>
              </>
          }
          <Ionicons name="chevron-down" size={18} color="#999" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        {/* Step 2 â€” Add Products */}
        <Text style={styles.stepLabel}>â‘، Add Products</Text>
        <TouchableOpacity style={styles.addProductBtn} onPress={() => setShowProductPicker(true)}>
          <Ionicons name="add-circle-outline" size={20} color={Colors.primaryContainer} />
          <Text style={styles.addProductText}>Add Product to Cart</Text>
        </TouchableOpacity>

        {/* Cart */}
        {cart.length > 0 && (
          <View style={styles.cartBox}>
            <Text style={styles.cartTitle}>Cart ({cart.length} item{cart.length !== 1 ? 's' : ''})</Text>
            {cart.map(item => (
              <View key={item.product.id} style={styles.cartRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cartItemName} numberOfLines={1}>{item.product.name}</Text>
                  <Text style={styles.cartItemPrice}>SAR {item.product.price.toLocaleString()} each</Text>
                </View>
                {/* Qty controls */}
                <View style={styles.qtyControls}>
                  <TouchableOpacity onPress={() => updateQty(item.product.id, item.quantity - 1)} style={styles.qtyBtn}>
                    <Ionicons name="remove" size={16} color="#333" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => updateQty(item.product.id, item.quantity + 1)} style={styles.qtyBtn}>
                    <Ionicons name="add" size={16} color="#333" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cartItemTotal}>SAR {(item.product.price * item.quantity).toLocaleString()}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.product.id)} style={{ marginLeft: 8 }}>
                  <Ionicons name="trash-outline" size={18} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            ))}
            {/* Total */}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalAmount}>SAR {cartTotal.toLocaleString()}</Text>
            </View>
          </View>
        )}

        {/* Error banner (visible only after a submit attempt has failed) */}
        {saleError ? (
          <View style={{ backgroundColor: '#fee2e2', borderWidth: 1, borderColor: '#fecaca', borderRadius: 10, padding: 12, marginBottom: 16 }}>
            <Text style={{ color: '#b91c1c', fontSize: 14, fontWeight: '600' }}>{saleError}</Text>
          </View>
        ) : null}

                {/* Confirm Button */}
        {!saleSuccess && (
          <TouchableOpacity
            style={[
              styles.confirmBtn,
              (cart.length === 0 || !selectedCustomer) && styles.confirmBtnDisabled,
            ]}
            onPress={handleConfirm}
            disabled={submitting || cart.length === 0 || !selectedCustomer}
            activeOpacity={0.85}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.confirmText}>
                Confirm Sale - SAR {cartTotal.toLocaleString()}
              </Text>
            )}
          </TouchableOpacity>
        )}

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>

      {/* Customer Picker Modal */}
      <Modal visible={showCustomerPicker} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Customer</Text>
              <TouchableOpacity onPress={() => setShowCustomerPicker(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={customers}
              keyExtractor={i => String(i.id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalItem, selectedCustomer?.id === item.id && styles.modalItemActive]}
                  onPress={() => { setSelectedCustomer(item); setShowCustomerPicker(false); }}
                >
                  <Ionicons name="person" size={18} color={selectedCustomer?.id === item.id ? Colors.primaryContainer : '#888'} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={[styles.modalItemText, selectedCustomer?.id === item.id && { color: Colors.primaryContainer }]}>{item.name}</Text>
                    {item.phone ? <Text style={styles.modalItemSub}>{item.phone}</Text> : null}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Product Picker Modal */}
      <Modal visible={showProductPicker} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Product</Text>
              <TouchableOpacity onPress={() => { setShowProductPicker(false); setQtyTarget(null); }}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {qtyTarget ? (
              /* Qty input step */
              <View style={{ padding: 16 }}>
                <Text style={styles.qtyTitle}>{qtyTarget.name}</Text>
                <Text style={styles.qtyStock}>Available: {qtyTarget.stockQuantity} | Price: SAR {qtyTarget.price.toLocaleString()}</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#444', marginTop: 16, marginBottom: 6 }}>Quantity</Text>
                <TextInput
                  style={styles.qtyModalInput}
                  value={qtyInput}
                  onChangeText={setQtyInput}
                  keyboardType="number-pad"
                  autoFocus
                  selectTextOnFocus
                />
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setQtyTarget(null)}>
                    <Text style={{ color: '#555', fontWeight: '600' }}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addToCartBtn}
                    onPress={() => {
                      const qty = parseInt(qtyInput, 10);
                      if (!qty || qty < 1) return Alert.alert('Invalid', 'Enter a valid quantity.');
                      addToCart(qtyTarget, qty);
                      setQtyTarget(null);
                      setQtyInput('1');
                      setShowProductPicker(false);
                    }}
                  >
                    <Text style={{ color: '#fff', fontWeight: '700' }}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <FlatList
                data={products}
                keyExtractor={i => String(i.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => { setQtyTarget(item); setQtyInput('1'); }}
                  >
                    <Ionicons name="cube-outline" size={18} color={Colors.primaryContainer} />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                      <Text style={styles.modalItemText}>{item.name}</Text>
                      <Text style={styles.modalItemSub}>SAR {item.price.toLocaleString()} آ· Stock: {item.stockQuantity}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#ccc" />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
            <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!submitting) setShowConfirmModal(false);
        }}
      >
        <View style={[styles.overlay, { justifyContent: 'center', padding: 20 }]}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 20,
              width: '100%',
              maxWidth: 420,
              alignSelf: 'center',
            }}
          >
            <Text style={styles.modalTitle}>Confirm Sale</Text>

            <Text style={{ color: '#555', marginTop: 12 }}>
              Customer: {selectedCustomer?.name}
            </Text>

            <Text style={{ color: '#333', fontSize: 22, fontWeight: '800', marginTop: 8 }}>
              SAR {cartTotal.toLocaleString()}
            </Text>

            <Text style={{ color: '#777', marginTop: 8 }}>
              This will record the sale and deduct the sold quantities from stock.
            </Text>

            {saleError ? (
              <Text style={{ color: '#D93025', marginTop: 12 }}>
                {saleError}
              </Text>
            ) : null}

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
              <TouchableOpacity
                style={styles.cancelBtn}
                disabled={submitting}
                onPress={() => {
                  setShowConfirmModal(false);
                  setSaleError(null);
                }}
              >
                <Text style={{ color: '#555', fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.addToCartBtn, submitting && { opacity: 0.7 }]}
                disabled={submitting}
                onPress={submitSale}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={{ color: '#fff', fontWeight: '700' }}>
                    Confirm Sale
                  </Text>
                )}
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
  title:   { color: '#fff', fontSize: 20, fontWeight: '700' },

  body: { padding: 16 },

  stepLabel: { fontSize: 13, fontWeight: '700', color: '#888', marginBottom: 8, marginTop: 8, textTransform: 'uppercase', letterSpacing: 0.5 },

  pickerBtn: {
    backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#e0e0e0',
    padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16, ...Shadows.sm,
  },
  pickerSelected:   { flex: 1, fontSize: 14, fontWeight: '600', color: '#333' },
  pickerPlaceholder:{ flex: 1, fontSize: 14, color: '#aaa' },

  addProductBtn: {
    backgroundColor: '#fff5ee', borderRadius: 10, borderWidth: 1, borderColor: Colors.primaryContainer + '44',
    padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16,
  },
  addProductText: { color: Colors.primaryContainer, fontSize: 14, fontWeight: '600' },

  cartBox: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 16, ...Shadows.sm },
  cartTitle:    { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 10 },
  cartRow:      { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  cartItemName: { fontSize: 13, fontWeight: '600', color: '#333' },
  cartItemPrice:{ fontSize: 11, color: '#888', marginTop: 2 },
  cartItemTotal:{ fontSize: 13, fontWeight: '700', color: '#333', marginLeft: 8 },

  qtyControls: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  qtyBtn:  { width: 26, height: 26, borderRadius: 13, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
  qtyText: { fontSize: 14, fontWeight: '700', color: '#333', marginHorizontal: 8, minWidth: 20, textAlign: 'center' },

  totalRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTopWidth: 2, borderTopColor: Colors.primaryContainer + '33' },
  totalLabel: { fontSize: 13, fontWeight: '800', color: '#666', letterSpacing: 1 },
  totalAmount:{ fontSize: 20, fontWeight: '800', color: Colors.primaryContainer },

  confirmBtn: { backgroundColor: Colors.primaryContainer, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  confirmBtnDisabled: { backgroundColor: '#ccc' },
  confirmText:{ color: '#fff', fontSize: 16, fontWeight: '700' },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  modal:   { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '75%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalTitle:  { fontSize: 17, fontWeight: '700', color: '#333' },
  modalItem:   { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  modalItemActive: { backgroundColor: '#fff5ee' },
  modalItemText:   { fontSize: 14, fontWeight: '600', color: '#333' },
  modalItemSub:    { fontSize: 12, color: '#888', marginTop: 2 },

  qtyTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  qtyStock: { fontSize: 13, color: '#888', marginTop: 4 },
  qtyModalInput: { backgroundColor: '#f5f5f5', borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', paddingHorizontal: 16, paddingVertical: 12, fontSize: 24, fontWeight: '700', textAlign: 'center', color: '#333' },
  cancelBtn:    { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', alignItems: 'center' },
  addToCartBtn: { flex: 1, padding: 12, borderRadius: 8, backgroundColor: Colors.primaryContainer, alignItems: 'center' },
});

