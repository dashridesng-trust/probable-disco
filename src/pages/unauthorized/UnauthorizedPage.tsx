import React from 'react';
import { Result, Button, Card, Typography } from 'antd';
import { LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { useClerk, useUser } from '@clerk/clerk-react';
import { ROUTIC_COLORS } from '../../theme/colors';
import { useRouticTheme } from '../../theme/ThemeContext';

const { Paragraph, Text } = Typography;

export const UnauthorizedPage: React.FC = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const { mode } = useRouticTheme();

  const isLight = mode === 'light';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: isLight
          ? ROUTIC_COLORS.FRAME_BACKGROUND_GRAY
          : ROUTIC_COLORS.DARK_NAVY,
        padding: 24,
      }}
    >
      <Card
        style={{
          maxWidth: 540,
          width: '100%',
          borderRadius: 12,
          backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
          borderColor: isLight
            ? ROUTIC_COLORS.LIGHT_BLUE_GRAY
            : ROUTIC_COLORS.ROYAL_NAVY,
          boxShadow: isLight
            ? '0 4px 12px rgba(7, 21, 63, 0.08)'
            : '0 4px 12px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Result
          icon={
            <LockOutlined
              style={{
                color: ROUTIC_COLORS.BRIGHT_ORANGE,
                fontSize: 64,
              }}
            />
          }
          title={
            <span
              style={{
                color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.SOFT_OFF_WHITE,
                fontWeight: 700,
              }}
            >
              Administrator Access Required
            </span>
          }
          subTitle={
            <span
              style={{
                color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
              }}
            >
              Your account ({user?.primaryEmailAddress?.emailAddress}) is
              authenticated, but has not been assigned administrative privileges.
            </span>
          }
          extra={[
            <div key="details" style={{ marginBottom: 24, textAlign: 'left' }}>
              <Paragraph
                style={{
                  color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                In accordance with Routic Security and RBAC policies:
                <br />
                • Admin accounts require manual authorization via the Clerk Dashboard.
                <br />
                • The claim <Text code>publicMetadata.role = 'ADMIN'</Text> must be
                assigned by an authorized security administrator.
                <br />
                • Self-service promotion or admin invitation within this portal is
                prohibited.
              </Paragraph>
            </div>,
            <Button
              key="signout"
              type="primary"
              icon={<LogoutOutlined />}
              onClick={() => signOut({ redirectUrl: '/login' })}
              style={{
                backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE,
                borderColor: ROUTIC_COLORS.BRIGHT_ORANGE,
                color: ROUTIC_COLORS.WHITE,
                fontWeight: 600,
                height: 40,
                padding: '0 24px',
              }}
            >
              Sign Out & Switch Account
            </Button>,
          ]}
        />
      </Card>
    </div>
  );
};
