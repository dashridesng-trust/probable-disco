import React from 'react';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const DisputeListPage: React.FC = () => {
  return (
    <GatedPhasePlaceholder
      phaseNumber={10}
      phaseName="Dispute Adjudication & Deposit Claims"
      description="Formal disputes raised between hosts and guests regarding late returns, fuel discrepancies, damage deductions, and cleaning fees."
      backendModule="DisputesModule"
      backendPath="src/disputes/disputes.module.ts"
      requiredEndpoints={[
        'GET /api/v1/disputes/admin/active — Pending disputes requiring administrator arbitration',
        'GET /api/v1/disputes/admin/:id — Full evidence timeline submitted by both host and guest',
        'POST /api/v1/disputes/admin/:id/adjudicate — Formal ruling: split deposit, award to host, or refund guest',
      ]}
      expectedFeatures={[
        'Adjudication workbench displaying host claim vs guest counterclaim',
        'Evidence comparator (photos, messages, timestamps, invoices)',
        'Deposit apportionment slider with precise kobo accuracy',
        'Mandatory written arbitration justification published to both parties',
      ]}
    />
  );
};
