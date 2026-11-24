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
  Select,
  DatePicker,
  Image,
  message,
  Divider,
} from 'antd';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { apiClient } from '../../api/client';
import { ROUTIC_COLORS } from '../../theme/colors';
import { useRouticTheme } from '../../theme/ThemeContext';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export const VerificationDetailPage: React.FC = () => {
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
      const res = await apiClient.get(`/verifications/${id}`);
      if (res.data?.success) {
        setData(res.data.data);
      }
    } catch (err: unknown) {
      const errorMsg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Failed to load case details';
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
        status: values.status,
        decisionReason: values.decisionReason,
        reviewNotes: values.reviewNotes,
      };

      if (values.driverLicenseExpiryDate) {
        payload.driverLicenseExpiryDate = values.driverLicenseExpiryDate.toISOString();
      }
      if (values.vehicleLicenseExpiryDate) {
        payload.vehicleLicenseExpiryDate = values.vehicleLicenseExpiryDate.toISOString();
      }
      if (values.roadWorthinessExpiryDate) {
        payload.roadWorthinessExpiryDate = values.roadWorthinessExpiryDate.toISOString();
      }
      if (values.insuranceExpiryDate) {
        payload.insuranceExpiryDate = values.insuranceExpiryDate.toISOString();
      }
      if (values.hackneyPermitExpiryDate) {
        payload.hackneyPermitExpiryDate = values.hackneyPermitExpiryDate.toISOString();
      }

      const res = await apiClient.patch(`/verifications/${id}/review`, payload);
      if (res.data?.success) {
        message.success('Verification case adjudicated successfully.');
        setIsReviewModalVisible(false);
        form.resetFields();
        fetchDetail();
      }
    } catch (err: unknown) {
      const errorMsg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Failed to adjudicate verification';
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
        <Text>Verification record not found.</Text>
        <div style={{ marginTop: 16 }}>
          <Button onClick={() => navigate('/verifications')}>Return to Queue</Button>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Top Bar */}
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
            onClick={() => navigate('/verifications')}
            style={{
              borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
              color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
            }}
          >
            Queue
          </Button>
          <Title
            level={3}
            style={{
              margin: 0,
              color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
              fontWeight: 700,
            }}
          >
            Verification Case: {data.targetType} ({data.applicantType})
          </Title>
        </Space>

        <Space direction="horizontal" size={12}>
          <Button
            type="primary"
            onClick={() => setIsReviewModalVisible(true)}
            style={{
              backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE,
              borderColor: ROUTIC_COLORS.BRIGHT_ORANGE,
              color: ROUTIC_COLORS.WHITE,
              fontWeight: 600,
              height: 40,
              padding: '0 20px',
            }}
          >
            Adjudicate Case
          </Button>
        </Space>
      </div>

      {/* Case Overview & Document Evidence */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card
            title={
              <span
                style={{
                  color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
                  fontWeight: 600,
                }}
              >
                Case Metadata
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
              <Descriptions.Item label="Case ID">
                <Text code>{data._id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Target Type">
                <Tag
                  style={{
                    backgroundColor: ROUTIC_COLORS.ROYAL_NAVY,
                    color: ROUTIC_COLORS.WHITE,
                    border: 'none',
                    fontWeight: 600,
                  }}
                >
                  {data.targetType}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Applicant Type">
                <Text strong>{data.applicantType}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Current Status">
                <Tag
                  style={{
                    backgroundColor:
                      data.status === 'APPROVED'
                        ? ROUTIC_COLORS.ROYAL_NAVY
                        : data.status === 'PENDING'
                        ? ROUTIC_COLORS.GOLDEN_AMBER
                        : ROUTIC_COLORS.BRIGHT_ORANGE,
                    color:
                      data.status === 'PENDING'
                        ? ROUTIC_COLORS.DARK_NAVY
                        : ROUTIC_COLORS.WHITE,
                    border: 'none',
                    fontWeight: 700,
                  }}
                >
                  {data.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Submitted">
                {dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
              {data.reviewedAt && (
                <Descriptions.Item label="Reviewed At">
                  {dayjs(data.reviewedAt).format('YYYY-MM-DD HH:mm:ss')}
                </Descriptions.Item>
              )}
              {data.decisionReason && (
                <Descriptions.Item label="Decision Reason">
                  <Text type="danger">{data.decisionReason}</Text>
                </Descriptions.Item>
              )}
              {data.reviewNotes && (
                <Descriptions.Item label="Internal Notes">
                  <Text>{data.reviewNotes}</Text>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          {/* GPS Pin Drop Comparison Card */}
          {data.locationPin && (
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
                    Applicant GPS Pin Drop
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
              <Paragraph style={{ fontSize: 13, color: ROUTIC_COLORS.SLATE_GRAY }}>
                Captured via device GPS during proof-of-address submission:
              </Paragraph>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Latitude">{data.locationPin.latitude}</Descriptions.Item>
                <Descriptions.Item label="Longitude">{data.locationPin.longitude}</Descriptions.Item>
                <Descriptions.Item label="Accuracy">
                  ±{data.locationPin.accuracy ?? 0}m
                </Descriptions.Item>
                <Descriptions.Item label="Captured">
                  {dayjs(data.locationPin.capturedAt).format('YYYY-MM-DD HH:mm')}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        </Col>

        {/* Document Evidence Viewer */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <span
                style={{
                  color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE,
                  fontWeight: 600,
                }}
              >
                Submitted Document Gallery ({data.documents?.length || 0} Files)
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
              {data.documents?.map((doc: any, index: number) => (
                <Col xs={24} sm={12} key={index}>
                  <Card
                    size="small"
                    bordered
                    style={{
                      borderRadius: 8,
                      backgroundColor: isLight ? ROUTIC_COLORS.OFF_WHITE_GRAY : ROUTIC_COLORS.MIDNIGHT_BLUE,
                      borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
                    }}
                  >
                    <div style={{ marginBottom: 8 }}>
                      <Tag
                        style={{
                          backgroundColor: ROUTIC_COLORS.ROYAL_NAVY,
                          color: ROUTIC_COLORS.WHITE,
                          border: 'none',
                          fontWeight: 600,
                        }}
                      >
                        {doc.type}
                      </Tag>
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
                        src={doc.url}
                        alt={doc.type}
                        style={{ maxHeight: 200, objectFit: 'contain' }}
                      />
                    </div>
                    <div style={{ marginTop: 8, fontSize: 11, color: ROUTIC_COLORS.SLATE_GRAY }}>
                      Uploaded: {dayjs(doc.uploadedAt).format('YYYY-MM-DD HH:mm')}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Adjudication Modal */}
      <Modal
        title="Adjudicate Verification Case"
        open={isReviewModalVisible}
        onCancel={() => setIsReviewModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleReviewSubmit}
          initialValues={{ status: 'APPROVED' }}
        >
          <Form.Item
            name="status"
            label="Decision Outcome"
            rules={[{ required: true, message: 'Please select an adjudication outcome' }]}
          >
            <Select
              options={[
                {
                  label: (
                    <span style={{ color: ROUTIC_COLORS.ROYAL_NAVY, fontWeight: 600 }}>
                      <CheckCircleOutlined /> Approve
                    </span>
                  ),
                  value: 'APPROVED',
                },
                {
                  label: (
                    <span style={{ color: ROUTIC_COLORS.BRIGHT_ORANGE, fontWeight: 600 }}>
                      <CloseCircleOutlined /> Reject
                    </span>
                  ),
                  value: 'REJECTED',
                },
                {
                  label: (
                    <span style={{ color: ROUTIC_COLORS.GOLDEN_AMBER, fontWeight: 600 }}>
                      <ExclamationCircleOutlined /> Retry Required
                    </span>
                  ),
                  value: 'RETRY_REQUIRED',
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="decisionReason"
            label="Decision Reason (Mandatory Audit Code)"
            rules={[{ required: true, message: 'Decision reason is required for compliance audit' }]}
          >
            <Input placeholder="e.g. Valid Driver's license verified on FRSC / NIID Portal" />
          </Form.Item>

          <Form.Item name="reviewNotes" label="Internal Review Notes (Not Customer Visible)">
            <TextArea
              rows={3}
              placeholder="Private notes for compliance audit trail"
            />
          </Form.Item>

          <Divider orientation="left" plain>
            <CalendarOutlined /> Document Expiry Dates (Audit & Reverification)
          </Divider>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="driverLicenseExpiryDate" label="Driver License Expiry">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="insuranceExpiryDate" label="Insurance Expiry">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="roadWorthinessExpiryDate" label="Road Worthiness Expiry">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="vehicleLicenseExpiryDate" label="Vehicle License Expiry">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

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
              Commit Adjudication
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
