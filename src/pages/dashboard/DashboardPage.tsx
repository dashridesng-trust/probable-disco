import React from 'react';
import { Row, Col, Card, Statistic, Tag, Typography, Button, Space, Alert } from 'antd';
import {
  SafetyCertificateOutlined,
  CarOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTIC_COLORS } from '../../theme/colors';
import { useRouticTheme } from '../../theme/ThemeContext';

const { Title, Text, Paragraph } = Typography;

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { mode } = useRouticTheme();
  const isLight = mode === 'light';

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Welcome & System Status Banner */}
      <div style={{ marginBottom: 24 }}>
        <Title
          level={3}
          style={{
            margin: 0,
            color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
            fontWeight: 700,
          }}
        >
          Operations Overview
        </Title>
        <Text
          style={{
            color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
            fontSize: 14,
          }}
        >
          Routic Marketplace Operational Control Center · Aligned with Backend MVP Roadmap
        </Text>
      </div>

      <Alert
        message="Backend Phase 2 & 3 Active"
        description="The Verification Queue (Phase 2) and Vehicles & Listings Management (Phase 3) are connected to live NestJS backend endpoints. Downstream phases (Bookings, Finance, Rentals) are currently gated and will activate as backend modules deploy."
        type="info"
        showIcon
        icon={<InfoCircleOutlined style={{ color: ROUTIC_COLORS.ROYAL_NAVY }} />}
        style={{
          marginBottom: 24,
          backgroundColor: isLight ? ROUTIC_COLORS.PALE_LAVENDER : ROUTIC_COLORS.MIDNIGHT_BLUE,
          borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
          color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.SOFT_OFF_WHITE,
          borderRadius: 8,
        }}
      />

      {/* KPI Statistic Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered
            style={{
              borderRadius: 12,
              backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
              borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
            }}
          >
            <Statistic
              title={
                <span
                  style={{
                    color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
                    fontWeight: 600,
                  }}
                >
                  Pending Verifications
                </span>
              }
              value="Actionable"
              valueStyle={{
                color: ROUTIC_COLORS.BRIGHT_ORANGE,
                fontWeight: 700,
                fontSize: 22,
              }}
              prefix={<SafetyCertificateOutlined />}
            />
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Tag
                style={{
                  backgroundColor: isLight ? ROUTIC_COLORS.OFF_WHITE_GRAY : ROUTIC_COLORS.MIDNIGHT_BLUE,
                  color: ROUTIC_COLORS.GOLDEN_AMBER,
                  border: 'none',
                }}
              >
                P2 Queue Ready
              </Tag>
              <Button
                type="link"
                size="small"
                onClick={() => navigate('/verifications')}
                style={{
                  color: ROUTIC_COLORS.BRIGHT_ORANGE,
                  padding: 0,
                  fontWeight: 600,
                }}
              >
                Inspect Queue <ArrowRightOutlined />
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered
            style={{
              borderRadius: 12,
              backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
              borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
            }}
          >
            <Statistic
              title={
                <span
                  style={{
                    color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
                    fontWeight: 600,
                  }}
                >
                  Vehicles Under Review
                </span>
              }
              value="Live Supply"
              valueStyle={{
                color: ROUTIC_COLORS.GOLDEN_AMBER,
                fontWeight: 700,
                fontSize: 22,
              }}
              prefix={<CarOutlined />}
            />
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Tag
                style={{
                  backgroundColor: isLight ? ROUTIC_COLORS.OFF_WHITE_GRAY : ROUTIC_COLORS.MIDNIGHT_BLUE,
                  color: ROUTIC_COLORS.ROYAL_NAVY,
                  border: 'none',
                }}
              >
                P3 Queue Ready
              </Tag>
              <Button
                type="link"
                size="small"
                onClick={() => navigate('/vehicles')}
                style={{
                  color: ROUTIC_COLORS.BRIGHT_ORANGE,
                  padding: 0,
                  fontWeight: 600,
                }}
              >
                Inspect Listings <ArrowRightOutlined />
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered
            style={{
              borderRadius: 12,
              backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
              borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
              opacity: 0.85,
            }}
          >
            <Statistic
              title={
                <span
                  style={{
                    color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
                    fontWeight: 600,
                  }}
                >
                  Bookings Pipeline
                </span>
              }
              value="Backend P4"
              valueStyle={{
                color: ROUTIC_COLORS.COOL_GRAY,
                fontWeight: 700,
                fontSize: 22,
              }}
              prefix={<ClockCircleOutlined />}
            />
            <div style={{ marginTop: 12 }}>
              <Tag
                style={{
                  backgroundColor: isLight ? ROUTIC_COLORS.OFF_WHITE_GRAY : ROUTIC_COLORS.MIDNIGHT_BLUE,
                  color: ROUTIC_COLORS.SLATE_GRAY,
                  border: 'none',
                }}
              >
                Awaiting Backend P4
              </Tag>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered
            style={{
              borderRadius: 12,
              backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
              borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
              opacity: 0.85,
            }}
          >
            <Statistic
              title={
                <span
                  style={{
                    color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
                    fontWeight: 600,
                  }}
                >
                  Finance & Payouts
                </span>
              }
              value="Backend P5/8"
              valueStyle={{
                color: ROUTIC_COLORS.COOL_GRAY,
                fontWeight: 700,
                fontSize: 22,
              }}
              prefix={<CheckCircleOutlined />}
            />
            <div style={{ marginTop: 12 }}>
              <Tag
                style={{
                  backgroundColor: isLight ? ROUTIC_COLORS.OFF_WHITE_GRAY : ROUTIC_COLORS.MIDNIGHT_BLUE,
                  color: ROUTIC_COLORS.SLATE_GRAY,
                  border: 'none',
                }}
              >
                Money-moving Disabled
              </Tag>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Operational Actions Grid */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <SafetyCertificateOutlined style={{ color: ROUTIC_COLORS.BRIGHT_ORANGE }} />
                <span
                  style={{
                    color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
                    fontWeight: 600,
                  }}
                >
                  Phase 2: Verification Review Desk
                </span>
              </Space>
            }
            bordered
            style={{
              borderRadius: 12,
              backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
              borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
            }}
            extra={
              <Button
                type="primary"
                onClick={() => navigate('/verifications')}
                style={{
                  backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE,
                  borderColor: ROUTIC_COLORS.BRIGHT_ORANGE,
                }}
              >
                Open Queue
              </Button>
            }
          >
            <Paragraph
              style={{
                color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              Review renter and host submissions including NIN slip, live selfie, driver's
              license, proof of address, CAC/TIN certificates, and GPS pin drop comparison.
              Enforces mandatory decision reasons and audit tracking.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <CarOutlined style={{ color: ROUTIC_COLORS.GOLDEN_AMBER }} />
                <span
                  style={{
                    color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
                    fontWeight: 600,
                  }}
                >
                  Phase 3: Vehicle Listings Review Desk
                </span>
              </Space>
            }
            bordered
            style={{
              borderRadius: 12,
              backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
              borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
            }}
            extra={
              <Button
                type="primary"
                onClick={() => navigate('/vehicles')}
                style={{
                  backgroundColor: ROUTIC_COLORS.ROYAL_NAVY,
                  borderColor: ROUTIC_COLORS.ROYAL_NAVY,
                  color: ROUTIC_COLORS.WHITE,
                }}
              >
                Open Listings
              </Button>
            }
          >
            <Paragraph
              style={{
                color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              Adjudicate host vehicle submissions. Inspect specifications, pricing in NGN
              (converted from kobo), exterior/interior photo gallery, availability calendar,
              and configure approved security deposit amounts.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
