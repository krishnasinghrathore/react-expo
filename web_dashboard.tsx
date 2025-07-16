import React, { useState } from 'react'
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  Sun,
  Moon,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Check,
  AlertCircle,
  Info,
  AlertTriangle,
  Package,
  FileText,
  MessageSquare,
  Calendar,
  Zap,
} from 'lucide-react'

// =============================================================================
// ULTIMA THEME COLORS
// =============================================================================

const ultimaColors = {
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  background: '#eff3f8',
  surface: '#ffffff',
  surfaceHover: '#f6f9fc',
  border: '#dfe7ef',
  text: '#495057',
  textSecondary: '#6c757d',
  textOnPrimary: '#ffffff',
  sidebarBg: '#1e293b',
  sidebarText: '#cbd5e1',
  sidebarTextHover: '#ffffff',
  sidebarActive: '#3b82f6',
  success: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
  info: '#06b6d4',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
}

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

const Card: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ 
  children, 
  className = '', 
  style 
}) => (
  <div 
    className={`card ${className}`}
    style={{
      backgroundColor: ultimaColors.surface,
      borderRadius: '8px',
      border: `1px solid ${ultimaColors.border}`,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      ...style
    }}
  >
    {children}
  </div>
)

const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '', 
  style,
  icon 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: ultimaColors.primary,
          color: ultimaColors.textOnPrimary,
          border: `1px solid ${ultimaColors.primary}`,
        }
      case 'secondary':
        return {
          backgroundColor: ultimaColors.gray[100],
          color: ultimaColors.text,
          border: `1px solid ${ultimaColors.border}`,
        }
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          color: ultimaColors.primary,
          border: `1px solid ${ultimaColors.primary}`,
        }
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: ultimaColors.text,
          border: '1px solid transparent',
        }
      default:
        return {}
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '6px 12px', fontSize: '14px' }
      case 'md':
        return { padding: '8px 16px', fontSize: '16px' }
      case 'lg':
        return { padding: '12px 24px', fontSize: '18px' }
      default:
        return {}
    }
  }

  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      style={{
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = ultimaColors.primaryHover
        } else if (variant === 'ghost') {
          e.currentTarget.style.backgroundColor = ultimaColors.surfaceHover
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = ultimaColors.primary
        } else if (variant === 'ghost') {
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}

const Input: React.FC<{
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}> = ({ placeholder, value, onChange, style, className = '' }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`input ${className}`}
    style={{
      padding: '8px 12px',
      borderRadius: '6px',
      border: `1px solid ${ultimaColors.border}`,
      backgroundColor: ultimaColors.surface,
      color: ultimaColors.text,
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      ...style,
    }}
    onFocus={(e) => {
      e.target.style.borderColor = ultimaColors.primary
    }}
    onBlur={(e) => {
      e.target.style.borderColor = ultimaColors.border
    }}
  />
)

// =============================================================================
// DASHBOARD COMPONENTS
// =============================================================================

const StatsCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, icon, color }) => (
  <Card style={{ padding: '20px', minWidth: '250px', flex: 1 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: ultimaColors.textSecondary, fontSize: '14px', marginBottom: '4px' }}>
          {title}
        </div>
        <div style={{ color: ultimaColors.text, fontSize: '24px', fontWeight: '600' }}>
          {value}
        </div>
        <div style={{ color: ultimaColors.success, fontSize: '14px', marginTop: '4px' }}>
          {change}
        </div>
      </div>
    </div>
  </Card>
)

const ChartPlaceholder: React.FC<{ title: string; width?: number; height?: number }> = ({ 
  title, 
  width = 400, 
  height = 300 
}) => (
  <Card style={{ padding: '20px', width: width, height: height }}>
    <div style={{ marginBottom: '16px' }}>
      <h3 style={{ color: ultimaColors.text, fontSize: '18px', fontWeight: '600', margin: 0 }}>
        {title}
      </h3>
    </div>
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ultimaColors.gray[50],
      borderRadius: '8px',
      minHeight: '200px',
    }}>
      <div style={{ textAlign: 'center', color: ultimaColors.textSecondary }}>
        <BarChart3 size={48} style={{ marginBottom: '8px' }} />
        <div>Chart Placeholder</div>
      </div>
    </div>
  </Card>
)

