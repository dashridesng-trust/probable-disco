import React from 'react';
import { Card, Result, Tag, Typography, Space, Divider, Row, Col } from 'antd';
import { LockOutlined, ApiOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { ROUTIC_COLORS } from '../../theme/colors';
import { useRouticTheme } from '../../theme/ThemeContext';

const { Title, Text, Paragraph } = Typography;

export interface GatedPhasePlaceholderProps {
  phaseNumber: number;
  phaseName: string;
  description: string;
  backendModule: string;
  backendPath: string;
  requiredEndpoints: string[];
  expectedFeatures: string[];
}

export const GatedPhasePlaceholder: React.FC<GatedPhasePlaceholderProps> = ({
  phaseNumber,
  phaseName,
  description,
  backendModule,
  backendPath,
  requiredEndpoints,
  expectedFeatures,
}) => {
  const { mode } = useRouticTheme();
  const isLight = mode === 'light';

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 0' }}>
      <Card
        style={{
          borderRadius: 16,
          backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
          borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
          boxShadow: isLight ? '0 4px 16px rgba(7, 21, 63, 0.06)' : '0 4px 16px rgba(0, 0, 0, 0.35)',
        }}
      >
        <Result
          icon={
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 72,
                height: 72,
                borderRadius: 20,
                backgroundColor: isLight ? ROUTIC_COLORS.PALE_LAVENDER : ROUTIC_COLORS.ROYAL_NAVY,
                color: ROUTIC_COLORS.BRIGHT_ORANGE,
                fontSize: 32,
              }}
            >
              <LockOutlined />
            </div>
          }
          title={
            <Space direction="vertical" size={4} style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                <Tag
                  style={{
                    backgroundColor: ROUTIC_COLORS.ROYAL_NAVY,
                    color: ROUTIC_COLORS.GOLDEN_AMBER,
                    border: 'none',
                    fontWeight: 700,
                  }}
                >
                  PHASE {phaseNumber} (GATED)
                </Tag>
                <Tag
                  style={{
                    backgroundColor: isLight ? ROUTIC_COLORS.OFF_WHITE_GRAY : ROUTIC_COLORS.DARK_NAVY,
                    color: ROUTIC_COLORS.SLATE_GRAY,
                    borderColor: isLight ? ROUTIC_COLORS.LIGHT_GRAY : ROUTIC_COLORS.MIDNIGHT_BLUE,
                  }}
                >
                  <ClockCircleOutlined style={{ marginRight: 4 }} /> Backend Incomplete
                </Tag>
              </div>
              <Title
                level={3}
                style={{
                  margin: 0,
                  color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
                }}
              >
                {phaseName}
              </Title>
            </Space>
          }
          subTitle={
            <Text
              style={{
                color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
                fontSize: 14,
              }}
            >
              {description}
            </Text>
          }
        />

        <Divider style={{ borderColor: isLight ? ROUTIC_COLORS.LIGHT_GRAY : ROUTIC_COLORS.ROYAL_NAVY }} />

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card
              size="small"
              title={
                <Space>
                  <ApiOutlined style={{ color: ROUTIC_COLORS.BRIGHT_ORANGE }} />
                  <Text strong style={{ color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE }}>
                    Backend Integration Contract
                  </Text>
                </Space>
              }
              style={{
                backgroundColor: isLight ? ROUTIC_COLORS.SOFT_OFF_WHITE : ROUTIC_COLORS.DARK_NAVY,
                borderColor: isLight ? ROUTIC_COLORS.LIGHT_GRAY : ROUTIC_COLORS.MIDNIGHT_BLUE,
                borderRadius: 8,
              }}
            >
              <Paragraph style={{ margin: 0, fontSize: 13, color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE }}>
                <strong>Module:</strong> <Text code>{backendModule}</Text>
                <br />
                <strong>Source Path:</strong> <Text code>{backendPath}</Text>
              </Paragraph>
              <div style={{ marginTop: 12 }}>
                <Text strong style={{ fontSize: 12, color: ROUTIC_COLORS.SLATE_GRAY }}>
                  Required Admin Endpoints:
                </Text>
                <ul style={{ margin: '6px 0 0 0', paddingLeft: 20, fontSize: 12, color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.MUTED_LAVENDER }}>
                  {requiredEndpoints.map((ep, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>
                      <Text code>{ep}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              size="small"
              title={
                <Space>
                  <CheckCircleOutlined style={{ color: ROUTIC_COLORS.GOLDEN_AMBER }} />
                  <Text strong style={{ color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE }}>
                    Planned Frontend Capabilities
                  </Text>
                </Space>
              }
              style={{
                backgroundColor: isLight ? ROUTIC_COLORS.SOFT_OFF_WHITE : ROUTIC_COLORS.DARK_NAVY,
                borderColor: isLight ? ROUTIC_COLORS.LIGHT_GRAY : ROUTIC_COLORS.MIDNIGHT_BLUE,
                borderRadius: 8,
              }}
            >
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.MUTED_LAVENDER }}>
                {expectedFeatures.map((feat, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    {feat}
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
