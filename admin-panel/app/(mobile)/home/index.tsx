import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function MobileHomePage() {
  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$45,320',
      change: '+24%',
      icon: 'cash-outline',
      gradient: ['#4F46E5', '#7C3AED'],
    },
    {
      title: 'Orders',
      value: '152',
      change: '+52%',
      icon: 'cart-outline',
      gradient: ['#EC4899', '#F59E0B'],
    },
    {
      title: 'Customers',
      value: '1,352',
      change: '-2%',
      icon: 'people-outline',
      gradient: ['#10B981', '#14B8A6'],
    },
    {
      title: 'Products',
      value: '85',
      change: '+12%',
      icon: 'cube-outline',
      gradient: ['#F59E0B', '#EF4444'],
    },
  ];

  const quickActions = [
    { title: 'Add Product', icon: 'add-circle-outline', color: '#4F46E5' },
    { title: 'View Orders', icon: 'list-outline', color: '#EC4899' },
    { title: 'Analytics', icon: 'analytics-outline', color: '#10B981' },
    { title: 'Settings', icon: 'settings-outline', color: '#F59E0B' },
  ];

  const recentActivity = [
    { id: 1, text: 'New order #1234 received', time: '5 min ago', icon: 'cart' },
    { id: 2, text: 'Customer John Doe registered', time: '15 min ago', icon: 'person-add' },
    { id: 3, text: 'Product "iPhone 13" updated', time: '1 hour ago', icon: 'create' },
    { id: 4, text: 'Payment received from Order #1233', time: '2 hours ago', icon: 'cash' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.subtitle}>Here's your business overview</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          {statsCards.map((card, index) => (
            <TouchableOpacity key={index} style={styles.statCard}>
              <LinearGradient
                colors={card.gradient}
                style={styles.statCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name={card.icon as any} size={24} color="#fff" />
                <Text style={styles.statTitle}>{card.title}</Text>
                <Text style={styles.statValue}>{card.value}</Text>
                <Text style={[
                  styles.statChange,
                  { color: card.change.startsWith('+') ? '#10B981' : '#EF4444' }
                ]}>
                  {card.change}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickAction}>
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                  <Ionicons name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name={activity.icon as any} size={20} color="#6B7280" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{activity.text}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
  },
  statCardGradient: {
    padding: 16,
    borderRadius: 16,
    height: 120,
    justifyContent: 'space-between',
  },
  statTitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    width: (width - 60) / 4,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  activityList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});