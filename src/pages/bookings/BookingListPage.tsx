import React from 'react';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const BookingListPage: React.FC = () => {
  return (
    <GatedPhasePlaceholder
      phaseNumber={4}
      phaseName="Bookings Management & Operations"
      description="Administrative monitoring and manual intervention for guest bookings, pricing verifications, scheduling conflict resolution, and booking lifecycle state machine management."
      backendModule="BookingsModule"
      backendPath="src/bookings/bookings.module.ts"
      requiredEndpoints={[
        'GET /api/v1/bookings/admin/all — Paginated listing with host, guest, and vehicle filters',
        'GET /api/v1/bookings/admin/:id — Detailed booking timeline, escrow status, and price breakdown',
        'PATCH /api/v1/bookings/admin/:id/override-status — Force state transition (e.g. cancellation with waiver)',
        'POST /api/v1/bookings/admin/:id/cancel — Administrative booking cancellation with custom refund policy',
      ]}
      expectedFeatures={[
        'Comprehensive status filter: PENDING, CONFIRMED, ACTIVE, COMPLETED, CANCELLED',
        'Monetary breakdown display in NGN (kobo base converted)',
        'Direct link to Vehicle and Guest/Host User profiles',
        'Audit-logged override action modal with mandatory reason prompt',
      ]}
    />
  );
};
