import React from 'react';
import { Tag } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { ROUTIC_COLORS } from '../../theme/colors';

export type StatusCategory =
  | 'PENDING'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'SUSPENDED'
  | 'ACTIVE'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED'
  | 'HELD'
  | 'REFUNDED'
  | 'DRAFT'
  | string;

export interface StatusBadgeProps {
  status: StatusCategory;
  text?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text }) => {
  const normalized = (status || '').toUpperCase();
  const label = text || normalized.replace(/_/g, ' ');

  switch (normalized) {
    case 'APPROVED':
    case 'ACTIVE':
    case 'COMPLETED':
    case 'CONFIRMED':
    case 'PASSED':
      return (
        <Tag
          icon={<CheckCircleOutlined />}
          style={{
            backgroundColor: ROUTIC_COLORS.DEEP_NAVY,
            color: ROUTIC_COLORS.WHITE,
            borderColor: ROUTIC_COLORS.ROYAL_NAVY,
            fontWeight: 600,
          }}
        >
          {label}
        </Tag>
      );

    case 'PENDING':
    case 'SUBMITTED':
    case 'AWAITING_REVIEW':
    case 'IN_PROGRESS':
    case 'PROCESSING':
      return (
        <Tag
          icon={<ClockCircleOutlined />}
          style={{
            backgroundColor: ROUTIC_COLORS.ROYAL_NAVY,
            color: ROUTIC_COLORS.GOLDEN_AMBER,
            borderColor: ROUTIC_COLORS.MIDNIGHT_BLUE,
            fontWeight: 600,
          }}
        >
          {label}
        </Tag>
      );

    case 'IN_REVIEW':
    case 'ESCALATED':
    case 'DISPUTED':
    case 'HELD':
      return (
        <Tag
          icon={<SyncOutlined spin />}
          style={{
            backgroundColor: ROUTIC_COLORS.GOLDEN_AMBER,
            color: ROUTIC_COLORS.DEEP_NAVY,
            borderColor: ROUTIC_COLORS.GOLDEN_AMBER,
            fontWeight: 700,
          }}
        >
          {label}
        </Tag>
      );

    case 'REJECTED':
    case 'FAILED':
    case 'CANCELLED':
      return (
        <Tag
          icon={<CloseCircleOutlined />}
          style={{
            backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE,
            color: ROUTIC_COLORS.WHITE,
            borderColor: ROUTIC_COLORS.BRIGHT_ORANGE,
            fontWeight: 600,
          }}
        >
          {label}
        </Tag>
      );

    case 'SUSPENDED':
    case 'BANNED':
    case 'LOCKED':
      return (
        <Tag
          icon={<StopOutlined />}
          style={{
            backgroundColor: ROUTIC_COLORS.DARK_NAVY,
            color: ROUTIC_COLORS.BRIGHT_ORANGE,
            borderColor: ROUTIC_COLORS.BRIGHT_ORANGE,
            fontWeight: 700,
          }}
        >
          {label}
        </Tag>
      );

    default:
      return (
        <Tag
          icon={<ExclamationCircleOutlined />}
          style={{
            backgroundColor: ROUTIC_COLORS.FRAME_BACKGROUND_GRAY,
            color: ROUTIC_COLORS.SLATE_GRAY,
            borderColor: ROUTIC_COLORS.LIGHT_BLUE_GRAY,
            fontWeight: 500,
          }}
        >
          {label}
        </Tag>
      );
  }
};
