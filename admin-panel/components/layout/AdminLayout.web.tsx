import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { Badge } from 'primereact/badge';
import { StyleSheet } from 'primereact/styleclass';
import { Tooltip } from 'primereact/tooltip';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => router.push('/(admin)/dashboard'),
      className: pathname === '/(admin)/dashboard' ? 'p-highlight' : ''
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      command: () => router.push('/(admin)/users'),
      className: pathname === '/(admin)/users' ? 'p-highlight' : ''
    },
    {
      label: 'Products',
      icon: 'pi pi-box',
      command: () => router.push('/(admin)/products'),
      className: pathname === '/(admin)/products' ? 'p-highlight' : ''
    },
    {
      label: 'Orders',
      icon: 'pi pi-shopping-cart',
      command: () => router.push('/(admin)/orders'),
      badge: '5',
      className: pathname === '/(admin)/orders' ? 'p-highlight' : ''
    },
    {
      label: 'Analytics',
      icon: 'pi pi-chart-line',
      command: () => router.push('/(admin)/analytics'),
      className: pathname === '/(admin)/analytics' ? 'p-highlight' : ''
    },
    {
      label: 'Reports',
      icon: 'pi pi-file',
      command: () => router.push('/(admin)/reports'),
      className: pathname === '/(admin)/reports' ? 'p-highlight' : ''
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => router.push('/(admin)/settings'),
      className: pathname === '/(admin)/settings' ? 'p-highlight' : ''
    }
  ];

  const profileMenu = useRef<Menu>(null);
  const profileItems = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => router.push('/(admin)/profile')
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => router.push('/(admin)/settings')
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        // Handle logout
        console.log('Logout');
      }
    }
  ];

  return (
    <div className="admin-layout">
      {/* Top Bar */}
      <div className="topbar surface-0 border-bottom-1 surface-border p-3 flex align-items-center justify-content-between">
        <div className="flex align-items-center">
          <Button 
            icon="pi pi-bars" 
            className="p-button-rounded p-button-text"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          />
          <span className="text-2xl font-semibold ml-3">Admin Panel</span>
        </div>
        
        <div className="flex align-items-center gap-3">
          <Button 
            icon="pi pi-bell" 
            className="p-button-rounded p-button-text p-button-plain"
            badge="3"
            badgeClassName="p-badge-danger"
          />
          
          <Menu model={profileItems} popup ref={profileMenu} />
          <Button 
            className="p-button-text p-button-plain"
            onClick={(e) => profileMenu.current?.toggle(e)}
          >
            <Avatar 
              label="JD" 
              className="mr-2"
              style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
              shape="circle"
            />
            <span className="font-medium">John Doe</span>
            <i className="pi pi-angle-down ml-2"></i>
          </Button>
        </div>
      </div>

      <div className="layout-main-container">
        {/* Sidebar */}
        <div className={`layout-sidebar ${sidebarVisible ? 'layout-sidebar-active' : ''}`}>
          <div className="layout-menu">
            <Menu model={menuItems} className="w-full" />
          </div>
        </div>

        {/* Main Content */}
        <div className="layout-main">
          {children}
        </div>
      </div>

      <style jsx global>{`
        .admin-layout {
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .topbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          z-index: 997;
          background-color: white;
        }

        .layout-main-container {
          display: flex;
          margin-top: 60px;
          min-height: calc(100vh - 60px);
        }

        .layout-sidebar {
          position: fixed;
          width: 250px;
          height: calc(100vh - 60px);
          z-index: 996;
          overflow-y: auto;
          background-color: white;
          border-right: 1px solid #dee2e6;
          transition: transform 0.3s;
          transform: translateX(-100%);
        }

        .layout-sidebar-active {
          transform: translateX(0);
        }

        .layout-main {
          margin-left: 0;
          padding: 2rem;
          flex: 1;
          transition: margin-left 0.3s;
        }

        .layout-sidebar-active ~ .layout-main {
          margin-left: 250px;
        }

        .p-menu {
          border: none;
          background: transparent;
        }

        .p-menu .p-menuitem-link {
          border-radius: 8px;
          margin: 0.25rem 0.5rem;
        }

        .p-menu .p-menuitem-link.p-highlight {
          background-color: #e3f2fd;
          color: #1976d2;
        }

        .p-menu .p-menuitem-link:hover {
          background-color: #f5f5f5;
        }

        @media screen and (max-width: 991px) {
          .layout-sidebar {
            position: fixed;
            z-index: 999;
          }

          .layout-sidebar-active ~ .layout-main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};