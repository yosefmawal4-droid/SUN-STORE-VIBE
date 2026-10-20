import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  OrangeGradientHeader,
  SectionHeader,
  Card,
  Button,
  Divider,
  AnimatedSection,
} from '../components';
import { Colors, Layout, Spacing } from '../constants';

const products = [
  {
    title: 'الألواح الشمسية المونو',
    body: 'كفاءة تحويل 22% وأداء ثابت حتى تحت التغيّم — مصنوعة من السيليكون النقي.',
    icon: 'sunny' as const,
  },
  {
    title: 'العواكس الذكية',
    body: 'تحويل مباشر للتيار وربط ذكي بالتطبيق لمراقبة الإنتاج لحظة بلحظة.',
    icon: 'sync' as const,
  },
  {
    title: 'بطاريات التخزين',
    body: 'خزّن فائض الإنتاج واستخدمه ليلاً، مع دورة حياة تتجاوز 6000 دورة.',
    icon: 'battery-charging' as const,
  },
  {
    title: 'منظّمات الشحن MPPT',
    body: 'استخلاص أقصى طاقة من الألواح في كل الظروف المناخية.',
    icon: 'speedometer' as const,
  },
  {
    title: 'البنية التحتية والكابلات',
    body: 'مكوّنات معتمدة IPA بجودة عالية لتركيب آمن يدوم طويلاً.',
    icon: 'git-network' as const,
  },
];

export default function ProductsScreen() {
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <OrangeGradientHeader
        title="منتجاتنا"
        subtitle="معدّات معتمدة من كبرى الشركات العالمية مع ضمان يصل إلى 25 سنة."
      />

      <View style={styles.content}>
        <AnimatedSection>
          <SectionHeader
            align="left"
            eyebrow="الفئات"
            heading="كل ما يحتاجه نظامك الشمسي"
          />
        </AnimatedSection>

        {products.map((p, i) => (
          <AnimatedSection key={p.title} delay={i * 80}>
            <Card
              title={p.title}
              body={p.body}
              variant="flat"
              icon={<Ionicons name={p.icon} size={26} color={Colors.primaryContainer} />}
            />
            {i < products.length - 1 && <View style={{ height: Spacing.md }} />}
          </AnimatedSection>
        ))}

        <AnimatedSection delay={products.length * 80}>
          <Divider style={{ marginVertical: Spacing.xl }} />
          <SectionHeader
            eyebrow="لا تجد ما تبحث عنه؟"
            heading="اطلب عرض سعر مخصص"
          />
          <Button label="تحدّث مع فريق المبيعات" variant="dark" fullWidth onPress={() => {}} />
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
});