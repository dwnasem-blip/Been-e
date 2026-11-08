import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import {
  COLORS,
  TEXT_STYLES,
  PADDING,
  SPACING,
  BORDER_RADIUS,
} from "@/constants";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>استعادة كلمة المرور</Text>
        <Text style={styles.subtitle}>
          أدخل بريدك الإلكتروني لاستقبال رابط الاستعادة
        </Text>

        {/* Placeholder content */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            شاشة استعادة كلمة المرور - قيد التطوير
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.buttonText}>العودة لتسجيل الدخول</Text>
        </TouchableOpacity>
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
    paddingTop: SPACING["8"],
  },
  title: {
    ...TEXT_STYLES.displayMedium,
    color: COLORS.black,
    marginBottom: PADDING.sm,
    textAlign: "center",
  },
  subtitle: {
    ...TEXT_STYLES.bodyLarge,
    color: COLORS.darkGray,
    marginBottom: SPACING["8"],
    textAlign: "center",
  },
  placeholder: {
    minHeight: 300,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.base,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: PADDING.xl,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    borderStyle: "dashed",
  },
  placeholderText: {
    ...TEXT_STYLES.bodyMedium,
    color: COLORS.gray,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.base,
    paddingVertical: PADDING.md,
    alignItems: "center",
  },
  buttonText: {
    ...TEXT_STYLES.labelLarge,
    color: COLORS.white,
    fontWeight: "600",
  },
});
