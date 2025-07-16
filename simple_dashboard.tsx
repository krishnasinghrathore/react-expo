import React, { useState } from 'react'
import { 
  TamaguiProvider, 
  YStack, 
  XStack, 
  Text, 
  Button, 
  Input, 
  ScrollView, 
  Card, 
  Theme,
  H1,
  H2,
  H3,
  H4,
  Paragraph,
  Circle,
  Switch,
  Slider,
  Progress,
  Tabs,
  Separator,
  LinearGradient,
  ListItem,
  Avatar,
} from 'tamagui'
import { ultimaConfig } from './ultima_theme'

// =============================================================================
// SIMPLE COMPONENTS
// =============================================================================

const SimpleCard = ({ title, value, color = 'blue' }: { title: string; value: string; color?: string }) => (
  <Card 
    p="$4" 
    bg="$surfaceCard" 
    borderRadius="$4" 
    borderWidth={1} 
    borderColor="$borderColor"
    elevation="$1"
    width="100%"
    minWidth={250}
  >
    <YStack gap="$2">
      <Text fontSize="$3" color="$textSecondary">
        {title}
      </Text>
      <Text fontSize="$6" fontWeight="600" color="$textPrimary">
        {value}
      </Text>
      <Text fontSize="$3" color="$success">
        +12% from last month
      </Text>
    </YStack>
  </Card>
)

const SimpleChart = ({ title, width = 300, height = 200 }: { title: string; width?: number; height?: number }) => (
  <Card 
    p="$4" 
    bg="$surfaceCard" 
    borderRadius="$4" 
    borderWidth={1} 
    borderColor="$borderColor"
    width={width}
    height={height}
  >
    <YStack gap="$3">
      <H4>{title}</H4>
      <YStack f={1} ai="center" jc="center" bg="$gray2" borderRadius="$3">
        <Circle size={60} bg="$primary" ai="center" jc="center">
          <Text color="$textOnPrimary" fontSize="$4" fontWeight="600">
            📊
          </Text>
        </Circle>
        <Text mt="$2" fontSize="$3" color="$textSecondary">
          Chart Placeholder
        </Text>
      </YStack>
    </YStack>
  </Card>
)

