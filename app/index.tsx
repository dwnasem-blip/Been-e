import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SEMANTIC_COLORS, TEXT_STYLES, PADDING } from "@/constants";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user is authenticated
      // For now, redirect to onboarding
      router.replace("/auth/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.appName}>WAIN</Text>
        <Text style={styles.appNameAr}>وين راح؟</Text>
        <Text style={styles.tagline}>ذاكرتك الشخصية الذكية</Text>
      </View>
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: PADDING.md,
  },
  content: {
    alignItems: "center",
    marginBottom: 40,
  },
  appName: {
    ...TEXT_STYLES.displayLarge,
    color: COLORS.white,
    marginBottom: PADDING.sm,
    fontWeight: "700",
  },
  appNameAr: {
    ...TEXT_STYLES.headlineLarge,
    color: COLORS.primaryLight,
    marginBottom: PADDING.md,
    fontWeight: "600",
  },
  tagline: {
    ...TEXT_STYLES.bodyLarge,
    color: COLORS.lightGray,
    textAlign: "center",
  },
  loader: {
    marginTop: PADDING.xl,
  },
});
