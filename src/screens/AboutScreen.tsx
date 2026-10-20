import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  OrangeGradientHeader,
  SectionHeader,
  Card,
  Button,
  AnimatedSection,
  Divider,
} from '../components';
import { Colors, Layout, Spacing, Typography } from '../constants';
import { useAuth } from '../context/AuthContext';

const contact = [
  {
    icon: 'call' as const,
    label: 'الهاتف',
    value: '+966 55 000 0000',
  },
  {
    icon: 'mail' as const,
    label: 'البريد الإلكتروني',
    value: 'info@sunpower.app',
  },
  {
    icon: 'location' as const,
    label: 'الموقع',
    value: 'الرياض، طريق الملك فهد، برج الطاقة',
  },
];

export default function AboutScreen() {
  const { user, logout } = useAuth();
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <OrangeGradientHeader
        title="من نحن"
        subtitle="أكثر من عقد في بناء مستقبل طاقة نظيفة وموثوقة."
      />

      <View style={styles.content}>
        <AnimatedSection>
          <SectionHeader
            align="left"
            eyebrow="قصتنا"
            heading="طاقة نظيفة تصل للجميع"
          />
          <Card
            title="رؤيتنا"
            body="أن يكون لكل منزل في المنطقة مصدر طاقة شمسية يوفّر المال ويحمي البيئة."
            variant="flat"
            showAccentLine={false}
            icon={<Ionicons name="eye" size={26} color={Colors.primaryContainer} />}
          />
          <View style={{ height: Spacing.md }} />
          <Card
            title="التزامنا"
            body="منتجات معتمدة، تركيب هندسي دقيق، ودعم ما بعد البيع على مدار السنة."
            variant="flat"
            showAccentLine={false}
            icon={<Ionicons name="shield-checkmark" size={26} color={Colors.primaryContainer} />}
          />
        </AnimatedSection>

        <AnimatedSection delay={120}>
          <SectionHeader
            align="left"
            eyebrow="تواصل معنا"
            heading="يسعدنا سماعك"
          />
          {contact.map((c, i) => (
            <View key={c.label}>
              <View style={styles.contactRow}>
                <View style={styles.contactIcon}>
                  <Ionicons name={c.icon} size={22} color={Colors.primaryContainer} />
                </View>
                <View>
                  <Text style={[Typography.labelCaps as object, styles.contactLabel] as object}>
                    {c.label}
                  </Text>
                  <Text style={[Typography.bodyMd as object, styles.contactValue] as object}>
                    {c.value}
                  </Text>
                </View>
              </View>
              {i < contact.length - 1 && <View style={{ height: Spacing.md }} />}
            </View>
          ))}
          <View style={{ height: Spacing.xl }} />
          <Button label="أرسل رسالة الآن" variant="primary" fullWidth onPress={() => {}} />
        </AnimatedSection>

        {/* ── Account section ── */}
        <AnimatedSection delay={240}>
          <Divider style={{ marginVertical: Spacing.xl }} />
          <SectionHeader
            align="left"
            eyebrow="الحساب"
            heading={user ? `مرحباً، ${user.fullName}` : 'حسابك'}
          />
          {user && (
            <Text style={styles.userEmail}>{user.email}</Text>
          )}
          <View style={{ height: Spacing.md }} />
          <Button
            label="تسجيل الخروج"
            variant="dark"
            fullWidth
            onPress={logout}
          />
        </AnimatedSection>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingVertical: Layout.screenPaddingV,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  contactIcon: {
    width: 44,
    height: 44,
    borderRadius: Layout.borderRadius.sm,
    backgroundColor: Colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: {
    color: Colors.onSurfaceVariant,
  },
  contactValue: {
    color: Colors.onSurface,
    marginTop: 2,
  },
  userEmail: {
    ...(Typography.bodyMd as object),
    color: Colors.onSurfaceVariant,
    marginTop: -Spacing.sm,
    marginBottom: Spacing.xs,
  } as object,
});