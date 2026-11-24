import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Card,
  Tag,
  Button,
  Space,
  Select,
  Typography,
  Pagination,
  message,
} from 'antd';
import {
  EyeOutlined,
  ReloadOutlined,
  CarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { apiClient } from '../../api/client';
import { ROUTIC_COLORS } from '../../theme/colors';
import { useRouticTheme } from '../../theme/ThemeContext';

const { Title, Text } = Typography;

export interface VehicleItem {
  _id: string;
  ownerUserId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | string;
  specs: {
    make: string;
    model: string;
    year: number;
    transmission: string;
    fuelType: string;
  };
  pricing: {
    dailyRate: number; // in kobo
    securityDepositAmount?: number;
    securityDepositRequested?: boolean;
    currency: string;
  };
  location: {
    publicApproximate: {
      neighborhood: string;
      city: string;
      state: string;
    };
  };
  plateNumber: string;
  listingStatus:
    | 'DRAFT'
    | 'PENDING_REVIEW'
    | 'PUBLISHED'
    | 'UNPUBLISHED'
    | 'SUSPENDED'
    | 'REJECTED';
  verificationStatus:
    | 'NOT_STARTED'
    | 'IN_PROGRESS'
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'RETRY_REQUIRED';
  createdAt: string;
}

export const VehicleListPage: React.FC = () => {
  const navigate = useNavigate();
  const { mode, tableDensity } = useRouticTheme();
  const isLight = mode === 'light';

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<VehicleItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [listingStatus, setListingStatus] = useState<string>('ALL');
  const [verificationStatus, setVerificationStatus] = useState<string>('ALL');

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = {
        page,
        limit,
      };
      if (listingStatus !== 'ALL') {
        params['listingStatus'] = listingStatus;
      }
      if (verificationStatus !== 'ALL') {
        params['verificationStatus'] = verificationStatus;
      }

      const res = await apiClient.get('/vehicles/admin/queue', { params });
      if (res.data?.success) {
        setData(res.data.data || []);
        setTotal(res.data.total || 0);
      }
    } catch (err: unknown) {
      const errorMsg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Failed to load vehicles queue';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [page, limit, listingStatus, verificationStatus]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const getListingStatusTag = (status: VehicleItem['listingStatus']) => {
    switch (status) {
      case 'PUBLISHED':
        return (
          <Tag
            style={{
              backgroundColor: ROUTIC_COLORS.ROYAL_NAVY,
              color: ROUTIC_COLORS.WHITE,
              border: 'none',
              fontWeight: 600,
            }}
          >
            PUBLISHED
          </Tag>
        );
      case 'PENDING_REVIEW':
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
      case 'SUSPENDED':
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
            {status}
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
      title: 'Vehicle',
      key: 'vehicle',
      render: (_: unknown, r: VehicleItem) => (
        <div>
          <Space>
            <CarOutlined style={{ color: ROUTIC_COLORS.BRIGHT_ORANGE }} />
            <Text strong style={{ color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE }}>
              {r.specs?.year} {r.specs?.make} {r.specs?.model}
            </Text>
          </Space>
          <div style={{ fontSize: 11, color: ROUTIC_COLORS.SLATE_GRAY, marginTop: 2 }}>
            Plate: <Text code>{r.plateNumber || 'N/A'}</Text> · {r.specs?.transmission}
          </div>
        </div>
      ),
    },
    {
      title: 'Location',
      key: 'location',
      render: (_: unknown, r: VehicleItem) => (
        <Text style={{ color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER }}>
          {r.location?.publicApproximate?.city}, {r.location?.publicApproximate?.state}
        </Text>
      ),
    },
    {
      title: 'Daily Rate',
      key: 'pricing',
      render: (_: unknown, r: VehicleItem) => {
        const rateNgn = (r.pricing?.dailyRate || 0) / 100;
        return (
          <Text strong style={{ color: ROUTIC_COLORS.BRIGHT_ORANGE }}>
            ₦{rateNgn.toLocaleString()}
          </Text>
        );
      },
    },
    {
      title: 'Listing Status',
      dataIndex: 'listingStatus',
      key: 'listingStatus',
      render: (st: VehicleItem['listingStatus']) => getListingStatusTag(st),
    },
    {
      title: 'Verification',
      dataIndex: 'verificationStatus',
      key: 'verificationStatus',
      render: (st: VehicleItem['verificationStatus']) => (
        <Tag
          style={{
            backgroundColor:
              st === 'APPROVED'
                ? ROUTIC_COLORS.PALE_LAVENDER
                : isLight
                ? ROUTIC_COLORS.OFF_WHITE_GRAY
                : ROUTIC_COLORS.MIDNIGHT_BLUE,
            color:
              st === 'APPROVED'
                ? ROUTIC_COLORS.ROYAL_NAVY
                : ROUTIC_COLORS.SLATE_GRAY,
            border: 'none',
            fontWeight: 600,
          }}
        >
          {st}
        </Tag>
      ),
    },
    {
      title: 'Submitted',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <Text style={{ color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER }}>
          {dayjs(date).format('YYYY-MM-DD')}
        </Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right' as const,
      render: (_: unknown, record: VehicleItem) => (
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/vehicles/${record._id}`)}
          style={{
            backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE,
            borderColor: ROUTIC_COLORS.BRIGHT_ORANGE,
            color: ROUTIC_COLORS.WHITE,
            fontWeight: 600,
          }}
        >
          Inspect Listing
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
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
            Vehicle Supply & Listings Queue
          </Title>
          <Text
            style={{
              color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
              fontSize: 13,
            }}
          >
            Phase 3 Active · Review vehicle specifications, photo verification, and pricing
          </Text>
        </div>

        <Space direction="horizontal" size={12}>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => fetchVehicles()}
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
            <Select
              value={listingStatus}
              onChange={(val) => {
                setListingStatus(val);
                setPage(1);
              }}
              style={{ width: 180 }}
              options={[
                { label: 'All Listing Statuses', value: 'ALL' },
                { label: 'Pending Review', value: 'PENDING_REVIEW' },
                { label: 'Published', value: 'PUBLISHED' },
                { label: 'Unpublished', value: 'UNPUBLISHED' },
                { label: 'Suspended', value: 'SUSPENDED' },
                { label: 'Draft', value: 'DRAFT' },
              ]}
            />

            <Select
              value={verificationStatus}
              onChange={(val) => {
                setVerificationStatus(val);
                setPage(1);
              }}
              style={{ width: 180 }}
              options={[
                { label: 'All Verifications', value: 'ALL' },
                { label: 'Approved', value: 'APPROVED' },
                { label: 'Pending', value: 'PENDING' },
                { label: 'Rejected', value: 'REJECTED' },
              ]}
            />
          </Space>

          <Text
            style={{
              color: isLight ? ROUTIC_COLORS.SLATE_GRAY : ROUTIC_COLORS.MUTED_LAVENDER,
              fontSize: 13,
            }}
          >
            Total: <Text strong>{total}</Text> vehicles
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
                <CarOutlined
                  style={{ fontSize: 40, color: ROUTIC_COLORS.MUTED_BLUE_GRAY, marginBottom: 12 }}
                />
                <br />
                <Text style={{ color: ROUTIC_COLORS.SLATE_GRAY }}>
                  No vehicles found matching current filters.
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
