import React from 'react';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const RentalListPage: React.FC = () => {
  return (
    <GatedPhasePlaceholder
      phaseNumber={6}
      phaseName="Active Rentals & Handover Operations"
      description="Live operational monitoring of active vehicle handovers, start-code and return-code exchanges, GPS tracking, and return extensions."
      backendModule="RentalsModule"
      backendPath="src/rentals/rentals.module.ts"
      requiredEndpoints={[
        'GET /api/v1/rentals/admin/active — All currently ongoing vehicle rentals on the road',
        'GET /api/v1/rentals/admin/overdue — Overdue vehicles with pending return code check-ins',
        'POST /api/v1/rentals/admin/:id/override-handover — Force handover verification if network fails at location',
        'POST /api/v1/rentals/admin/:id/terminate — Early termination or recovery trigger',
      ]}
      expectedFeatures={[
        'Real-time countdown to scheduled return time',
        'Handover verification badge: Start Code Confirmed / Return Code Confirmed',
        'Live emergency intervention controls for stuck handovers',
        'Late fee automated computation inspector',
      ]}
    />
  );
};