const SimpleTable = ({ title }: { title: string }) => {
  const data = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' },
  ]

  return (
    <Card 
      p="$4" 
      bg="$surfaceCard" 
      borderRadius="$4" 
      borderWidth={1} 
      borderColor="$borderColor"
      width="100%"
    >
      <YStack gap="$3">
        <H4>{title}</H4>
        <YStack gap="$2">
          {data.map((item, index) => (
            <XStack key={index} ai="center" gap="$3" p="$3" bg="$gray1" borderRadius="$3">
              <Avatar circular size="$3">
                <Avatar.Fallback bg="$gray5" />
              </Avatar>
              <YStack f={1}>
                <Text fontSize="$3" fontWeight="500">{item.name}</Text>
                <Text fontSize="$2" color="$textSecondary">{item.email}</Text>
              </YStack>
              <Text fontSize="$2" color="$textSecondary">{item.role}</Text>
              <Button 
                size="$2" 
                variant={item.status === 'Active' ? 'outlined' : 'outlined'}
                color={item.status === 'Active' ? '$success' : '$error'}
              >
                {item.status}
              </Button>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </Card>
  )
}

// =============================================================================
// SIDEBAR
// =============================================================================

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <YStack
    bg="$sidebarBackground"
    width={280}
    height="100vh"
    position="fixed"
    top={0}
    left={0}
    zIndex={1000}
    borderRightWidth={1}
    borderRightColor="$sidebarBorder"
    display={isOpen ? 'flex' : 'none'}
    $gtMd={{ display: 'flex' }}
  >
    {/* Header */}
    <XStack p="$4" ai="center" gap="$3" borderBottomWidth={1} borderBottomColor="$sidebarBorder">
      <Circle size={40} bg="$primary" ai="center" jc="center">
        <Text color="$textOnPrimary" fontSize="$4" fontWeight="600">U</Text>
      </Circle>
      <YStack f={1}>
        <Text fontSize="$5" fontWeight="600" color="$sidebarTextHover">
          Ultima
        </Text>
        <Text fontSize="$3" color="$sidebarText">
          Dashboard
        </Text>
      </YStack>
      <Button 
        size="$3" 
        circular 
        onPress={onClose}
        variant="ghost"
        color="$sidebarText"
        display="flex"
        $gtMd={{ display: 'none' }}
      >
        ✕
      </Button>
    </XStack>

    {/* Navigation */}
    <ScrollView f={1} p="$4">
      <YStack gap="$2">
        {[
          { label: 'Dashboard', icon: '🏠', active: true },
          { label: 'Users', icon: '👥', active: false },
          { label: 'Analytics', icon: '📊', active: false },
          { label: 'Settings', icon: '⚙️', active: false },
        ].map((item, index) => (
          <XStack
            key={index}
            p="$3"
            mx="$2"
            borderRadius="$3"
            ai="center"
            gap="$3"
            bg={item.active ? '$sidebarActive' : 'transparent'}
            hoverStyle={{ bg: item.active ? '$sidebarActive' : '$sidebarBorder' }}
            cursor="pointer"
          >
            <Text fontSize="$4">{item.icon}</Text>
            <Text 
              f={1} 
              fontSize="$4" 
              color={item.active ? '$sidebarActiveText' : '$sidebarText'}
              fontWeight={item.active ? '600' : '400'}
            >
              {item.label}
            </Text>
          </XStack>
        ))}
      </YStack>
    </ScrollView>
  </YStack>
)

// =============================================================================
// HEADER
// =============================================================================

const Header = ({ onMenuClick, onThemeToggle, isDark }: { 
  onMenuClick: () => void; 
  onThemeToggle: () => void;
  isDark: boolean;
}) => (
  <XStack
    height={70}
    bg="$surfaceCard"
    ai="center"
    px="$4"
    gap="$3"
    borderBottomWidth={1}
    borderBottomColor="$borderColor"
    zIndex={999}
    position="sticky"
    top={0}
  >
    {/* Menu Button - Mobile */}
    <Button
      size="$3"
      circular
      onPress={onMenuClick}
      variant="ghost"
      display="flex"
      $gtMd={{ display: 'none' }}
    >
      ☰
    </Button>

    {/* Search */}
    <XStack f={1} ai="center" gap="$3" maxWidth={400}>
      <XStack 
        f={1} 
        ai="center" 
        gap="$2" 
        bg="$background" 
        px="$3" 
        py="$2" 
        borderRadius="$3"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <Text fontSize="$4">🔍</Text>
        <Input 
          f={1} 
          placeholder="Search..." 
          fontSize="$3"
          bg="transparent"
          borderWidth={0}
          focusStyle={{ borderWidth: 0 }}
        />
      </XStack>
    </XStack>

    {/* Actions */}
    <XStack ai="center" gap="$2">
      <Button
        size="$3"
        circular
        onPress={onThemeToggle}
        variant="ghost"
      >
        {isDark ? '☀️' : '🌙'}
      </Button>
      <Button
        size="$3"
        circular
        variant="ghost"
      >
        🔔
      </Button>
      <Avatar circular size="$3">
        <Avatar.Fallback bg="$gray5" />
      </Avatar>
    </XStack>
  </XStack>
)

// =============================================================================
// MAIN DASHBOARD
// =============================================================================

const SimpleDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <TamaguiProvider config={ultimaConfig}>
      <Theme name={isDarkMode ? 'dark' : 'light'}>
        <YStack f={1} bg="$background">
          {/* Sidebar */}
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          
          {/* Main Content */}
          <YStack 
            f={1} 
            marginLeft={0}
            $gtMd={{ marginLeft: 280 }}
          >
            {/* Header */}
            <Header 
              onMenuClick={() => setSidebarOpen(true)}
              onThemeToggle={() => setIsDarkMode(!isDarkMode)}
              isDark={isDarkMode}
            />
            
            {/* Content */}
            <ScrollView f={1}>
              <YStack p="$6" gap="$6">
                {/* Welcome */}
                <YStack>
                  <H1 mb="$2">Dashboard</H1>
                  <Paragraph fontSize="$4" color="$textSecondary">
                    Welcome to your Ultima-themed dashboard built with Tamagui!
                  </Paragraph>
                </YStack>

                {/* Stats Cards */}
                <XStack gap="$4" flexWrap="wrap">
                  <SimpleCard title="Total Users" value="12,345" color="blue" />
                  <SimpleCard title="Revenue" value="$24,500" color="green" />
                  <SimpleCard title="Orders" value="1,245" color="purple" />
                  <SimpleCard title="Growth" value="23.5%" color="yellow" />
                </XStack>

                {/* Charts */}
                <XStack gap="$4" flexWrap="wrap">
                  <SimpleChart title="Monthly Sales" width={400} height={300} />
                  <SimpleChart title="User Activity" width={400} height={300} />
                </XStack>

                {/* Data Table */}
                <SimpleTable title="Recent Users" />

                {/* Form Components Demo */}
                <Card p="$4" bg="$surfaceCard" borderRadius="$4" borderWidth={1} borderColor="$borderColor">
                  <YStack gap="$4">
                    <H4>Form Components</H4>
                    
                    <YStack gap="$3">
                      <YStack gap="$2">
                        <Text fontSize="$3">Input Field</Text>
                        <Input placeholder="Enter your name" />
                      </YStack>
                      
                      <YStack gap="$2">
                        <Text fontSize="$3">Switch</Text>
                        <XStack ai="center" gap="$2">
                          <Switch size="$3" />
                          <Text>Enable notifications</Text>
                        </XStack>
                      </YStack>
                      
                      <YStack gap="$2">
                        <Text fontSize="$3">Slider</Text>
                        <Slider defaultValue={[30]} max={100} step={1} width="100%">
                          <Slider.Track>
                            <Slider.TrackActive />
                          </Slider.Track>
                          <Slider.Thumb circular index={0} />
                        </Slider>
                      </YStack>
                      
                      <YStack gap="$2">
                        <Text fontSize="$3">Progress</Text>
                        <Progress value={65} max={100} />
                      </YStack>
                      
                      <XStack gap="$3">
                        <Button f={1} variant="outlined">
                          Cancel
                        </Button>
                        <Button f={1}>
                          Save
                        </Button>
                      </XStack>
                    </YStack>
                  </YStack>
                </Card>
              </YStack>
            </ScrollView>
          </YStack>
          
          {/* Mobile Overlay */}
          {sidebarOpen && (
            <YStack
              position="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="rgba(0,0,0,0.5)"
              zIndex={999}
              onPress={() => setSidebarOpen(false)}
              display="flex"
              $gtMd={{ display: 'none' }}
            />
          )}
        </YStack>
      </Theme>
    </TamaguiProvider>
  )
}

export default SimpleDashboard