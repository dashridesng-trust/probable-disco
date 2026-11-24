import React from 'react';
import { GatedPhasePlaceholder } from '../../components/common/GatedPhasePlaceholder';

export const ReviewListPage: React.FC = () => {
  return (
    <GatedPhasePlaceholder
      phaseNumber={11}
      phaseName="Reviews & Ratings Moderation"
      description="Quality assurance and defamation review for host and guest ratings, spam removal, and review dispute appeals."
      backendModule="ReviewsModule"
      backendPath="src/reviews/reviews.module.ts"
      requiredEndpoints={[
        'GET /api/v1/reviews/admin/flagged — Reviews flagged for defamatory content, profanity, or retaliation',
        'GET /api/v1/reviews/admin/all — Paginated listing of all platform reviews',
        'PATCH /api/v1/reviews/admin/:id/hide — Administrative hide action with audit reason',
        'DELETE /api/v1/reviews/admin/:id — Permanent removal for verified Terms of Service violations',
      ]}
      expectedFeatures={[
        'Star rating breakdown (overall, cleanliness, accuracy, communication)',
        'Retaliatory review detection indicator (low rating submitted immediately following a disputed charge)',
        'Moderation action modal with reason logging',
      ]}
    />
  );
};
