import React from 'react';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const InspectionListPage: React.FC = () => {
  return (
    <GatedPhasePlaceholder
      phaseNumber={7}
      phaseName="Vehicle Inspections & Condition Reports"
      description="Pre-rental and post-rental photo evidence review, damage discrepancy identification, odometer logging, and tire/fuel verification."
      backendModule="InspectionsModule"
      backendPath="src/inspections/inspections.module.ts"
      requiredEndpoints={[
        'GET /api/v1/inspections/admin/queue — Inspections flagged with discrepancies or damage claims',
        'GET /api/v1/inspections/admin/all — Paginated log of all vehicle check-in and check-out photos',
        'PATCH /api/v1/inspections/admin/:id/verify — Mark inspection verified by administrative safety agent',
      ]}
      expectedFeatures={[
        'Side-by-side photo comparison for pre-rental vs post-rental angles (front, rear, sides, interior, dashboard)',
        'Fuel gauge and odometer reading validation against host/guest submissions',
        'Direct damage incident escalation into Case Management',
      ]}
    />
  );
};
