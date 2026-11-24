import React from 'react';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const PayoutListPage: React.FC = () => {
  return (
    <GatedPhasePlaceholder
      phaseNumber={8}
      phaseName="Host Payouts & Settlement Transfers"
      description="Bank disbursement approval, host payout batches, automated Paystack transfer integration, hold suspensions, and earnings verification."
      backendModule="PayoutsModule"
      backendPath="src/payouts/payouts.module.ts"
      requiredEndpoints={[
        'GET /api/v1/payouts/admin/queue — Pending host payouts awaiting automated or manual release',
        'GET /api/v1/payouts/admin/held — Payouts under temporary fraud or dispute hold',
        'POST /api/v1/payouts/admin/:id/approve — High-risk action: approve disbursement to verified Nigerian bank account',
        'POST /api/v1/payouts/admin/:id/hold — Place hold on payout with mandatory audit reason',
      ]}
      expectedFeatures={[
        'Double-confirmation modal with mandatory reason prompt for release or hold',
        'Host bank account verification indicator (NUBAN name inquiry match)',
        'Detailed fee deduction breakdown (platform commission, insurance, net host payout)',
        'Batch disbursement triggers with CSV export support',
      ]}
    />
  );
};
