import React, { useEffect } from "react";
import { I18nManager, ActivityIndicator, View } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { initializeSupabase } from "@/services/supabase";

// Set RTL for Arabic
I18nManager.forceRTL(true);

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize Supabase
        initializeSupabase();

        // Check authentication status
        await checkAuth();

        // Hide splash screen after auth check
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error("Failed to initialize app:", error);
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.white} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: COLORS.light,
          },
        }}
      >
        {isAuthenticated ? (
          // Authenticated user - show main app
          <Stack.Screen name="tabs" />
        ) : (
          // Unauthenticated user - show auth screens
          <>
            <Stack.Screen name="index" />
            <Stack.Screen name="auth" />
          </>
        )}
      </Stack>
    </>
  );
}
