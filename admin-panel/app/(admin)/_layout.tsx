import { Slot } from 'expo-router';
import { Platform, View } from 'react-native';
import { AdminLayout } from '../../components/layout/AdminLayout';

export default function AdminRootLayout() {
  if (Platform.OS !== 'web') {
    // Redirect mobile users to mobile layout
    return null;
  }

  return (
    <AdminLayout>
      <Slot />
    </AdminLayout>
  );
}