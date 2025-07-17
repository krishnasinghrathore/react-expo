import { Redirect } from 'expo-router';
import { Platform } from 'react-native';

export default function Index() {
  // Redirect to appropriate interface based on platform
  if (Platform.OS === 'web') {
    return <Redirect href="/(admin)/dashboard" />;
  } else {
    return <Redirect href="/(mobile)/home" />;
  }
}