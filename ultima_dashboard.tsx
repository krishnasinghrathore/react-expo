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
  Avatar, 
  Badge, 
  Separator, 
  H1, 
  H2, 
  H3, 
  H4, 
  H5, 
  H6,
  Paragraph,
  Theme,
  useTheme,
  Circle,
  Square,
  Switch,
  Slider,
  Progress,
  Tabs,
  Sheet,
  Popover,
  Select,
  Checkbox,
  RadioGroup,
  LinearGradient,
  ListItem,
  Group,
  SizableText,
  Spinner,
} from 'tamagui'
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  ChevronRight,
  Plus,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  Star,
  Heart,
  Bookmark,
  Share2,
  MessageSquare,
  ThumbsUp,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Zap,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  FileText,
  Folder,
  Image,
  Video,
  Music,
  Archive,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info,
  AlertTriangle,
  Layers,
  Database,
  Server,
  Cloud,
  Wifi,
  Bluetooth,
  Battery,
  Volume2,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Sun,
  Moon,
  Contrast,
  Palette,
  Brush,
  Scissors,
  Paperclip,
  Link,
  ExternalLink,
  Copy,
  Paste,
  Cut,
  Undo,
  Redo,
  Save,
  Upload as UploadIcon,
  Download as DownloadIcon,
  RefreshCw,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Maximize,
  Minimize,
  Expand,
  Shrink,
  Move,
  Resize,
  Lock,
  Unlock,
  Key,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  Crown,
  Award,
  Trophy,
  Target,
  Flag,
  Bookmark as BookmarkIcon,
  Tag,
  Hash,
  AtSign,
  Percent,
  Minus,
  Equal,
  Divide,
  Multiply,
  Calculator,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Type,
  FontSize,
  LetterSpacing,
  LineHeight,
  TextCursor,
  CursorPointer,
  MousePointer,
  Navigation,
  Compass,
  Map,
  MapPin as MapPinIcon,
  Route,
  Car,
  Plane,
  Train,
  Bus,
  Bike,
  Walk,
  Truck,
  Ship,
  Anchor,
  Sailboat,
  Rocket,
  Satellite,
  Radar,
  Radio,
  Tv,
  Camera,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  VolumeX,
  Volume1,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Shuffle,
  Repeat,
  Repeat1,
  Headphones,
  Speaker,
  Disc,
  Disc2,
  Disc3,
  Cassette,
  Vinyl,
  Radio as RadioIcon,
  Rss,
  Podcast,
  Voicemail,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  PhoneForwarded,
  Voicemail as VoicemailIcon,
  MessageCircle,
  MessageSquareText,
  MessageSquareMore,
  MessageSquareDashed,
  MessageSquareOff,
  MessageSquareX,
  MessageSquareCheck,
  MessageSquareHeart,
  MessageSquareReply,
  MessageSquareShare,
  MessageSquareQuote,
  MessageSquareCode,
  MessageSquareWarning,
  MessageSquareX as MessageSquareXIcon,
  Send,
  Reply,
  ReplyAll,
  Forward,
  Archive as ArchiveIcon,
  Trash,
  Trash2 as Trash2Icon,
  Delete,
  Eraser,
  EraserIcon,
  Backspace,
  Command,
  Option,
  Shift,
  Control,
  Alt,
  Space,
  Enter,
  Tab,
  CapsLock,
  Escape,
  Insert,
  Delete as DeleteIcon,
  Home as HomeIcon,
  End,
  PageUp,
  PageDown,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  ArrowDownLeft,
  ArrowUpLeft,
  ArrowBigUp,
  ArrowBigDown,
  ArrowBigLeft,
  ArrowBigRight,
  ChevronsUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  MoreHorizontal,
  MoreVertical,
  Grip,
  GripHorizontal,
  GripVertical,
  Move3D,
  Scan,
  ScanLine,
  ScanText,
  ScanBarcode,
  ScanFace,
  ScanEye,
  Focus,
  Crosshair,
  Locate,
  LocateFixed,
  LocateOff,
  MousePointer2,
  TouchpadOff,
  Touchpad,
  Gamepad,
  Gamepad2,
  Joystick,
  Dices,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Spade,
  Club,
  Diamond,
  Heart as HeartIcon,
  Clubs,
  Diamonds,
  Hearts,
  Spades,
  Puzzle,
  Shapes,
  Triangle,
  Square as SquareIcon,
  Circle as CircleIcon,
  Pentagon,
  Hexagon,
  Octagon,
  Star as StarIcon,
  Sparkles,
  Sparkle,
  Flame,
  Zap as ZapIcon,
  Bolt,
  FlashLight,
  Flashlight,
  Lightbulb,
  Candle,
  Lamp,
  LampCeiling,
  LampDesk,
  LampFloor,
  LampWall,
  Sun as SunIcon,
  Sunrise,
  Sunset,
  Moon as MoonIcon,
  MoonStar,
  Stars,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudHail,
  CloudFog,
  Wind,
  Tornado,
  Snowflake,
  Thermometer,
  ThermometerSun,
  ThermometerSnowflake,
  Gauge,
  Speedometer,
  Timer,
  Stopwatch,
  Hourglass,
  Clock1,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12,
  AlarmClock,
  AlarmClockOff,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarClock,
  CalendarHeart,
  CalendarSearch,
  CalendarArrowDown,
  CalendarArrowUp,
  CalendarRange,
  CalendarX2,
  CalendarCheck2,
  CalendarClock as CalendarClockIcon,
  CalendarFold,
  CalendarSync,
  CalendarImport,
  CalendarExport,
  CalendarCog,
  CalendarUser,
  CalendarUsers,
  CalendarShare,
  CalendarMail,
  CalendarPhone,
  CalendarPin,
  CalendarStar,
  CalendarHeart as CalendarHeartIcon,
  CalendarBookmark,
  CalendarSearch as CalendarSearchIcon,
  CalendarFilter,
  CalendarCheck as CalendarCheckIcon,
  CalendarX as CalendarXIcon,
  CalendarPlus as CalendarPlusIcon,
  CalendarMinus as CalendarMinusIcon,
  CalendarClock as CalendarClockIcon2,
  CalendarDays as CalendarDaysIcon,
  CalendarArrowDown as CalendarArrowDownIcon,
  CalendarArrowUp as CalendarArrowUpIcon,
  CalendarRange as CalendarRangeIcon,
  CalendarX2 as CalendarX2Icon,
  CalendarCheck2 as CalendarCheck2Icon,
  CalendarFold as CalendarFoldIcon,
  CalendarSync as CalendarSyncIcon,
  CalendarImport as CalendarImportIcon,
  CalendarExport as CalendarExportIcon,
  CalendarCog as CalendarCogIcon,
  CalendarUser as CalendarUserIcon,
  CalendarUsers as CalendarUsersIcon,
  CalendarShare as CalendarShareIcon,
  CalendarMail as CalendarMailIcon,
  CalendarPhone as CalendarPhoneIcon,
  CalendarPin as CalendarPinIcon,
  CalendarStar as CalendarStarIcon,
  CalendarBookmark as CalendarBookmarkIcon,
  CalendarFilter as CalendarFilterIcon,
} from '@tamagui/lucide-icons'

