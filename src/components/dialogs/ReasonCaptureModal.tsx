import React from 'react';
import { Modal, Form, Input, Typography, Alert } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ROUTIC_COLORS } from '../../theme/colors';
import { useRouticTheme } from '../../theme/ThemeContext';
import { requiredReasonRule } from '../../lib/validation';

const { Text } = Typography;
const { TextArea } = Input;

export interface ReasonCaptureModalProps {
  visible: boolean;
  title: string;
  actionName: string;
  targetDescription: string;
  danger?: boolean;
  confirmLoading?: boolean;
  onConfirm: (reason: string) => Promise<void> | void;
  onCancel: () => void;
}

export const ReasonCaptureModal: React.FC<ReasonCaptureModalProps> = ({
  visible,
  title,
  actionName,
  targetDescription,
  danger = false,
  confirmLoading = false,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { mode } = useRouticTheme();
  const isLight = mode === 'light';

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onConfirm(values.reason);
      form.resetFields();
    } catch {
      // Form validation failed
    }
  };

  const handleClose = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      open={visible}
      title={title}
      okText={actionName}
      cancelText="Cancel"
      okButtonProps={{
        danger,
        loading: confirmLoading,
        style: danger
          ? { backgroundColor: ROUTIC_COLORS.BRIGHT_ORANGE, borderColor: ROUTIC_COLORS.BRIGHT_ORANGE }
          : { backgroundColor: ROUTIC_COLORS.DEEP_NAVY, borderColor: ROUTIC_COLORS.ROYAL_NAVY },
      }}
      onOk={handleOk}
      onCancel={handleClose}
      destroyOnClose
    >
      <div style={{ marginBottom: 16 }}>
        <Alert
          showIcon
          icon={<ExclamationCircleOutlined />}
          type="warning"
          message="Administrative Audit Requirement"
          description={`You are about to execute "${actionName}" on: ${targetDescription}. Every administrative mutation is permanently recorded in the append-only audit ledger with your Clerk Admin ID, timestamp, and this mandatory reason.`}
          style={{
            backgroundColor: isLight ? ROUTIC_COLORS.OFF_WHITE_GRAY : ROUTIC_COLORS.DARK_NAVY,
            borderColor: isLight ? ROUTIC_COLORS.LIGHT_BLUE_GRAY : ROUTIC_COLORS.ROYAL_NAVY,
            borderRadius: 8,
          }}
        />
      </div>

      <Form form={form} layout="vertical">
        <Form.Item
          name="reason"
          label={
            <Text strong style={{ color: isLight ? ROUTIC_COLORS.DEEP_NAVY : ROUTIC_COLORS.WHITE }}>
              Mandatory Action Reason
            </Text>
          }
          rules={requiredReasonRule}
        >
          <TextArea
            rows={4}
            placeholder="Explain the regulatory, compliance, or operational reason for this action..."
            maxLength={500}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
