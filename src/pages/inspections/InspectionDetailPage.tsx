import React from 'react';
import { useParams } from 'react-router-dom';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const InspectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <GatedPhasePlaceholder
      phaseNumber={7}
      phaseName={`Inspection Report #${id || 'Detail'}`}
      description="Full photographic and checklist dossier for a vehicle condition check."
      backendModule="InspectionsModule"
      backendPath="src/inspections/inspections.service.ts"
      requiredEndpoints={[
        `GET /api/v1/inspections/admin/${id || ':id'} — Comprehensive photos and checklist data`,
        `PATCH /api/v1/inspections/admin/${id || ':id'}/flag-discrepancy — Flag discrepancy for dispute investigator`,
      ]}
      expectedFeatures={[
        'High-resolution multi-angle image gallery with pan and zoom',
        'Metadata verification: timestamp, device camera EXIF, and GPS lock',
        'Inspector notes and guest sign-off signature verification',
      ]}
    />
  );
};
