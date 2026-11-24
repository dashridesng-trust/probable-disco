import React from 'react';
import { useParams } from 'react-router-dom';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <GatedPhasePlaceholder
      phaseNumber={4}
      phaseName={`Booking Record #${id || 'Detail'}`}
      description="In-depth audit dossier for a single booking: inspection links, deposit escrows, payment transaction logs, and lifecycle timeline."
      backendModule="BookingsModule"
      backendPath="src/bookings/bookings.service.ts"
      requiredEndpoints={[
        `GET /api/v1/bookings/admin/${id || ':id'} — Full booking dossier`,
        `PATCH /api/v1/bookings/admin/${id || ':id'}/adjust-dates — Administrative date adjustment`,
        `POST /api/v1/bookings/admin/${id || ':id'}/refund — Initiate full or partial refund`,
      ]}
      expectedFeatures={[
        'Interactive timeline from requested → confirmed → ongoing → completed',
        'Direct inspection report comparisons (pre-rental vs post-rental)',
        'Escrow balance inspection and release state',
        'One-click dispute escalation bridge',
      ]}
    />
  );
};
