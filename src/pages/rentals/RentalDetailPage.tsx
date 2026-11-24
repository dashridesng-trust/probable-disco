import React from 'react';
import { useParams } from 'react-router-dom';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const RentalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <GatedPhasePlaceholder
      phaseNumber={6}
      phaseName={`Rental Operations #${id || 'Detail'}`}
      description="Live telemetry, inspection sign-offs, handover code audit logs, and operational controls for an individual rental instance."
      backendModule="RentalsModule"
      backendPath="src/rentals/rentals.service.ts"
      requiredEndpoints={[
        `GET /api/v1/rentals/admin/${id || ':id'} — Comprehensive rental telemetry`,
        `POST /api/v1/rentals/admin/${id || ':id'}/extend — Administrative rental extension with prorated charge`,
        `POST /api/v1/rentals/admin/${id || ':id'}/mark-returned — Administrative return signoff`,
      ]}
      expectedFeatures={[
        'Start condition vs return condition comparison tab',
        'Odometer reading and fuel level variance detector',
        'GPS coordinates of check-in and check-out handovers',
        'Full audit history of PIN code attempts',
      ]}
    />
  );
};
