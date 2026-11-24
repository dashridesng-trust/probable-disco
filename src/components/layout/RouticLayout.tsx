import React, { useState } from 'react';
import { Layout, Menu, Button, Space, Typography, Tag, Tooltip } from 'antd';
import {
  DashboardOutlined,
  SafetyCertificateOutlined,
  CarOutlined,
  CalendarOutlined,
  DollarOutlined,
  UserOutlined,
  AlertOutlined,
  MessageOutlined,
  FileTextOutlined,
  AuditOutlined,
  BulbOutlined,
  BulbFilled,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { ROUTIC_COLORS } from '../../theme/colors';
import { useRouticTheme } from '../../theme/ThemeContext';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export const RouticLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { mode, toggleTheme } = useRouticTheme();

  const isLight = mode === 'light';

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'trust-safety-group',
      label: (
        <span
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            color: ROUTIC_COLORS.MUTED_BLUE_GRAY,
            fontWeight: 700,
          }}
        >
          Phase 2 & 3 Active
        </span>
      ),
      type: 'group' as const,
      children: [
        {
          key: '/verifications',
          icon: <SafetyCertificateOutlined />,
          label: (
            <span>
              Verifications{' '}
              <Tag
                style={{
                  fontSize: 10,
                  padding: '0 4px',
                  lineHeight: '16px',
                  backgroundColor: ROUTIC_COLORS.ROYAL_NAVY,
                  color: ROUTIC_COLORS.GOLDEN_AMBER,
                  border: 'none',
                }}
              >
                P2
              </Tag>
            </span>
          ),
        },
        {
          key: '/vehicles',
          icon: <CarOutlined />,
          label: (
            <span>
              Vehicles & Listings{' '}
              <Tag
                style={{
                  fontSize: 10,
                  padding: '0 4px',
                  lineHeight: '16px',
                  backgroundColor: ROUTIC_COLORS.ROYAL_NAVY,
                  color: ROUTIC_COLORS.GOLDEN_AMBER,
                  border: 'none',
                }}
              >
                P3
              </Tag>
            </span>
          ),
        },
      ],
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'gated-group',
      label: (
        <span
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            color: ROUTIC_COLORS.MUTED_LAVENDER,
            fontWeight: 700,
          }}
        >
          Future Modules (Gated)
        </span>
      ),
      type: 'group' as const,
      children: [
        {
          key: '/bookings',
          icon: <CalendarOutlined />,
          label: <span>Bookings (P4)</span>,
        },
        {
          key: '/finance',
          icon: <DollarOutlined />,
          label: <span>Finance & Ledger (P5)</span>,
        },
        {
          key: '/rentals',
          icon: <CalendarOutlined />,
          label: <span>Rentals (P6)</span>,
        },
        {
          key: '/inspections',
          icon: <SafetyCertificateOutlined />,
          label: <span>Inspections (P7)</span>,
        },
        {
          key: '/payouts',
          icon: <DollarOutlined />,
          label: <span>Payouts (P8)</span>,
        },
        {
          key: '/messages',
          icon: <MessageOutlined />,
          label: <span>Messages (P9)</span>,
        },
        {
          key: '/cases',
          icon: <AlertOutlined />,
          label: <span>Incidents & Cases (P10)</span>,
        },
        {
          key: '/disputes',
          icon: <AlertOutlined />,
          label: <span>Disputes (P10)</span>,
        },
        {
          key: '/reviews',
          icon: <FileTextOutlined />,
          label: <span>Reviews (P11)</span>,
        },
        {
          key: '/notifications',
          icon: <MessageOutlined />,
          label: <span>Notifications (P12)</span>,
        },
        {
          key: '/users',
          icon: <UserOutlined />,
          label: <span>Users (P13)</span>,
        },
        {
          key: '/reports',
          icon: <FileTextOutlined />,
          label: <span>Reports</span>,
        },
        {
          key: '/audit-logs',
          icon: <AuditOutlined />,
          label: <span>Audit Logs (P14)</span>,
        },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(val) => setCollapsed(val)}
        trigger={null}
        width={250}
        style={{
          background: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.DARK_NAVY,
          borderRight: `1px solid ${
            isLight ? ROUTIC_COLORS.DARK_NAVY : ROUTIC_COLORS.MIDNIGHT_BLUE
          }`,
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: 12,
            borderBottom: `1px solid ${
              isLight ? ROUTIC_COLORS.MIDNIGHT_BLUE : ROUTIC_COLORS.ROYAL_NAVY
            }`,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 18,
              color: ROUTIC_COLORS.WHITE,
              boxShadow: '0 2px 6px rgba(255, 91, 26, 0.4)',
            }}
          >
            R
          </div>
          {!collapsed && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  color: ROUTIC_COLORS.WHITE,
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: -0.2,
                }}
              >
                Routic
              </span>
              <span
                style={{
                  color: ROUTIC_COLORS.MUTED_BLUE_GRAY,
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Admin Operations
              </span>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => {
            if (!key.startsWith('divider') && !key.endsWith('-group')) {
              navigate(key);
            }
          }}
          style={{
            background: 'transparent',
            marginTop: 12,
            borderRight: 'none',
          }}
        />
      </Sider>

      <Layout>
        {/* Top Header */}
        <Header
          style={{
            padding: '0 24px',
            background: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
            borderBottom: `1px solid ${
              isLight ? ROUTIC_COLORS.COOL_LIGHT_GRAY : ROUTIC_COLORS.ROYAL_NAVY
            }`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
          }}
        >
          <Space direction="horizontal" size={16}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: 16,
                color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
              }}
            />
            <Text
              style={{
                fontWeight: 600,
                fontSize: 15,
                color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
              }}
            >
              Operations Management
            </Text>
          </Space>

          <Space direction="horizontal" size={16}>
            {/* Theme Toggle Button */}
            <Tooltip
              title={
                isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode (Default)'
              }
            >
              <Button
                type="default"
                shape="circle"
                icon={
                  isLight ? (
                    <BulbOutlined style={{ color: ROUTIC_COLORS.DEEP_NAVY }} />
                  ) : (
                    <BulbFilled style={{ color: ROUTIC_COLORS.GOLDEN_AMBER }} />
                  )
                }
                onClick={toggleTheme}
                style={{
                  backgroundColor: isLight
                    ? ROUTIC_COLORS.SOFT_OFF_WHITE
                    : ROUTIC_COLORS.MIDNIGHT_BLUE,
                  borderColor: isLight
                    ? ROUTIC_COLORS.LIGHT_BLUE_GRAY
                    : ROUTIC_COLORS.ROYAL_NAVY,
                }}
              />
            </Tooltip>

            {/* Admin Badge */}
            <Tag
              style={{
                backgroundColor: ROUTIC_COLORS.ROYAL_NAVY,
                color: ROUTIC_COLORS.WHITE,
                border: 'none',
                fontWeight: 600,
                padding: '2px 8px',
              }}
            >
              ADMIN
            </Tag>

            {/* Clerk User Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: isLight
                    ? ROUTIC_COLORS.DEEP_NAVY
                    : ROUTIC_COLORS.SOFT_OFF_WHITE,
                }}
              >
                {user?.fullName || user?.firstName || 'Admin'}
              </span>
              <UserButton afterSignOutUrl="/login" />
            </div>
          </Space>
        </Header>

        {/* Content Area */}
        <Content
          style={{
            margin: '24px 24px 0',
            overflow: 'initial',
            minHeight: 'calc(100vh - 128px)',
          }}
        >
          {children}
        </Content>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            padding: '16px 24px',
            color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
            fontSize: 12,
          }}
        >
          Routic Operations Web Admin Portal · Authorized Personnel Only · Strict
          Audit Active
        </div>
      </Layout>
    </Layout>
  );
};
