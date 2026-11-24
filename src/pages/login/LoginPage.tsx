import React, { useEffect } from 'react';
import { SignIn, useUser } from '@clerk/clerk-react';
import { Card, Alert, Typography, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { ROUTIC_COLORS } from '../../theme/colors';
import { useRouticTheme } from '../../theme/ThemeContext';

const { Text } = Typography;

export const LoginPage: React.FC = () => {
  const { mode } = useRouticTheme();
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const isLight = mode === 'light';

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const role = user.publicMetadata?.['role'] as string | undefined;
      const isAdmin = role === 'ADMIN' || role === 'admin';

      if (isAdmin) {
        navigate('/', { replace: true });
      } else {
        navigate('/unauthorized', { replace: true });
      }
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: isLight
          ? ROUTIC_COLORS.FRAME_BACKGROUND_GRAY
          : ROUTIC_COLORS.DARK_NAVY,
        padding: 24,
      }}
    >
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE,
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 24,
            color: ROUTIC_COLORS.WHITE,
            marginBottom: 12,
            boxShadow: '0 4px 12px rgba(255, 91, 26, 0.4)',
          }}
        >
          R
        </div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
            margin: 0,
            letterSpacing: -0.5,
          }}
        >
          Routic Admin Portal
        </h1>
        <p
          style={{
            fontSize: 13,
            color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
            marginTop: 4,
            marginBottom: 0,
          }}
        >
          Authorized Administrative Operations & Platform Governance
        </p>
      </div>

      <div style={{ maxWidth: 480, width: '100%', marginBottom: 16 }}>
        <Alert
          showIcon
          icon={<SafetyCertificateOutlined style={{ color: ROUTIC_COLORS.GOLDEN_AMBER }} />}
          message={
            <span style={{ fontWeight: 600, color: ROUTIC_COLORS.DEEP_NAVY }}>
              Restricted Access Notice
            </span>
          }
          description={
            <Text
              style={{
                fontSize: 12,
                color: ROUTIC_COLORS.SLATE_GRAY,
                lineHeight: 1.5,
              }}
            >
              Sign-in is permitted only for users with the{' '}
              <Text code>ADMIN</Text> role provisioned in Clerk public metadata.
              Non-admin sessions will be rejected and redirected.
            </Text>
          }
          style={{
            backgroundColor: isLight ? ROUTIC_COLORS.OFF_WHITE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
            borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.MIDNIGHT_BLUE,
            borderRadius: 8,
          }}
        />
      </div>

      <Card
        style={{
          borderRadius: 16,
          backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
          borderColor: isLight
            ? ROUTIC_COLORS.LIGHT_BLUE_GRAY
            : ROUTIC_COLORS.ROYAL_NAVY,
          boxShadow: isLight
            ? '0 6px 20px rgba(7, 21, 63, 0.08)'
            : '0 6px 20px rgba(0, 0, 0, 0.4)',
          width: '100%',
          maxWidth: 480,
          textAlign: 'center',
        }}
        bodyStyle={{ padding: 24 }}
      >
        {!isLoaded ? (
          <div style={{ padding: 48 }}>
            <Spin size="large" />
          </div>
        ) : (
          <SignIn
            routing="path"
            path="/login"
            fallbackRedirectUrl="/"
            forceRedirectUrl="/"
            appearance={{
              elements: {
                formButtonPrimary: {
                  backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE,
                  '&:hover': {
                    backgroundColor: ROUTIC_COLORS.GOLDEN_AMBER,
                  },
                },
                card: {
                  boxShadow: 'none',
                  background: 'transparent',
                },
                footerAction: {
                  display: 'none', // Disallow public self sign-up links on admin login
                },
              },
            }}
          />
        )}
      </Card>
    </div>
  );
};
