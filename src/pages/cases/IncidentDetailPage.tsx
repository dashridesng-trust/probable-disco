import React from 'react';
import { useParams } from 'react-router-dom';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const IncidentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <GatedPhasePlaceholder
      phaseNumber={10}
      phaseName={`Incident Case File #${id || 'Detail'}`}
      description="Full investigative dossier for a vehicle accident or safety incident."
      backendModule="IncidentsModule"
      backendPath="src/incidents/incidents.service.ts"
      requiredEndpoints={[
        `GET /api/v1/incidents/admin/${id || ':id'} — Complete incident record`,
        `POST /api/v1/incidents/admin/${id || ':id'}/add-note — Append signed officer note`,
        `POST /api/v1/incidents/admin/${id || ':id'}/resolve — Finalize incident resolution and claim outcome`,
      ]}
      expectedFeatures={[
        'Police report and towing receipt viewer',
        'Damage photo comparison against baseline vehicle inspection',
        'Insurance claim tracking numbers and adjuster communications',
        'Direct deposit retention deduction authorization',
      ]}
    />
  );
};