const SimpleTable: React.FC<{ title: string }> = ({ title }) => {
  const data = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' },
    { name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  ]

  return (
    <Card style={{ padding: '20px', width: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ color: ultimaColors.text, fontSize: '18px', fontWeight: '600', margin: 0 }}>
          {title}
        </h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            backgroundColor: ultimaColors.gray[50],
            borderRadius: '6px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: ultimaColors.gray[300],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: ultimaColors.textSecondary,
              fontSize: '14px',
              fontWeight: '500',
            }}>
              {item.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: ultimaColors.text, fontSize: '14px', fontWeight: '500' }}>
                {item.name}
              </div>
              <div style={{ color: ultimaColors.textSecondary, fontSize: '12px' }}>
                {item.email}
              </div>
            </div>
            <div style={{ color: ultimaColors.textSecondary, fontSize: '14px' }}>
              {item.role}
            </div>
            <Button
              variant={item.status === 'Active' ? 'outlined' : 'secondary'}
              size="sm"
              style={{
                color: item.status === 'Active' ? ultimaColors.success : ultimaColors.error,
                borderColor: item.status === 'Active' ? ultimaColors.success : ultimaColors.error,
              }}
            >
              {item.status}
            </Button>
            <div style={{ display: 'flex', gap: '4px' }}>
              <Button variant="ghost" size="sm" icon={<Eye size={16} />} />
              <Button variant="ghost" size="sm" icon={<Edit size={16} />} />
              <Button variant="ghost" size="sm" icon={<Trash2 size={16} />} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState('dashboard')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users, badge: '23' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: '156' },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '5' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '280px',
      height: '100vh',
      backgroundColor: ultimaColors.sidebarBg,
      borderRight: `1px solid ${ultimaColors.border}`,
      zIndex: 1000,
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'column',
      '@media (min-width: 1024px)': {
        display: 'flex',
      },
    } as React.CSSProperties}>
      {/* Header */}
      <div style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: `1px solid ${ultimaColors.border}`,
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: ultimaColors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: ultimaColors.textOnPrimary,
        }}>
          <Zap size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: ultimaColors.sidebarTextHover, fontSize: '18px', fontWeight: '600' }}>
            Ultima
          </div>
          <div style={{ color: ultimaColors.sidebarText, fontSize: '14px' }}>
            Dashboard
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          icon={<X size={16} />}
          style={{
            color: ultimaColors.sidebarText,
            display: 'flex',
            '@media (min-width: 1024px)': {
              display: 'none',
            },
          }}
        />
      </div>

      {/* Navigation */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              style={{
                padding: '12px',
                margin: '0 8px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                backgroundColor: activeItem === item.id ? ultimaColors.sidebarActive : 'transparent',
                color: activeItem === item.id ? ultimaColors.sidebarTextHover : ultimaColors.sidebarText,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (activeItem !== item.id) {
                  e.currentTarget.style.backgroundColor = ultimaColors.gray[700]
                }
              }}
              onMouseLeave={(e) => {
                if (activeItem !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <item.icon size={20} />
              <span style={{ flex: 1, fontSize: '14px', fontWeight: activeItem === item.id ? '600' : '400' }}>
                {item.label}
              </span>
              {item.badge && (
                <span style={{
                  backgroundColor: ultimaColors.primary,
                  color: ultimaColors.textOnPrimary,
                  fontSize: '12px',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontWeight: '500',
                }}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div style={{
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderTop: `1px solid ${ultimaColors.border}`,
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: ultimaColors.gray[400],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: ultimaColors.textOnPrimary,
          fontSize: '14px',
          fontWeight: '500',
        }}>
          JD
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: ultimaColors.sidebarTextHover, fontSize: '14px', fontWeight: '500' }}>
            John Doe
          </div>
          <div style={{ color: ultimaColors.sidebarText, fontSize: '12px' }}>
            Administrator
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          icon={<Settings size={16} />}
          style={{ color: ultimaColors.sidebarText }}
        />
      </div>
    </div>
  )
}

const Header: React.FC<{
  onMenuClick: () => void;
  onThemeToggle: () => void;
  isDark: boolean;
}> = ({ onMenuClick, onThemeToggle, isDark }) => (
  <div style={{
    height: '70px',
    backgroundColor: ultimaColors.surface,
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    gap: '12px',
    borderBottom: `1px solid ${ultimaColors.border}`,
    position: 'sticky',
    top: 0,
    zIndex: 999,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  }}>
    {/* Menu Button - Mobile */}
    <Button
      variant="ghost"
      size="sm"
      onClick={onMenuClick}
      icon={<Menu size={20} />}
      style={{
        display: 'flex',
        '@media (min-width: 1024px)': {
          display: 'none',
        },
      }}
    />

    {/* Search */}
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '400px' }}>
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: ultimaColors.background,
        padding: '8px 12px',
        borderRadius: '6px',
        border: `1px solid ${ultimaColors.border}`,
      }}>
        <Search size={16} color={ultimaColors.textSecondary} />
        <Input
          placeholder="Search..."
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            padding: '0',
            flex: 1,
          }}
        />
      </div>
    </div>

    {/* Actions */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onThemeToggle}
        icon={isDark ? <Sun size={18} /> : <Moon size={18} />}
      />
      <Button
        variant="ghost"
        size="sm"
        icon={<Bell size={18} />}
      />
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: ultimaColors.gray[300],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: ultimaColors.textSecondary,
        fontSize: '14px',
        fontWeight: '500',
        marginLeft: '8px',
      }}>
        JD
      </div>
    </div>
  </div>
)