import { ultimaConfig } from './ultima_theme'
import { 
  DataTable, 
  CustomDialog as Dialog, 
  Calendar, 
  FormField, 
  MultiSelect, 
  Toast 
} from './tamagui_primereact_components'
import { 
  NestedDataTable, 
  BarChart, 
  LineChart, 
  PieChart 
} from './advanced_tamagui_components'

// =============================================================================
// SIDEBAR NAVIGATION
// =============================================================================

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeItem, setActiveItem] = useState('dashboard')
  const theme = useTheme()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
    { id: 'users', label: 'Users', icon: Users, badge: '23' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: '156' },
    { id: 'products', label: 'Products', icon: Package, badge: null },
    { id: 'reports', label: 'Reports', icon: FileText, badge: null },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: null },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '5' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ]

  const MenuItem = ({ item }: { item: typeof menuItems[0] }) => (
    <XStack
      p="$3"
      mx="$2"
      br="$3"
      ai="center"
      gap="$3"
      bg={activeItem === item.id ? '$sidebarActive' : 'transparent'}
      hoverStyle={{ bg: activeItem === item.id ? '$sidebarActive' : '$sidebarBorder' }}
      pressStyle={{ bg: '$sidebarActive' }}
      onPress={() => setActiveItem(item.id)}
      cursor="pointer"
    >
      <item.icon 
        size={20} 
        color={activeItem === item.id ? '$sidebarActiveText' : '$sidebarText'} 
      />
      <Text 
        f={1} 
        fontSize="$4" 
        color={activeItem === item.id ? '$sidebarActiveText' : '$sidebarText'}
        fontWeight={activeItem === item.id ? '600' : '400'}
      >
        {item.label}
      </Text>
      {item.badge && (
        <Badge 
          bg="$primary" 
          color="$textOnPrimary" 
          fontSize="$2" 
          px="$2" 
          py="$1"
        >
          {item.badge}
        </Badge>
      )}
    </XStack>
  )

  return (
    <YStack
      bg="$sidebarBackground"
      w={280}
      h="100vh"
      pos="fixed"
      t={0}
      l={0}
      zi="$sticky"
      bw={1}
      bc="$sidebarBorder"
      display={isOpen ? 'flex' : 'none'}
      $gtMd={{
        display: 'flex',
      }}
    >
      {/* Sidebar Header */}
      <XStack p="$6" ai="center" gap="$3" bbw={1} bc="$sidebarBorder">
        <Circle size={40} bg="$primary" ai="center" jc="center">
          <Zap size={20} color="$textOnPrimary" />
        </Circle>
        <YStack f={1}>
          <Text fontSize="$5" fontWeight="600" color="$sidebarTextHover">
            Ultima
          </Text>
          <Text fontSize="$3" color="$sidebarText">
            Admin Dashboard
          </Text>
        </YStack>
        <Button 
          size="$3" 
          circular 
          icon={<X size={16} />} 
          onPress={onClose}
          variant="ghost"
          color="$sidebarText"
          display="flex"
          $gtMd={{
            display: 'none',
          }}
        />
      </XStack>

      {/* Navigation */}
      <ScrollView f={1} p="$4">
        <YStack gap="$2">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </YStack>
      </ScrollView>

      {/* User Profile */}
      <XStack p="$4" ai="center" gap="$3" btw={1} bc="$sidebarBorder">
        <Avatar circular size="$4">
          <Avatar.Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
          <Avatar.Fallback bg="$gray5" />
        </Avatar>
        <YStack f={1}>
          <Text fontSize="$4" fontWeight="600" color="$sidebarTextHover">
            John Doe
          </Text>
          <Text fontSize="$3" color="$sidebarText">
            Administrator
          </Text>
        </YStack>
        <Button 
          size="$3" 
          circular 
          icon={<Settings size={16} />} 
          variant="ghost"
          color="$sidebarText"
        />
      </XStack>
    </YStack>
  )
}

