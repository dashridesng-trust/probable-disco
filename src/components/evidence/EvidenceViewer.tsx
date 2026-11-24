import React, { useState } from 'react';
import { Modal, Image, Typography, Space, Button } from 'antd';
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import { ROUTIC_COLORS } from '../../theme/colors';

const { Text } = Typography;

export interface EvidenceViewerProps {
  title: string;
  fileUrl?: string;
  fileType?: 'image' | 'pdf' | 'document';
  description?: string;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({
  title,
  fileUrl,
  fileType = 'image',
  description,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (!fileUrl) {
    return (
      <Text type="secondary" style={{ color: ROUTIC_COLORS.COOL_GRAY }}>
        No evidence file provided
      </Text>
    );
  }

  return (
    <>
      <Space>
        {fileType === 'image' ? (
          <Image
            src={fileUrl}
            alt={title}
            width={72}
            height={52}
            style={{ objectFit: 'cover', borderRadius: 6, border: `1px solid ${ROUTIC_COLORS.LIGHT_BLUE_GRAY}` }}
          />
        ) : (
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => setModalOpen(true)}
            style={{
              borderColor: ROUTIC_COLORS.LIGHT_BLUE_GRAY,
              color: ROUTIC_COLORS.DEEP_NAVY,
            }}
          >
            Inspect Document
          </Button>
        )}
      </Space>

      <Modal
        open={modalOpen}
        title={title}
        footer={[
          <Button
            key="download"
            icon={<DownloadOutlined />}
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in New Window
          </Button>,
          <Button key="close" type="primary" onClick={() => setModalOpen(false)}>
            Close
          </Button>,
        ]}
        onCancel={() => setModalOpen(false)}
        width={720}
      >
        {description && (
          <Text style={{ display: 'block', marginBottom: 12, color: ROUTIC_COLORS.SLATE_GRAY }}>
            {description}
          </Text>
        )}
        <div style={{ textAlign: 'center', minHeight: 300 }}>
          {fileType === 'image' ? (
            <img src={fileUrl} alt={title} style={{ maxWidth: '100%', maxHeight: 500, objectFit: 'contain' }} />
          ) : (
            <iframe
              src={fileUrl}
              title={title}
              style={{ width: '100%', height: 450, border: 'none' }}
            />
          )}
        </div>
      </Modal>
    </>
  );
};
