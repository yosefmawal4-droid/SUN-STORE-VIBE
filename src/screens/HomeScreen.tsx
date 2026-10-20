import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  OrangeGradientHeader,
  SectionHeader,
  StatBadge,
  Card,
  Button,
  Divider,
  AnimatedSection,
} from '../components';
import { Colors, Layout, Spacing, Typography, Shadows } from '../constants';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <OrangeGradientHeader
        title="Sun Power"
        subtitle="طاقة شمسية نقية لمنزلك — توليد وافتراض واستهلاك ذكي."
      />

      <View style={styles.content}>
        <AnimatedSection>
          <SectionHeader
            eyebrow="لماذا سَـن باور"
            heading="نحوّل أشعة الشمس إلى توفير حقيقي"
            sub="حلول طاقة شمسية كاملة: ألواح عالية الكفاءة، عواكس ذكية، وأنظمة مراقبة لحظية لاستثمار يدوم لعقود."
          />
        </AnimatedSection>

        <AnimatedSection delay={120}>
          <View style={[styles.statsRow, isWide && styles.statsRowWide]}>
            <StatBadge target={12000} suffix="+" label="عميل سعيد" />
            <StatBadge target={98} suffix="%" label="توفير بالفاتورة" />
            <StatBadge target={25} suffix="سنة" label="ضمان الأداء" />
          </View>
        </AnimatedSection>

        <AnimatedSection delay={180}>
          <View style={styles.features}>
            <Card
              variant="orange"
              title="نظام كامل متكامل"
              body="من التصميم والتركيب إلى الصيانة، كل شيء تحت سقف واحد."
              icon={<Ionicons name="flash" size={28} color={Colors.onPrimaryContainer} />}
            />
            <View style={{ height: Spacing.md }} />
            <Card
              title="مراقبة ذكية لحظية"
              body="تابع إنتاجك واستهلاكك من تطبيق الهاتف في أي لحظة."
              icon={<Ionicons name="pulse" size={26} color={Colors.primaryContainer} />}
            />
            <View style={{ height: Spacing.md }} />
            <Card
              title="تمويل مرن"
              body="خطط سداد مريحة تناسب ميزانيتك وتصلك فاتورة أخف من الشهر الأول."
              icon={<Ionicons name="card" size={26} color={Colors.primaryContainer} />}
            />
          </View>
        </AnimatedSection>

        <AnimatedSection delay={240}>
          <View style={styles.cta}>
            <Text style={[Typography.headlineLg as object, styles.ctaTitle] as object}>
              جاهز لتحويل أشعة الشمس إلى توفير؟
            </Text>
            <Text style={[Typography.bodyMd as object, styles.ctaSub] as object}>
              احصل على عرض سعر مجاني خلال 24 ساعة.
            </Text>
            <View style={{ height: Spacing.lg }} />
            <Button
              label="اطلب استشارة مجانية"
              variant="primary"
              fullWidth
              onPress={() => {}}
            />
          </View>
        </AnimatedSection>

        <Divider style={{ marginVertical: Spacing.xl }} />

        <AnimatedSection delay={300}>
          <SectionHeader
            align="left"
            eyebrow="خطوات بسيطة"
            heading="كيف نبدأ معاً؟"
          />
          <Card
            numberLabel="01"
            title="استشارة وتصميم"
            body="نزور موقعك، نقيس الاستهلاك، ونصمم نظاماً مخصصاً لاحتياجك."
            variant="flat"
            showAccentLine={false}
          />
          <View style={{ height: Spacing.md }} />
          <Card
            numberLabel="02"
            title="تركيب احترافي"
            body="فريقنا المعتمد يركّب النظام ويضبطه خلال يوم إلى ثلاثة أيام."
            variant="flat"
            showAccentLine={false}
          />
          <View style={{ height: Spacing.md }} />
          <Card
            numberLabel="03"
            title="تشغيل ومتابعة"
            body="نفعّل التطبيق ونبقى معك بالصيانة الدورية على مدار السنة."
            variant="flat"
            showAccentLine={false}
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
  statsRow: {
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  statsRowWide: {
    flexDirection: 'row',
  },
  features: {
    marginBottom: Spacing.xxl,
  },
  cta: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.cardPadding,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    ...Shadows.md,
  },
  ctaTitle: {
    color: Colors.onSurface,
    textAlign: 'center',
  },
  ctaSub: {
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
});