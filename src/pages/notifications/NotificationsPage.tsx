import React from 'react';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const NotificationsPage: React.FC = () => {
  return (
    <GatedPhasePlaceholder
      phaseNumber={12}
      phaseName="System Notifications & Broadcast Dispatch"
      description="Emergency platform broadcast notices, automated SMS/Email/Push delivery logs, failure retries, and customer support alert queues."
      backendModule="NotificationsModule"
      backendPath="src/notifications/notifications.module.ts"
      requiredEndpoints={[
        'GET /api/v1/notifications/admin/logs — Outbound dispatch log with delivery receipts',
        'POST /api/v1/notifications/admin/broadcast — Dispatch urgent system-wide announcement to active drivers/hosts',
        'POST /api/v1/notifications/admin/retry/:id — Manually retry failed SMS/email dispatch',
      ]}
      expectedFeatures={[
        'Channel delivery status (Firebase Cloud Messaging, Termii SMS, SendGrid/Postmark Email)',
        'Targeted audience broadcast composer with preview',
        'Delivery error breakdown and failed webhook alerts',
      ]}
    />
  );
};
