import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants';

// Screens
import DashboardScreen    from '../screens/DashboardScreen';
import ProductsListScreen from '../screens/ProductsListScreen';
import AddProductScreen   from '../screens/AddProductScreen';
import EditProductScreen  from '../screens/EditProductScreen';
import CategoriesScreen   from '../screens/CategoriesScreen';
import CustomersScreen    from '../screens/CustomersScreen';
import AddCustomerScreen  from '../screens/AddCustomerScreen';
import EditCustomerScreen from '../screens/EditCustomerScreen';
import SalesScreen        from '../screens/SalesScreen';
import NewSaleScreen      from '../screens/NewSaleScreen';
import InventoryScreen    from '../screens/InventoryScreen';
import ProfileScreen      from '../screens/ProfileScreen';
import FaultDiagnosisScreen from '../screens/FaultDiagnosisScreen';


// ── Stack Param Lists ──────────────────────────────────────────────────────

export type ProductsStackParamList = {
  ProductsList: undefined;
  AddProduct:   undefined;
  EditProduct:  { productId: number };
};

export type CustomersStackParamList = {
  CustomersList: undefined;
  AddCustomer:   undefined;
  EditCustomer:  { customerId: number };
};

export type SalesStackParamList = {
  SalesList: undefined;
  NewSale:   undefined;
};

export type RootTabParamList = {
  Dashboard:  undefined;
  Products:   undefined;
  Sales:      undefined;
  Inventory:  undefined;
  More:       undefined;
};

// ── Stack Navigators ───────────────────────────────────────────────────────

const ProductStack = createNativeStackNavigator<ProductsStackParamList>();
function ProductsStack() {
  return (
    <ProductStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductStack.Screen name="ProductsList" component={ProductsListScreen} />
      <ProductStack.Screen name="AddProduct"   component={AddProductScreen} />
      <ProductStack.Screen name="EditProduct"  component={EditProductScreen} />
    </ProductStack.Navigator>
  );
}

const CustomerStack = createNativeStackNavigator<CustomersStackParamList>();
function CustomersStack() {
  return (
    <CustomerStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomerStack.Screen name="CustomersList" component={CustomersScreen} />
      <CustomerStack.Screen name="AddCustomer"   component={AddCustomerScreen} />
      <CustomerStack.Screen name="EditCustomer"  component={EditCustomerScreen} />
    </CustomerStack.Navigator>
  );
}

const SaleStack = createNativeStackNavigator<SalesStackParamList>();
function SalesStack() {
  return (
    <SaleStack.Navigator screenOptions={{ headerShown: false }}>
      <SaleStack.Screen name="SalesList" component={SalesScreen} />
      <SaleStack.Screen name="NewSale"   component={NewSaleScreen} />
    </SaleStack.Navigator>
  );
}

// More tab — shows Customers, Categories, Profile
export type MoreStackParamList = {
  MoreHome:    undefined;
  Customers:   undefined;
  AddCustomer: undefined;
  EditCustomer: { customerId: number };
  Categories:  undefined;
     FaultDiagnosis: undefined;
  Profile:     undefined;
};

const MoreStack = createNativeStackNavigator<MoreStackParamList>();
function MoreNavigator() {
  return (
    <MoreStack.Navigator screenOptions={{ headerShown: false }}>
      <MoreStack.Screen name="MoreHome"    component={ProfileScreen} />
      <MoreStack.Screen name="Customers"   component={CustomersScreen} />
      <MoreStack.Screen name="AddCustomer" component={AddCustomerScreen} />
      <MoreStack.Screen name="EditCustomer" component={EditCustomerScreen} />
      <MoreStack.Screen name="Categories"  component={CategoriesScreen} />
<MoreStack.Screen name="FaultDiagnosis" component={FaultDiagnosisScreen} />
    </MoreStack.Navigator>
  );
}

// ── Bottom Tab Navigator ───────────────────────────────────────────────────

const Tab = createBottomTabNavigator<RootTabParamList>();

type IoniconName = keyof typeof Ionicons.glyphMap;

const tabIcons: Record<keyof RootTabParamList, IoniconName> = {
  Dashboard: 'speedometer',
  Products:  'cube',
  Sales:     'cart',
  Inventory: 'layers',
  More:      'menu',
};

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor:   Colors.primaryContainer,
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor:  Colors.outlineVariant,
          height: 60,
          paddingBottom: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600' as const,
        },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={tabIcons[route.name]}
            size={focused ? size + 2 : size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen}  options={{ tabBarLabel: 'Dashboard' }} />
      <Tab.Screen name="Products"  component={ProductsStack}    options={{ tabBarLabel: 'Products' }} />
      <Tab.Screen name="Sales"     component={SalesStack}       options={{ tabBarLabel: 'Sales' }} />
      <Tab.Screen name="Inventory" component={InventoryScreen}  options={{ tabBarLabel: 'Inventory' }} />
      <Tab.Screen name="More"      component={MoreNavigator}    options={{ tabBarLabel: 'More' }} />
    </Tab.Navigator>
  );
}
