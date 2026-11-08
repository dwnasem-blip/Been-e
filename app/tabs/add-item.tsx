import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  COLORS,
  TEXT_STYLES,
  PADDING,
  SPACING,
  BORDER_RADIUS,
} from "@/constants";

export default function AddItemScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>إضافة غرض جديد</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionIcon}>📷</Text>
            <Text style={styles.optionTitle}>التقط صورة</Text>
            <Text style={styles.optionSubtitle}>
              استخدم الكاميرا لتصوير الغرض
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionIcon}>🖼️</Text>
            <Text style={styles.optionTitle}>اختر من المعرض</Text>
            <Text style={styles.optionSubtitle}>اختر صورة من هاتفك</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionIcon}>📝</Text>
            <Text style={styles.optionTitle}>إضافة يدوية</Text>
            <Text style={styles.optionSubtitle}>أدخل التفاصيل يدوياً</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionIcon}>📄</Text>
            <Text style={styles.optionTitle}>صورة فاتورة</Text>
            <Text style={styles.optionSubtitle}>
              استخرج البيانات من فاتورة
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  content: {
    padding: PADDING.md,
    paddingTop: SPACING["6"],
  },
  title: {
    ...TEXT_STYLES.headlineLarge,
    color: COLORS.black,
    marginBottom: SPACING["6"],
    textAlign: "center",
  },
  optionsContainer: {
    gap: PADDING.md,
  },
  option: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.base,
    padding: PADDING.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  optionIcon: {
    fontSize: 48,
    marginBottom: PADDING.md,
  },
  optionTitle: {
    ...TEXT_STYLES.bodyMedium,
    color: COLORS.black,
    fontWeight: "600",
    marginBottom: PADDING.xs,
  },
  optionSubtitle: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.darkGray,
    textAlign: "center",
  },
});
