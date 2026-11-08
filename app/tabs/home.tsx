import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  COLORS,
  SEMANTIC_COLORS,
  TEXT_STYLES,
  PADDING,
  SPACING,
  BORDER_RADIUS,
  DIMENSIONS,
} from "@/constants";

interface DashboardCard {
  id: string;
  title: string;
  count: number;
  icon: string;
  color: string;
}

const DASHBOARD_CARDS: DashboardCard[] = [
  {
    id: "1",
    title: "أغراضي",
    count: 0,
    icon: "📦",
    color: COLORS.primaryLight,
  },
  {
    id: "2",
    title: "ضمانات",
    count: 0,
    icon: "🛡️",
    color: COLORS.secondaryLight,
  },
  {
    id: "3",
    title: "اشتراكات",
    count: 0,
    icon: "📝",
    color: COLORS.accentLight,
  },
  {
    id: "4",
    title: "أشياء مستعارة",
    count: 0,
    icon: "🤝",
    color: "#E8C9B8",
  },
];

export default function HomeScreen() {
  const renderCard = ({ item }: { item: DashboardCard }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]}>
      <Text style={styles.cardIcon}>{item.icon}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardCount}>{item.count}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>مرحباً بك</Text>
        <Text style={styles.subtitle}>ما آخر ما أضفته؟</Text>
      </View>

      {/* Dashboard Cards */}
      <View style={styles.cardsContainer}>
        <FlatList
          data={DASHBOARD_CARDS}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          scrollEnabled={false}
        />
      </View>

      {/* Recent Items Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>آخر إضافاتك</Text>
          <TouchableOpacity>
            <Text style={styles.viewMore}>عرض الكل</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>لا توجد أغراض بعد</Text>
          <Text style={styles.emptySubtext}>ابدأ بإضافة غرض جديد</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📷</Text>
          <Text style={styles.actionText}>صور فاتورة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>مساعد ذكي</Text>
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
    paddingBottom: SPACING["8"],
  },
  welcomeSection: {
    marginBottom: SPACING["6"],
  },
  greeting: {
    ...TEXT_STYLES.displayMedium,
    color: SEMANTIC_COLORS.onBackground,
    marginBottom: PADDING.sm,
  },
  subtitle: {
    ...TEXT_STYLES.bodyLarge,
    color: SEMANTIC_COLORS.onSurfaceVariant,
  },
  cardsContainer: {
    marginBottom: SPACING["8"],
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: PADDING.md,
  },
  card: {
    flex: 0.48,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: PADDING.lg,
    paddingHorizontal: PADDING.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 140,
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: PADDING.sm,
  },
  cardTitle: {
    ...TEXT_STYLES.bodyMedium,
    color: SEMANTIC_COLORS.onBackground,
    marginBottom: PADDING.xs,
  },
  cardCount: {
    ...TEXT_STYLES.headlineSmall,
    color: COLORS.primary,
    fontWeight: "700",
  },
  section: {
    marginBottom: SPACING["8"],
  },
  sectionHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: PADDING.md,
  },
  sectionTitle: {
    ...TEXT_STYLES.titleLarge,
    color: SEMANTIC_COLORS.onBackground,
    fontWeight: "600",
  },
  viewMore: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.primary,
    fontWeight: "600",
  },
  emptyState: {
    backgroundColor: SEMANTIC_COLORS.surface,
    borderRadius: BORDER_RADIUS.base,
    paddingVertical: SPACING["6"],
    paddingHorizontal: PADDING.md,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: PADDING.md,
  },
  emptyText: {
    ...TEXT_STYLES.bodyMedium,
    color: SEMANTIC_COLORS.onBackground,
    marginBottom: PADDING.xs,
    fontWeight: "500",
  },
  emptySubtext: {
    ...TEXT_STYLES.bodySmall,
    color: SEMANTIC_COLORS.onSurfaceVariant,
  },
  quickActions: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    gap: PADDING.md,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.base,
    paddingVertical: PADDING.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: SEMANTIC_COLORS.border,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: PADDING.sm,
  },
  actionText: {
    ...TEXT_STYLES.labelMedium,
    color: SEMANTIC_COLORS.onBackground,
  },
});
