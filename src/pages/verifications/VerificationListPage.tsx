import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Card,
  Tag,
  Button,
  Space,
  Select,
  Typography,
  Radio,
  Pagination,
  message,
} from 'antd';
import {
  EyeOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  CarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { apiClient } from '../../api/client';
import { ROUTIC_COLORS } from '../../theme/colors';
import { useRouticTheme } from '../../theme/ThemeContext';

const { Title, Text } = Typography;

export interface VerificationItem {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | string;
  targetType: 'USER' | 'VEHICLE';
  vehicleId?: {
    _id: string;
    specs: {
      make: string;
      model: string;
      year: number;
    };
    plateNumber: string;
  } | string;
  applicantType: 'INDIVIDUAL' | 'CORPORATE';
  status:
    | 'NOT_STARTED'
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'RETRY_REQUIRED'
    | 'EXPIRED'
    | 'REVERIFICATION_REQUIRED';
  documents: Array<{
    type: string;
    url: string;
    uploadedAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export const VerificationListPage: React.FC = () => {
  const navigate = useNavigate();
  const { mode, tableDensity } = useRouticTheme();
  const isLight = mode === 'light';

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<VerificationItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [targetType, setTargetType] = useState<'ALL' | 'USER' | 'VEHICLE'>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const fetchCases = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = {
        page,
        limit,
      };
      if (targetType !== 'ALL') {
        params['targetType'] = targetType;
      }
      if (statusFilter !== 'ALL') {
        params['status'] = statusFilter;
      }

      const res = await apiClient.get('/verifications', { params });
      if (res.data?.success) {
        setData(res.data.data || []);
        setTotal(res.data.total || 0);
      }
    } catch (err: unknown) {
      const errorMsg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Failed to load verification queue';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [page, limit, targetType, statusFilter]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const getStatusTag = (status: VerificationItem['status']) => {
    switch (status) {
      case 'APPROVED':
        return (
          <Tag
            style={{
              backgroundColor: ROUTIC_COLORS.ROYAL_NAVY,
              color: ROUTIC_COLORS.WHITE,
              border: 'none',
              fontWeight: 600,
            }}
          >
            APPROVED
          </Tag>
        );
      case 'PENDING':
        return (
          <Tag
            style={{
              backgroundColor: ROUTIC_COLORS.GOLDEN_AMBER,
              color: ROUTIC_COLORS.DARK_NAVY,
              border: 'none',
              fontWeight: 700,
            }}
          >
            PENDING REVIEW
          </Tag>
        );
      case 'REJECTED':
        return (
          <Tag
            style={{
              backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE,
              color: ROUTIC_COLORS.WHITE,
              border: 'none',
              fontWeight: 600,
            }}
          >
            REJECTED
          </Tag>
        );
      case 'RETRY_REQUIRED':
        return (
          <Tag
            style={{
              backgroundColor: ROUTIC_COLORS.MUTED_LAVENDER,
              color: ROUTIC_COLORS.DEEP_NAVY,
              border: 'none',
              fontWeight: 600,
            }}
          >
            RETRY REQUIRED
          </Tag>
        );
      default:
        return (
          <Tag
            style={{
              backgroundColor: ROUTIC_COLORS.LIGHT_GRAY,
              color: ROUTIC_COLORS.SLATE_GRAY,
              border: 'none',
            }}
          >
            {status}
          </Tag>
        );
    }
  };

  const columns = [
    {
      title: 'Target Type',
      dataIndex: 'targetType',
      key: 'targetType',
      render: (val: string) => (
        <Space direction="horizontal" size={6}>
          {val === 'USER' ? (
            <UserOutlined style={{ color: ROUTIC_COLORS.BRIGHT_ORANGE }} />
          ) : (
            <CarOutlined style={{ color: ROUTIC_COLORS.GOLDEN_AMBER }} />
          )}
          <Text strong style={{ color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE }}>
            {val}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Applicant Category',
      dataIndex: 'applicantType',
      key: 'applicantType',
      render: (val: string) => (
        <Text style={{ color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER }}>
          {val}
        </Text>
      ),
    },
    {
      title: 'Documents Submitted',
      dataIndex: 'documents',
      key: 'documents',
      render: (docs: VerificationItem['documents']) => (
        <Tag
          style={{
            backgroundColor: isLight ? ROUTIC_COLORS.PALE_LAVENDER : ROUTIC_COLORS.MIDNIGHT_BLUE,
            color: isLight ? ROUTIC_COLORS.ROYAL_NAVY : ROUTIC_COLORS.SOFT_OFF_WHITE,
            border: 'none',
            fontWeight: 600,
          }}
        >
          {docs?.length || 0} files
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (st: VerificationItem['status']) => getStatusTag(st),
    },
    {
      title: 'Submitted At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <Text style={{ color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER }}>
          {dayjs(date).format('YYYY-MM-DD HH:mm')}
        </Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right' as const,
      render: (_: unknown, record: VerificationItem) => (
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/verifications/${record._id}`)}
          style={{
            backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE,
            borderColor: ROUTIC_COLORS.BRIGHT_ORANGE,
            color: ROUTIC_COLORS.WHITE,
            fontWeight: 600,
          }}
        >
          Inspect & Review
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Header and Filter Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <Title
            level={3}
            style={{
              margin: 0,
              color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
              fontWeight: 700,
            }}
          >
            Verification Review Queue
          </Title>
          <Text
            style={{
              color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
              fontSize: 13,
            }}
          >
            Phase 2 Active · Adjudicate identity, driver licenses, and vehicle compliance
          </Text>
        </div>

        <Space direction="horizontal" size={12}>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => fetchCases()}
            loading={loading}
            style={{
              borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
              color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
            }}
          >
            Refresh
          </Button>
        </Space>
      </div>

      <Card
        bordered
        style={{
          borderRadius: 12,
          backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
          borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
        }}
      >
        {/* Filters Toolbar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <Space direction="horizontal" size={16} wrap>
            <Radio.Group
              value={targetType}
              onChange={(e) => {
                setTargetType(e.target.value);
                setPage(1);
              }}
              buttonStyle="solid"
            >
              <Radio.Button value="ALL">All Targets</Radio.Button>
              <Radio.Button value="USER">
                <UserOutlined /> Users
              </Radio.Button>
              <Radio.Button value="VEHICLE">
                <CarOutlined /> Vehicles
              </Radio.Button>
            </Radio.Group>

            <Select
              value={statusFilter}
              onChange={(val) => {
                setStatusFilter(val);
                setPage(1);
              }}
              style={{ width: 180 }}
              options={[
                { label: 'All Statuses', value: 'ALL' },
                { label: 'Pending Review', value: 'PENDING' },
                { label: 'Approved', value: 'APPROVED' },
                { label: 'Rejected', value: 'REJECTED' },
                { label: 'Retry Required', value: 'RETRY_REQUIRED' },
              ]}
            />
          </Space>

          <Text
            style={{
              color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
              fontSize: 13,
            }}
          >
            Total: <Text strong>{total}</Text> cases
          </Text>
        </div>

        <Table
          rowKey="_id"
          size={tableDensity}
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={false}
          locale={{
            emptyText: (
              <div style={{ padding: '32px 0', textAlign: 'center' }}>
                <SafetyCertificateOutlined
                  style={{ fontSize: 40, color: ROUTIC_COLORS.MUTED_BLUE_GRAY, marginBottom: 12 }}
                />
                <br />
                <Text style={{ color: ROUTIC_COLORS.SLATE_GRAY }}>
                  No verification cases found matching current filters.
                </Text>
              </div>
            ),
          }}
        />

        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            current={page}
            pageSize={limit}
            total={total}
            showSizeChanger
            pageSizeOptions={['10', '20', '50']}
            onChange={(p, l) => {
              setPage(p);
              setLimit(l);
            }}
          />
        </div>
      </Card>
    </div>
  );
};
