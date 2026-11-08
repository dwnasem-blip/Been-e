import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import {
  COLORS,
  SEMANTIC_COLORS,
  TEXT_STYLES,
  PADDING,
  SPACING,
  BORDER_RADIUS,
  DIMENSIONS,
} from "@/constants";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement Supabase authentication
      // For now, just navigate to tabs
      setTimeout(() => {
        router.replace("/(tabs)");
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError("فشل تسجيل الدخول");
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>مرحباً بعودتك</Text>
          <Text style={styles.subtitle}>سجل دخولك لمتابعة ذاكرتك</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>البريد الإلكتروني</Text>
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              placeholderTextColor={SEMANTIC_COLORS.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>كلمة المرور</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={SEMANTIC_COLORS.placeholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>تسجيل الدخول</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/auth/forgot-password")}>
            <Text style={styles.forgotPassword}>هل نسيت كلمة المرور؟</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>ليس لديك حساب؟ </Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text style={styles.registerLink}>أنشئ واحداً الآن</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  scrollContent: {
    flexGrow: 1,
    padding: PADDING.md,
    justifyContent: "space-between",
  },
  header: {
    marginTop: SPACING["8"],
    marginBottom: SPACING["8"],
    alignItems: "center",
  },
  title: {
    ...TEXT_STYLES.displayMedium,
    color: SEMANTIC_COLORS.onBackground,
    marginBottom: PADDING.sm,
    textAlign: "center",
  },
  subtitle: {
    ...TEXT_STYLES.bodyLarge,
    color: SEMANTIC_COLORS.onSurfaceVariant,
    textAlign: "center",
  },
  form: {
    marginVertical: SPACING["8"],
  },
  inputGroup: {
    marginBottom: PADDING.lg,
  },
  label: {
    ...TEXT_STYLES.labelLarge,
    color: SEMANTIC_COLORS.onBackground,
    marginBottom: PADDING.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: SEMANTIC_COLORS.border,
    borderRadius: BORDER_RADIUS.base,
    paddingHorizontal: PADDING.md,
    paddingVertical: PADDING.md,
    height: DIMENSIONS.inputHeight,
    backgroundColor: SEMANTIC_COLORS.surface,
    color: SEMANTIC_COLORS.onBackground,
    fontSize: 16,
  },
  error: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.error,
    marginBottom: PADDING.md,
    textAlign: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.base,
    height: DIMENSIONS.buttonHeight,
    justifyContent: "center",
    alignItems: "center",
    marginTop: PADDING.lg,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    ...TEXT_STYLES.labelLarge,
    color: COLORS.white,
    fontWeight: "600",
  },
  forgotPassword: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.primary,
    marginTop: PADDING.md,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    marginTop: SPACING["8"],
    marginBottom: SPACING["4"],
  },
  footerText: {
    ...TEXT_STYLES.bodyMedium,
    color: SEMANTIC_COLORS.onSurfaceVariant,
  },
  registerLink: {
    ...TEXT_STYLES.bodyMedium,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
