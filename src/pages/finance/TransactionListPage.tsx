import React from 'react';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const TransactionListPage: React.FC = () => {
  return (
    <GatedPhasePlaceholder
      phaseNumber={5}
      phaseName="Financial Operations & Payment Ledger"
      description="Paystack payment settlement monitoring, webhook reconciliation ledger, security deposit authorizations, and manual refund processing."
      backendModule="PaymentsModule"
      backendPath="src/payments/payments.module.ts"
      requiredEndpoints={[
        'GET /api/v1/payments/admin/transactions — Central ledger of all Paystack charges and refunds',
        'GET /api/v1/payments/admin/deposits — Escrowed caution deposit holds and release queue',
        'POST /api/v1/payments/admin/reconcile/:reference — Force re-query Paystack API for missing webhook status',
        'POST /api/v1/payments/admin/refund — Issue administrative partial or full refund with reason',
      ]}
      expectedFeatures={[
        'Real-time Paystack transaction status indicators (SUCCESS, FAILED, PENDING, ABANDONED)',
        'Deposit hold management: release to guest, forfeit to host, or partial claim',
        'Webhook delivery logs and replay tools',
        'Kobo to NGN automated conversions with fee transparency',
      ]}
    />
  );
};
