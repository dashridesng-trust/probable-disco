import React from 'react';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const ReportListPage: React.FC = () => {
  return (
    <GatedPhasePlaceholder
      phaseNumber={14}
      phaseName="Operational Analytics & Compliance Reports"
      description="Aggregated platform performance metrics, GMV reports, Nigerian tax compliance summaries, vehicle utilization rates, and safety SLA reporting."
      backendModule="ReportsModule"
      backendPath="src/reports/reports.module.ts"
      requiredEndpoints={[
        'GET /api/v1/reports/admin/revenue — Daily, weekly, monthly GMV and platform take rates',
        'GET /api/v1/reports/admin/utilization — Fleet utilization rates by vehicle type and city',
        'GET /api/v1/reports/admin/safety-sla — Verification and incident resolution response times',
      ]}
      expectedFeatures={[
        'Visual revenue charts and CSV export capabilities',
        'Host earnings distribution histograms',
        'City-level geographic heatmaps (Lagos, Abuja, Port Harcourt, Ibadan)',
      ]}
    />
  );
};