// =============================================================================
// HEADER/TOPBAR
// =============================================================================

const Header = ({ onMenuClick, onThemeToggle, isDark }: { 
  onMenuClick: () => void; 
  onThemeToggle: () => void;
  isDark: boolean;
}) => {
  const theme = useTheme()

  return (
    <XStack
      h={70}
      bg="$surfaceCard"
      ai="center"
      px="$4"
      gap="$3"
      bbw={1}
      bc="$borderColor"
      zi="$sticky"
      pos="sticky"
      t={0}
      elevation="$1"
    >
      {/* Menu Button - Mobile */}
      <Button
        size="$3"
        circular
        icon={<Menu size={20} />}
        onPress={onMenuClick}
        variant="ghost"
        display="flex"
        $gtMd={{
          display: 'none',
        }}
      />

      {/* Search */}
      <XStack f={1} ai="center" gap="$3" maxWidth={400}>
        <XStack 
          f={1} 
          ai="center" 
          gap="$2" 
          bg="$background" 
          px="$3" 
          py="$2" 
          br="$3"
          bw={1}
          bc="$borderColor"
        >
          <Search size={16} color="$gray10" />
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
        {/* Theme Toggle */}
        <Button
          size="$3"
          circular
          icon={isDark ? <Sun size={18} /> : <Moon size={18} />}
          onPress={onThemeToggle}
          variant="ghost"
        />

        {/* Notifications */}
        <Button
          size="$3"
          circular
          icon={<Bell size={18} />}
          variant="ghost"
        />

        {/* Profile */}
        <Avatar circular size="$3" ml="$2">
          <Avatar.Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
          <Avatar.Fallback bg="$gray5" />
        </Avatar>
      </XStack>
    </XStack>
  )
}

