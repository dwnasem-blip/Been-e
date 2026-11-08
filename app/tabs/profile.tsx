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
  SEMANTIC_COLORS,
  TEXT_STYLES,
  PADDING,
  SPACING,
  BORDER_RADIUS,
} from "@/constants";

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>ع</Text>
        </View>
        <Text style={styles.userName}>عبد الله</Text>
        <Text style={styles.userEmail}>user@email.com</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>📊</Text>
          <Text style={styles.menuTitle}>الإحصائيات</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>⚙️</Text>
          <Text style={styles.menuTitle}>الإعدادات</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>📚</Text>
          <Text style={styles.menuTitle}>حول التطبيق</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>❓</Text>
          <Text style={styles.menuTitle}>المساعدة والدعم</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>🔐</Text>
          <Text style={styles.menuTitle}>الخصوصية والأمان</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>تسجيل الخروج</Text>
      </TouchableOpacity>
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
    paddingBottom: SPACING["8"],
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: SPACING["8"],
    paddingVertical: SPACING["6"],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: PADDING.md,
  },
  avatarInitial: {
    ...TEXT_STYLES.displayLarge,
    color: COLORS.white,
    fontWeight: "700",
  },
  userName: {
    ...TEXT_STYLES.headlineMedium,
    color: SEMANTIC_COLORS.onBackground,
    marginBottom: PADDING.xs,
    fontWeight: "600",
  },
  userEmail: {
    ...TEXT_STYLES.bodyMedium,
    color: SEMANTIC_COLORS.onSurfaceVariant,
  },
  menuSection: {
    marginBottom: SPACING["8"],
    gap: PADDING.sm,
  },
  menuItem: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.base,
    paddingHorizontal: PADDING.md,
    paddingVertical: PADDING.md,
    flexDirection: "row-reverse",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: SEMANTIC_COLORS.divider,
  },
  menuIcon: {
    fontSize: 24,
    marginHorizontal: PADDING.md,
  },
  menuTitle: {
    ...TEXT_STYLES.bodyMedium,
    color: SEMANTIC_COLORS.onBackground,
    flex: 1,
    fontWeight: "500",
  },
  menuArrow: {
    ...TEXT_STYLES.bodyLarge,
    color: SEMANTIC_COLORS.onSurfaceVariant,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    borderRadius: BORDER_RADIUS.base,
    paddingVertical: PADDING.md,
    alignItems: "center",
  },
  logoutText: {
    ...TEXT_STYLES.labelLarge,
    color: COLORS.white,
    fontWeight: "600",
  },
});
