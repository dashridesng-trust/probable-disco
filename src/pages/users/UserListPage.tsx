import React from 'react';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const UserListPage: React.FC = () => {
  return (
    <GatedPhasePlaceholder
      phaseNumber={13}
      phaseName="User Accounts & Identity Profiles"
      description="Read-only directory of Routic platform users (Hosts and Guests), account verification levels, security flags, and suspension controls."
      backendModule="UsersModule"
      backendPath="src/users/users.module.ts"
      requiredEndpoints={[
        'GET /api/v1/users/admin/all — Search users by phone, email, BVN status, or role',
        'GET /api/v1/users/admin/:id — Complete user trust profile and activity dossier',
        'POST /api/v1/users/admin/:id/suspend — Suspend account access with mandatory reason',
        'POST /api/v1/users/admin/:id/reactivate — Restore suspended account',
      ]}
      expectedFeatures={[
        'Strict RBAC compliance: NO admin invitation or role creation in this UI',
        'Identity verification overview: BVN, NIN, Driver License, and Phone verification statuses',
        'Aggregated trust score: completed trips, cancellation rate, dispute history',
        'Direct link to all associated vehicles and booking history',
      ]}
    />
  );
};