// =============================================================================
// STATS CARDS
// =============================================================================

const StatsCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = 'blue' 
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: any; 
  color?: string;
}) => (
  <Card p="$4" bg="$surfaceCard" br="$4" bw={1} bc="$borderColor" elevation="$1">
    <XStack ai="center" gap="$3">
      <Circle size={48} bg={`$${color}2`} ai="center" jc="center">
        <Icon size={20} color={`$${color}11`} />
      </Circle>
      <YStack f={1}>
        <Text fontSize="$3" color="$textSecondary" mb="$1">
          {title}
        </Text>
        <Text fontSize="$6" fontWeight="600" color="$textPrimary">
          {value}
        </Text>
        <Text fontSize="$3" color="$success" mt="$1">
          {change}
        </Text>
      </YStack>
    </XStack>
  </Card>
)

// =============================================================================
// MAIN DASHBOARD CONTENT
// =============================================================================

const DashboardContent = () => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const [selectedOrders, setSelectedOrders] = useState<any[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([])
  const [showToast, setShowToast] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Sample data for components
  const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', department: 'Marketing' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive', department: 'Sales' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active', department: 'Content' },
  ]

  const userColumns = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'role', header: 'Role', sortable: true },
    { 
      field: 'status', 
      header: 'Status', 
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'green' : 'red'}>
          {value}
        </Badge>
      )
    },
    {
      field: 'actions',
      header: 'Actions',
      render: () => (
        <XStack gap="$2">
          <Button size="$2" icon={<Eye size={16} />} variant="ghost" />
          <Button size="$2" icon={<Edit size={16} />} variant="ghost" />
          <Button size="$2" icon={<Trash2 size={16} />} variant="ghost" />
        </XStack>
      )
    }
  ]

  const salesData = [
    { label: 'Jan', value: 4000 },
    { label: 'Feb', value: 3000 },
    { label: 'Mar', value: 5000 },
    { label: 'Apr', value: 4500 },
    { label: 'May', value: 6000 },
    { label: 'Jun', value: 5500 },
  ]

  const departmentData = [
    { label: 'Engineering', value: 45 },
    { label: 'Marketing', value: 25 },
    { label: 'Sales', value: 20 },
    { label: 'Content', value: 10 },
  ]

  const multiSelectOptions = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' }
  ]

  return (
    <YStack f={1} gap="$6">
      {/* Stats Cards */}
      <XStack gap="$4" flexWrap="wrap">
        <YStack f={1} minWidth={250}>
          <StatsCard
            title="Total Users"
            value="12,345"
            change="+12% from last month"
            icon={Users}
            color="blue"
          />
        </YStack>
        <YStack f={1} minWidth={250}>
          <StatsCard
            title="Revenue"
            value="$24,500"
            change="+18% from last month"
            icon={DollarSign}
            color="green"
          />
        </YStack>
        <YStack f={1} minWidth={250}>
          <StatsCard
            title="Orders"
            value="1,245"
            change="+8% from last month"
            icon={ShoppingCart}
            color="purple"
          />
        </YStack>
        <YStack f={1} minWidth={250}>
          <StatsCard
            title="Growth"
            value="23.5%"
            change="+3% from last month"
            icon={TrendingUp}
            color="yellow"
          />
        </YStack>
      </XStack>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} flexDirection="column">
        <Tabs.List bg="$surfaceCard" p="$1" br="$3" bw={1} bc="$borderColor">
          <Tabs.Tab value="overview" f={1}>
            <Text fontSize="$3" fontWeight="500">Overview</Text>
          </Tabs.Tab>
          <Tabs.Tab value="analytics" f={1}>
            <Text fontSize="$3" fontWeight="500">Analytics</Text>
          </Tabs.Tab>
          <Tabs.Tab value="users" f={1}>
            <Text fontSize="$3" fontWeight="500">Users</Text>
          </Tabs.Tab>
          <Tabs.Tab value="components" f={1}>
            <Text fontSize="$3" fontWeight="500">Components</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Content value="overview" gap="$6">
          {/* Charts Row */}
          <XStack gap="$4" flexWrap="wrap">
            <YStack f={1} minWidth={400}>
              <BarChart
                data={salesData}
                title="Monthly Sales"
                width={400}
                height={300}
                showValues
                animated
              />
            </YStack>
            <YStack f={1} minWidth={400}>
              <LineChart
                data={salesData}
                title="Sales Trend"
                width={400}
                height={300}
                showPoints
                animated
              />
            </YStack>
          </XStack>

          {/* Department Chart & Recent Activity */}
          <XStack gap="$4" flexWrap="wrap">
            <YStack f={1} minWidth={350}>
              <PieChart
                data={departmentData}
                title="Department Distribution"
                width={350}
                height={350}
                showLabels
                animated
              />
            </YStack>
            <YStack f={1} minWidth={350}>
              <Card p="$4" bg="$surfaceCard" br="$4" bw={1} bc="$borderColor">
                <H4 mb="$4">Recent Activity</H4>
                <YStack gap="$3">
                  {[
                    { user: 'John Doe', action: 'created a new user', time: '2 minutes ago' },
                    { user: 'Jane Smith', action: 'updated product catalog', time: '5 minutes ago' },
                    { user: 'Bob Johnson', action: 'generated report', time: '1 hour ago' },
                    { user: 'Alice Brown', action: 'sent newsletter', time: '2 hours ago' },
                  ].map((activity, index) => (
                    <XStack key={index} ai="center" gap="$3">
                      <Avatar circular size="$3">
                        <Avatar.Fallback bg="$gray5" />
                      </Avatar>
                      <YStack f={1}>
                        <Text fontSize="$3" fontWeight="500">
                          {activity.user}
                        </Text>
                        <Text fontSize="$2" color="$textSecondary">
                          {activity.action}
                        </Text>
                      </YStack>
                      <Text fontSize="$2" color="$textSecondary">
                        {activity.time}
                      </Text>
                    </XStack>
                  ))}
                </YStack>
              </Card>
            </YStack>
          </XStack>
        </Tabs.Content>

        <Tabs.Content value="analytics" gap="$6">
          <XStack gap="$4" flexWrap="wrap">
            <YStack f={2} minWidth={600}>
              <Card p="$4" bg="$surfaceCard" br="$4" bw={1} bc="$borderColor">
                <H4 mb="$4">Performance Analytics</H4>
                <LineChart
                  data={[
                    { label: 'Week 1', value: 2400 },
                    { label: 'Week 2', value: 1398 },
                    { label: 'Week 3', value: 9800 },
                    { label: 'Week 4', value: 3908 },
                  ]}
                  width={500}
                  height={300}
                  showPoints
                  animated
                />
              </Card>
            </YStack>
            <YStack f={1} minWidth={300}>
              <Card p="$4" bg="$surfaceCard" br="$4" bw={1} bc="$borderColor">
                <H4 mb="$4">Key Metrics</H4>
                <YStack gap="$4">
                  <YStack>
                    <Text fontSize="$3" color="$textSecondary">Conversion Rate</Text>
                    <Text fontSize="$5" fontWeight="600">3.2%</Text>
                    <Progress value={32} max={100} mt="$2" />
                  </YStack>
                  <YStack>
                    <Text fontSize="$3" color="$textSecondary">Bounce Rate</Text>
                    <Text fontSize="$5" fontWeight="600">24.5%</Text>
                    <Progress value={24} max={100} mt="$2" />
                  </YStack>
                  <YStack>
                    <Text fontSize="$3" color="$textSecondary">Session Duration</Text>
                    <Text fontSize="$5" fontWeight="600">4m 32s</Text>
                    <Progress value={72} max={100} mt="$2" />
                  </YStack>
                </YStack>
              </Card>
            </YStack>
          </XStack>
        </Tabs.Content>

        <Tabs.Content value="users" gap="$6">
          <Card p="$4" bg="$surfaceCard" br="$4" bw={1} bc="$borderColor">
            <XStack ai="center" jc="space-between" mb="$4">
              <H4>User Management</H4>
              <Button icon={<Plus size={16} />} onPress={() => setDialogOpen(true)}>
                Add User
              </Button>
            </XStack>
            <DataTable
              data={userData}
              columns={userColumns}
              paginator
              rows={10}
              selection={selectedUsers}
              onSelectionChange={setSelectedUsers}
              globalFilter=""
            />
          </Card>
        </Tabs.Content>

        <Tabs.Content value="components" gap="$6">
          <XStack gap="$4" flexWrap="wrap">
            {/* Form Components */}
            <YStack f={1} minWidth={400}>
              <Card p="$4" bg="$surfaceCard" br="$4" bw={1} bc="$borderColor">
                <H4 mb="$4">Form Components</H4>
                <YStack gap="$4">
                  <FormField label="Full Name" required>
                    <Input placeholder="Enter full name" />
                  </FormField>
                  
                  <FormField label="Email" required>
                    <Input placeholder="Enter email" />
                  </FormField>
                  
                  <FormField label="Department">
                    <Select defaultValue="engineering">
                      <Select.Trigger>
                        <Select.Value placeholder="Select department" />
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="engineering">Engineering</Select.Item>
                        <Select.Item value="marketing">Marketing</Select.Item>
                        <Select.Item value="sales">Sales</Select.Item>
                        <Select.Item value="content">Content</Select.Item>
                      </Select.Content>
                    </Select>
                  </FormField>
                  
                  <FormField label="Skills">
                    <MultiSelect
                      options={multiSelectOptions}
                      value={multiSelectValue}
                      onChange={setMultiSelectValue}
                      placeholder="Select skills"
                    />
                  </FormField>
                  
                  <FormField label="Start Date">
                    <Calendar
                      value={selectedDate}
                      onChange={setSelectedDate}
                      placeholder="Select date"
                    />
                  </FormField>
                  
                  <XStack gap="$3">
                    <Button f={1} variant="outlined">
                      Cancel
                    </Button>
                    <Button f={1} onPress={() => setShowToast(true)}>
                      Save
                    </Button>
                  </XStack>
                </YStack>
              </Card>
            </YStack>

            {/* Other Components */}
            <YStack f={1} minWidth={400}>
              <Card p="$4" bg="$surfaceCard" br="$4" bw={1} bc="$borderColor">
                <H4 mb="$4">UI Components</H4>
                <YStack gap="$4">
                  <YStack>
                    <Text fontSize="$3" mb="$2">Buttons</Text>
                    <XStack gap="$2" flexWrap="wrap">
                      <Button size="$2">Small</Button>
                      <Button size="$3">Medium</Button>
                      <Button size="$4">Large</Button>
                      <Button variant="outlined">Outlined</Button>
                    </XStack>
                  </YStack>
                  
                  <YStack>
                    <Text fontSize="$3" mb="$2">Badges</Text>
                    <XStack gap="$2" flexWrap="wrap">
                      <Badge>Default</Badge>
                      <Badge variant="green">Success</Badge>
                      <Badge variant="red">Error</Badge>
                      <Badge variant="yellow">Warning</Badge>
                    </XStack>
                  </YStack>
                  
                  <YStack>
                    <Text fontSize="$3" mb="$2">Switch & Checkbox</Text>
                    <XStack gap="$4" ai="center">
                      <Switch size="$3" />
                      <Checkbox />
                      <Text>Enable notifications</Text>
                    </XStack>
                  </YStack>
                  
                  <YStack>
                    <Text fontSize="$3" mb="$2">Slider</Text>
                    <Slider defaultValue={[30]} max={100} step={1} w="100%">
                      <Slider.Track>
                        <Slider.TrackActive />
                      </Slider.Track>
                      <Slider.Thumb circular index={0} />
                    </Slider>
                  </YStack>
                  
                  <YStack>
                    <Text fontSize="$3" mb="$2">Progress</Text>
                    <Progress value={65} max={100} />
                  </YStack>
                </YStack>
              </Card>
            </YStack>
          </XStack>
        </Tabs.Content>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Add New User"
        footer={
          <XStack gap="$3">
            <Button variant="outlined" onPress={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onPress={() => {
              setDialogOpen(false)
              setShowToast(true)
            }}>
              Add User
            </Button>
          </XStack>
        }
      >
        <YStack gap="$4">
          <FormField label="Full Name" required>
            <Input placeholder="Enter full name" />
          </FormField>
          <FormField label="Email" required>
            <Input placeholder="Enter email" />
          </FormField>
          <FormField label="Role">
            <Select defaultValue="user">
              <Select.Trigger>
                <Select.Value placeholder="Select role" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="admin">Admin</Select.Item>
                <Select.Item value="user">User</Select.Item>
                <Select.Item value="manager">Manager</Select.Item>
              </Select.Content>
            </Select>
          </FormField>
        </YStack>
      </Dialog>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          type="success"
          title="Success!"
          message="User added successfully"
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </YStack>
  )
}

// =============================================================================
// MAIN DASHBOARD APP
// =============================================================================

const UltimaDashboard = () => {
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
            ml={0}
            $gtMd={{
              ml: 280,
            }}
          >
            {/* Header */}
            <Header 
              onMenuClick={() => setSidebarOpen(true)}
              onThemeToggle={() => setIsDarkMode(!isDarkMode)}
              isDark={isDarkMode}
            />
            
            {/* Content */}
            <ScrollView f={1}>
              <YStack p="$6">
                <H1 mb="$2">Dashboard</H1>
                <Text fontSize="$4" color="$textSecondary" mb="$6">
                  Welcome back! Here's what's happening with your business today.
                </Text>
                
                <DashboardContent />
              </YStack>
            </ScrollView>
          </YStack>
          
          {/* Mobile Overlay */}
          {sidebarOpen && (
            <YStack
              pos="fixed"
              t={0}
              l={0}
              r={0}
              b={0}
              bg="rgba(0,0,0,0.5)"
              zi="$modal"
              onPress={() => setSidebarOpen(false)}
              display="flex"
              $gtMd={{
                display: 'none',
              }}
            />
          )}
        </YStack>
      </Theme>
    </TamaguiProvider>
  )
}

export default UltimaDashboard