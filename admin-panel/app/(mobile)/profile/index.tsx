import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../../styles/global';

export default function ProfilePage() {
  const profileItems = [
    { icon: 'person-outline', label: 'Personal Information', value: 'Edit' },
    { icon: 'mail-outline', label: 'Email', value: 'john.doe@example.com' },
    { icon: 'call-outline', label: 'Phone', value: '+1 234 567 8900' },
    { icon: 'location-outline', label: 'Location', value: 'New York, USA' },
  ];

  const settingsItems = [
    { icon: 'notifications-outline', label: 'Notifications', hasChevron: true },
    { icon: 'lock-closed-outline', label: 'Security', hasChevron: true },
    { icon: 'color-palette-outline', label: 'Appearance', hasChevron: true },
    { icon: 'help-circle-outline', label: 'Help & Support', hasChevron: true },
    { icon: 'information-circle-outline', label: 'About', hasChevron: true },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.role}>Administrator</Text>
      </View>

      {/* Profile Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        {profileItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.item}>
            <View style={styles.itemLeft}>
              <Ionicons name={item.icon as any} size={24} color={colors.gray[600]} />
              <Text style={styles.itemLabel}>{item.label}</Text>
            </View>
            <Text style={styles.itemValue}>{item.value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {settingsItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.item}>
            <View style={styles.itemLeft}>
              <Ionicons name={item.icon as any} size={24} color={colors.gray[600]} />
              <Text style={styles.itemLabel}>{item.label}</Text>
            </View>
            {item.hasChevron && (
              <Ionicons name="chevron-forward" size={20} color={colors.gray[400]} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color={colors.danger} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  name: {
    ...typography.h2,
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  role: {
    ...typography.body,
    color: colors.gray[600],
  },
  section: {
    backgroundColor: colors.white,
    marginTop: spacing.md,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.dark,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemLabel: {
    ...typography.body,
    color: colors.dark,
    marginLeft: spacing.md,
  },
  itemValue: {
    ...typography.caption,
    color: colors.gray[600],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  logoutText: {
    ...typography.body,
    color: colors.danger,
    marginLeft: spacing.sm,
    fontWeight: '600',
  },
});