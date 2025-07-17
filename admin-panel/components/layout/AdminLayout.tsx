import { Platform } from 'react-native';

// Platform-specific imports
let AdminLayoutComponent: any;

if (Platform.OS === 'web') {
  AdminLayoutComponent = require('./AdminLayout.web').AdminLayout;
} else {
  // Mobile fallback - just render children
  AdminLayoutComponent = ({ children }: { children: React.ReactNode }) => children;
}

export const AdminLayout = AdminLayoutComponent;