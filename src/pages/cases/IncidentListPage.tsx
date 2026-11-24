import React from 'react';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const IncidentListPage: React.FC = () => {
  return (
    <GatedPhasePlaceholder
      phaseNumber={10}
      phaseName="Incident Reports & Emergency Cases"
      description="Vehicle accident reports, roadside breakdowns, theft alerts, impoundment notices, and immediate safety interventions."
      backendModule="IncidentsModule"
      backendPath="src/incidents/incidents.module.ts"
      requiredEndpoints={[
        'GET /api/v1/incidents/admin/active — Open safety incidents categorized by severity (P1 Critical, P2 Major, P3 Minor)',
        'GET /api/v1/incidents/admin/:id — Full accident report, police reports, and towing logs',
        'PATCH /api/v1/incidents/admin/:id/status — Transition case state (INVESTIGATING, INSURANCE_SUBMITTED, RESOLVED, CLOSED)',
        'POST /api/v1/incidents/admin/:id/claim — Assign case officer to lead investigation',
      ]}
      expectedFeatures={[
        'Severity color badge: P1 (Bright Orange), P2 (Golden Amber), P3 (Royal Navy)',
        'Insurance claim submission status and police report attachments',
        'Direct connection to rental telemetry and GPS last known location',
        'Officer investigation notes notebook with immutable timestamps',
      ]}
    />
  );
};