// =============================================================================
// MAIN DASHBOARD
// =============================================================================

const WebDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: ultimaColors.background,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: 0,
        '@media (min-width: 1024px)': {
          marginLeft: '280px',
        },
      }}>
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          isDark={isDarkMode}
        />

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Welcome */}
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ color: ultimaColors.text, fontSize: '32px', fontWeight: '600', margin: '0 0 8px 0' }}>
              Dashboard
            </h1>
            <p style={{ color: ultimaColors.textSecondary, fontSize: '16px', margin: 0 }}>
              Welcome to your Ultima-themed dashboard built with React!
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <StatsCard
              title="Total Users"
              value="12,345"
              change="+12% from last month"
              icon={<Users size={20} />}
              color={ultimaColors.primary}
            />
            <StatsCard
              title="Revenue"
              value="$24,500"
              change="+18% from last month"
              icon={<DollarSign size={20} />}
              color={ultimaColors.success}
            />
            <StatsCard
              title="Orders"
              value="1,245"
              change="+8% from last month"
              icon={<ShoppingCart size={20} />}
              color={ultimaColors.info}
            />
            <StatsCard
              title="Growth"
              value="23.5%"
              change="+3% from last month"
              icon={<TrendingUp size={20} />}
              color={ultimaColors.warning}
            />
          </div>

          {/* Charts */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <ChartPlaceholder title="Monthly Sales" width={400} height={300} />
            <ChartPlaceholder title="User Activity" width={400} height={300} />
          </div>

          {/* Data Table */}
          <div style={{ marginBottom: '24px' }}>
            <SimpleTable title="Recent Users" />
          </div>

          {/* Form Components Demo */}
          <Card style={{ padding: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ color: ultimaColors.text, fontSize: '18px', fontWeight: '600', margin: 0 }}>
                Form Components
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: ultimaColors.text, fontSize: '14px' }}>
                  Input Field
                </label>
                <Input placeholder="Enter your name" style={{ width: '100%' }} />
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outlined">Outlined Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: 'block',
            '@media (min-width: 1024px)': {
              display: 'none',
            },
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default WebDashboard