# React Expo Cross-Platform Admin Panel

A modern, responsive admin panel built with React Native Expo that works seamlessly on both web and mobile platforms. Inspired by PrimeReact's Ultima template, this project demonstrates how to create a unified codebase for administrative interfaces across different platforms.

## 🚀 Features

### Web Admin Panel
- **Modern Dashboard** with statistics cards, charts, and recent activity
- **User Management** with advanced DataTable, filtering, and CRUD operations
- **Responsive Sidebar Navigation** with collapsible menu
- **PrimeReact Components** for professional UI elements
- **Real-time Charts** using Chart.js integration
- **Advanced Data Tables** with sorting, filtering, and pagination

### Mobile Admin App
- **Native Mobile Experience** with bottom tab navigation
- **Dashboard Overview** with gradient cards and quick actions
- **Profile Management** with settings and preferences
- **Push Notifications** interface with unread indicators
- **Native Gestures** and animations for smooth UX
- **Optimized Performance** for mobile devices

## 📁 Project Structure

```
admin-panel/
├── app/                      # Expo Router pages
│   ├── (admin)/             # Web-focused admin routes
│   │   ├── dashboard/       # Dashboard with charts and stats
│   │   ├── users/          # User management
│   │   ├── products/       # Product management
│   │   ├── orders/         # Order management
│   │   ├── analytics/      # Analytics dashboard
│   │   ├── reports/        # Reports section
│   │   └── settings/       # Settings page
│   ├── (mobile)/           # Mobile-specific routes
│   │   ├── home/          # Mobile dashboard
│   │   ├── profile/       # User profile
│   │   └── notifications/ # Notifications center
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Entry point with platform detection
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   │   └── AdminLayout.tsx
│   ├── ui/              # UI components
│   ├── charts/          # Chart components
│   └── shared/          # Shared components
├── styles/              # Global styles
│   └── global.ts        # Theme configuration
├── hooks/               # Custom hooks
├── services/            # API services
├── utils/               # Utility functions
└── types/               # TypeScript definitions
```

## 🛠️ Technology Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and toolchain
- **Expo Router** - File-based routing
- **TypeScript** - Type safety and better DX
- **PrimeReact** - Professional UI components for web
- **PrimeFlex** - CSS utility library
- **Chart.js** - Data visualization
- **React Native Safe Area Context** - Handle device safe areas
- **Expo Linear Gradient** - Beautiful gradients for mobile

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd admin-panel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## 🚀 Running the App

### Web Development
```bash
npm run web
```
Opens the admin panel in your browser at http://localhost:8081

### iOS Development
```bash
npm run ios
```
Requires macOS with Xcode installed

### Android Development
```bash
npm run android
```
Requires Android Studio and emulator setup

### Using Expo Go
1. Install Expo Go on your mobile device
2. Scan the QR code from the terminal
3. The app will load on your device

## 🎨 Customization

### Theme Configuration
Edit `styles/global.ts` to customize:
- Color palette
- Typography
- Spacing system
- Component themes

### Adding New Routes
1. Create a new folder in `app/(admin)/` for web routes
2. Create a new folder in `app/(mobile)/` for mobile routes
3. Add `index.tsx` file with your component

### PrimeReact Theme
The project uses the Lara Light Indigo theme. To change:
1. Visit [PrimeReact Themes](https://primereact.org/theming)
2. Update the import in `components/layout/AdminLayout.tsx`

## 📱 Platform-Specific Code

Use React Native's Platform API for platform-specific implementations:

```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // Web-specific code
} else {
  // Mobile-specific code
}
```

## 🔧 Development Tips

1. **Hot Reloading**: Enabled by default for faster development
2. **TypeScript**: Strict mode enabled for better type safety
3. **Linting**: Run `npm run lint` to check code quality
4. **Testing**: Add tests in `__tests__` directory

## 📊 Key Components

### AdminLayout (Web)
- Collapsible sidebar navigation
- Top header with user menu
- Responsive design for tablets

### Mobile Navigation
- Bottom tab navigation
- Native transitions
- Platform-specific icons

### DataTable (Web)
- Advanced filtering
- Sorting and pagination
- Export functionality
- Row selection

### Dashboard Cards
- Real-time statistics
- Interactive charts
- Progress indicators
- Recent activity feed

## 🚀 Deployment

### Web Deployment
1. Build for production:
```bash
expo build:web
```
2. Deploy the `web-build` folder to your hosting service

### Mobile Deployment
1. Build for iOS/Android:
```bash
eas build --platform ios
eas build --platform android
```
2. Submit to app stores using EAS Submit

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by [PrimeReact Ultima](https://ultima.primereact.org/)
- Built with [Expo](https://expo.dev/)
- UI components from [PrimeReact](https://primereact.org/)

## 📞 Support

For support, email support@example.com or join our Slack channel.

---

Made with ❤️ using React Native and Expo