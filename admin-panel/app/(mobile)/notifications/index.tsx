import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../../styles/global';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'user' | 'system' | 'alert';
  isRead: boolean;
}

export default function NotificationsPage() {
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #1234 has been placed by John Doe',
      time: '5 minutes ago',
      type: 'order',
      isRead: false,
    },
    {
      id: '2',
      title: 'User Registration',
      message: 'A new user has registered: jane.smith@example.com',
      time: '1 hour ago',
      type: 'user',
      isRead: false,
    },
    {
      id: '3',
      title: 'System Update',
      message: 'System maintenance scheduled for tonight at 2 AM',
      time: '3 hours ago',
      type: 'system',
      isRead: true,
    },
    {
      id: '4',
      title: 'Low Stock Alert',
      message: 'Product "iPhone 13" is running low on stock',
      time: '5 hours ago',
      type: 'alert',
      isRead: true,
    },
    {
      id: '5',
      title: 'Payment Received',
      message: 'Payment of $250.75 received for Order #1233',
      time: 'Yesterday',
      type: 'order',
      isRead: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return 'cart';
      case 'user':
        return 'person-add';
      case 'system':
        return 'settings';
      case 'alert':
        return 'warning';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return colors.primary;
      case 'user':
        return colors.success;
      case 'system':
        return colors.info;
      case 'alert':
        return colors.warning;
      default:
        return colors.gray[600];
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity style={[styles.notificationItem, !item.isRead && styles.unreadItem]}>
      <View style={[styles.iconContainer, { backgroundColor: `${getNotificationColor(item.type)}20` }]}>
        <Ionicons name={getNotificationIcon(item.type) as any} size={24} color={getNotificationColor(item.type)} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, !item.isRead && styles.unreadTitle]}>{item.title}</Text>
        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerTitle: {
    ...typography.h3,
    color: colors.dark,
  },
  markAllRead: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  listContainer: {
    paddingVertical: spacing.sm,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    position: 'relative',
  },
  unreadItem: {
    backgroundColor: '#F0F9FF',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    ...typography.body,
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  message: {
    ...typography.caption,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  time: {
    ...typography.small,
    color: colors.gray[500],
  },
  unreadDot: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.lg,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray[200],
  },
});