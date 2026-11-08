import React from "react";
import { Tabs } from "expo-router";
import { COLORS, SEMANTIC_COLORS, TEXT_STYLES } from "@/constants";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: SEMANTIC_COLORS.divider,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          ...TEXT_STYLES.labelSmall,
          marginTop: 4,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          ...TEXT_STYLES.headlineMedium,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "الرئيسية",
          headerTitle: "WAIN",
          tabBarLabel: "الرئيسية",
          // TODO: Add icon
        }}
      />
      <Tabs.Screen
        name="add-item"
        options={{
          title: "إضافة غرض",
          headerTitle: "غرض جديد",
          tabBarLabel: "إضافة",
          // TODO: Add icon
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "البحث",
          headerTitle: "بحث ذكي",
          tabBarLabel: "بحث",
          // TODO: Add icon
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "الملف الشخصي",
          headerTitle: "حسابي",
          tabBarLabel: "حسابي",
          // TODO: Add icon
        }}
      />
    </Tabs>
  );
}
