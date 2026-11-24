import React from 'react';
import { useParams } from 'react-router-dom';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <GatedPhasePlaceholder
      phaseNumber={13}
      phaseName={`User Dossier #${id || 'Profile'}`}
      description="Full identity, trust, financial, and compliance history for a platform participant."
      backendModule="UsersModule"
      backendPath="src/users/users.service.ts"
      requiredEndpoints={[
        `GET /api/v1/users/admin/${id || ':id'} — Complete user dossier`,
        `POST /api/v1/users/admin/${id || ':id'}/suspend — High-risk action: account suspension`,
      ]}
      expectedFeatures={[
        'Clerk ID mapping and metadata inspection',
        'Government KYC validation timestamps (NIN, BVN, FRSC license)',
        'Lifetime GMV, payout volume, and cancellation statistics',
        'Direct safety audit trail of all actions performed by or against this user',
      ]}
    />
  );
};
