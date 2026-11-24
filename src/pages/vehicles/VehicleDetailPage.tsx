import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Row,
  Col,
  Tag,
  Button,
  Space,
  Typography,
  Descriptions,
  Modal,
  Form,
  Input,
  InputNumber,
  Radio,
  Image,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
  EnvironmentOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { apiClient } from '../../api/client';
import { ROUTIC_COLORS } from '../../theme/colors';
import { useRouticTheme } from '../../theme/ThemeContext';

const { Title, Text } = Typography;
const { TextArea } = Input;

export const VehicleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mode } = useRouticTheme();
  const isLight = mode === 'light';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [form] = Form.useForm();

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await apiClient.get(`/vehicles/${id}`);
      if (res.data?.success) {
        setData(res.data.data);
      }
    } catch (err: unknown) {
      const errorMsg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Failed to load vehicle details';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleReviewSubmit = async (values: any) => {
    if (!id) return;
    setSubmittingReview(true);
    try {
      const payload: Record<string, any> = {
        action: values.action,
        decisionReason: values.decisionReason,
        reviewNotes: values.reviewNotes,
      };

      if (values.securityDepositNgn) {
        // Convert NGN to kobo
        payload.securityDepositAmount = Math.round(values.securityDepositNgn * 100);
      }

      const res = await apiClient.patch(`/vehicles/admin/${id}/review`, payload);
      if (res.data?.success) {
        message.success('Vehicle listing adjudicated successfully.');
        setIsReviewModalVisible(false);
        form.resetFields();
        fetchDetail();
      }
    } catch (err: unknown) {
      const errorMsg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Failed to adjudicate vehicle listing';
      message.error(errorMsg);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <Card
        loading
        style={{
          borderRadius: 12,
          backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
        }}
      />
    );
  }

  if (!data) {
    return (
      <Card style={{ borderRadius: 12, textAlign: 'center', padding: 48 }}>
        <Text>Vehicle record not found.</Text>
        <div style={{ marginTop: 16 }}>
          <Button onClick={() => navigate('/vehicles')}>Return to Queue</Button>
        </div>
      </Card>
    );
  }

  const dailyRateNgn = (data.pricing?.dailyRate || 0) / 100;
  const depositNgn = (data.pricing?.securityDepositAmount || 0) / 100;

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Space direction="horizontal" size={12}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/vehicles')}
            style={{
              borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
              color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
            }}
          >
            Listings Queue
          </Button>
          <Title
            level={3}
            style={{
              margin: 0,
              color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
              fontWeight: 700,
            }}
          >
            {data.specs?.year} {data.specs?.make} {data.specs?.model}
          </Title>
        </Space>

        <Space direction="horizontal" size={12}>
          <Button
            type="primary"
            onClick={() => {
              form.setFieldsValue({
                action: 'APPROVE',
                securityDepositNgn: depositNgn > 0 ? depositNgn : 50000,
              });
              setIsReviewModalVisible(true);
            }}
            style={{
              backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE,
              borderColor: ROUTIC_COLORS.BRIGHT_ORANGE,
              color: ROUTIC_COLORS.WHITE,
              fontWeight: 600,
              height: 40,
              padding: '0 20px',
            }}
          >
            Review & Adjudicate
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        {/* Specs & Pricing */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <span
                style={{
                  color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
                  fontWeight: 600,
                }}
              >
                Specifications & Pricing
              </span>
            }
            bordered
            style={{
              borderRadius: 12,
              backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
              borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
              marginBottom: 16,
            }}
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Registration Plate">
                <Text code strong>{data.plateNumber}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="VIN">
                <Text code>{data.vin || 'N/A'}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Listing Status">
                <Tag
                  style={{
                    backgroundColor: ROUTIC_COLORS.ROYAL_NAVY,
                    color: ROUTIC_COLORS.WHITE,
                    border: 'none',
                    fontWeight: 600,
                  }}
                >
                  {data.listingStatus}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Verification">
                <Tag
                  style={{
                    backgroundColor: ROUTIC_COLORS.GOLDEN_AMBER,
                    color: ROUTIC_COLORS.DARK_NAVY,
                    border: 'none',
                    fontWeight: 700,
                  }}
                >
                  {data.verificationStatus}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Transmission">{data.specs?.transmission}</Descriptions.Item>
              <Descriptions.Item label="Fuel Type">{data.specs?.fuelType}</Descriptions.Item>
              <Descriptions.Item label="Body Type">{data.specs?.bodyType}</Descriptions.Item>
              <Descriptions.Item label="Seats / Doors">
                {data.specs?.seats} Seats · {data.specs?.doors} Doors
              </Descriptions.Item>
              <Descriptions.Item label="Daily Rate">
                <Text strong style={{ color: ROUTIC_COLORS.BRIGHT_ORANGE, fontSize: 16 }}>
                  ₦{dailyRateNgn.toLocaleString()}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Deposit Amount">
                <Text strong style={{ color: ROUTIC_COLORS.GOLDEN_AMBER }}>
                  {depositNgn > 0 ? `₦${depositNgn.toLocaleString()}` : 'None Fixed'}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Submitted">
                {dayjs(data.createdAt).format('YYYY-MM-DD HH:mm')}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Location Details */}
          <Card
            title={
              <Space>
                <EnvironmentOutlined style={{ color: ROUTIC_COLORS.BRIGHT_ORANGE }} />
                <span
                  style={{
                    color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
                    fontWeight: 600,
                  }}
                >
                  Location & Handover Address
                </span>
              </Space>
            }
            bordered
            style={{
              borderRadius: 12,
              backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
              borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
            }}
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Public Area">
                {data.location?.publicApproximate?.neighborhood},{' '}
                {data.location?.publicApproximate?.city},{' '}
                {data.location?.publicApproximate?.state}
              </Descriptions.Item>
              <Descriptions.Item label="Private Street Address">
                <Text strong>{data.location?.privatePickupAddress?.streetAddress || 'Restricted'}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Landmark">
                {data.location?.privatePickupAddress?.landmark || 'None provided'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Vehicle Photos Gallery */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <span
                style={{
                  color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
                  fontWeight: 600,
                }}
              >
                Inspection Media Gallery ({data.media?.length || 0} Photos)
              </span>
            }
            bordered
            style={{
              borderRadius: 12,
              backgroundColor: isLight ? ROUTIC_COLORS.WHITE : ROUTIC_COLORS.DEEP_NAVY,
              borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
            }}
          >
            <Row gutter={[16, 16]}>
              {data.media?.map((photo: any, idx: number) => (
                <Col xs={24} sm={12} key={idx}>
                  <Card
                    size="small"
                    bordered
                    style={{
                      borderRadius: 8,
                      backgroundColor: isLight ? ROUTIC_COLORS.OFF_WHITE_GRAY : ROUTIC_COLORS.MIDNIGHT_BLUE,
                      borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
                    }}
                  >
                    <div style={{ marginBottom: 6 }}>
                      <Tag
                        style={{
                          backgroundColor: ROUTIC_COLORS.ROYAL_NAVY,
                          color: ROUTIC_COLORS.WHITE,
                          border: 'none',
                        }}
                      >
                        {photo.type || 'PHOTO'}
                      </Tag>
                      {photo.isPrimary && (
                        <Tag
                          style={{
                            backgroundColor: ROUTIC_COLORS.GOLDEN_AMBER,
                            color: ROUTIC_COLORS.DARK_NAVY,
                            border: 'none',
                            fontWeight: 600,
                          }}
                        >
                          PRIMARY
                        </Tag>
                      )}
                    </div>
                    <div
                      style={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isLight ? ROUTIC_COLORS.FRAME_BACKGROUND_GRAY : ROUTIC_COLORS.DARK_NAVY,
                        borderRadius: 6,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={photo.url}
                        alt="Vehicle photo"
                        style={{ maxHeight: 200, objectFit: 'contain' }}
                      />
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Review Modal */}
      <Modal
        title="Adjudicate Vehicle Listing"
        open={isReviewModalVisible}
        onCancel={() => setIsReviewModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleReviewSubmit}
          initialValues={{ action: 'APPROVE', securityDepositNgn: depositNgn }}
        >
          <Form.Item
            name="action"
            label="Administrative Action"
            rules={[{ required: true, message: 'Please select an action' }]}
          >
            <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
              <Radio.Button value="APPROVE" style={{ width: '33%', textAlign: 'center' }}>
                <CheckCircleOutlined /> Approve
              </Radio.Button>
              <Radio.Button value="REJECT" style={{ width: '33%', textAlign: 'center' }}>
                <CloseCircleOutlined /> Reject
              </Radio.Button>
              <Radio.Button value="SUSPEND" style={{ width: '33%', textAlign: 'center' }}>
                <StopOutlined /> Suspend
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="decisionReason"
            label="Decision Reason (Mandatory Compliance Reason)"
            rules={[{ required: true, message: 'Reason is required for audit trail' }]}
          >
            <Input placeholder="e.g. Valid documents, clear inspection photos, roadworthy" />
          </Form.Item>

          <Form.Item
            name="securityDepositNgn"
            label="Approved Security Deposit (NGN)"
            help="Fixed exclusively by admin. Set in Naira (will be converted to minor units)."
          >
            <InputNumber
              style={{ width: '100%' }}
              prefix={<DollarOutlined />}
              formatter={(value) => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => (value ? Number(value.replace(/₦\s?|(,*)/g, '')) : 0) as any}
              min={0}
            />
          </Form.Item>

          <Form.Item name="reviewNotes" label="Internal Review Notes (Not Customer Visible)">
            <TextArea rows={3} placeholder="Private notes for compliance audit" />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
            <Button onClick={() => setIsReviewModalVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submittingReview}
              style={{
                backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE,
                borderColor: ROUTIC_COLORS.BRIGHT_ORANGE,
              }}
            >
              Commit Review Decision
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
