import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
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

export default function SearchScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>بحث ذكي</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="أين وضعت...؟"
          placeholderTextColor={SEMANTIC_COLORS.placeholder}
        />

        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>اقتراحات للبحث:</Text>

          <View style={styles.suggestions}>
            {[
              "أين وضعت جواز السفر؟",
              "متى اشتريت الهاتف؟",
              "كم دفعت مقابل السماعات؟",
              "ما الأشياء المستعارة؟",
            ].map((suggestion, index) => (
              <View key={index} style={styles.suggestion}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyText}>ابدأ البحث عن أغراضك</Text>
          <Text style={styles.emptySubtext}>
            استخدم لغة طبيعية للبحث عن أي شيء
          </Text>
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
    paddingTop: SPACING["4"],
  },
  title: {
    ...TEXT_STYLES.headlineLarge,
    color: COLORS.black,
    marginBottom: PADDING.lg,
    textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: SEMANTIC_COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: PADDING.md,
    paddingVertical: PADDING.md,
    height: DIMENSIONS.inputHeight,
    backgroundColor: SEMANTIC_COLORS.surface,
    color: SEMANTIC_COLORS.onBackground,
    fontSize: 16,
    marginBottom: SPACING["6"],
    textAlign: "right",
  },
  suggestionsContainer: {
    marginBottom: SPACING["8"],
  },
  suggestionsTitle: {
    ...TEXT_STYLES.labelLarge,
    color: SEMANTIC_COLORS.onBackground,
    marginBottom: PADDING.md,
  },
  suggestions: {
    gap: PADDING.sm,
  },
  suggestion: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.base,
    paddingHorizontal: PADDING.md,
    paddingVertical: PADDING.sm,
    borderWidth: 1,
    borderColor: SEMANTIC_COLORS.border,
  },
  suggestionText: {
    ...TEXT_STYLES.bodySmall,
    color: SEMANTIC_COLORS.onBackground,
    textAlign: "right",
  },
  emptyState: {
    alignItems: "center",
    marginTop: SPACING["8"],
  },
  emptyIcon: {
    fontSize: 64,
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
});
