# Routic Admin Portal — Design System and UX

## Design intent
This is a privileged operations workspace. Prioritize clarity, speed, traceability and safe actions over marketing visuals. Official Routic brand assets/tokens have not been provided; do not invent the official logo, colors or fonts. Use neutral provisional tokens until approved.

## Layout
Desktop-first shell: persistent left navigation, top bar with page title/breadcrumb and session identity, main content area, optional contextual panel for timelines/evidence. Tablet should remain usable. Do not add admin account-management screens.

## Proposed navigation
- Overview
- Marketplace: Users, Vehicles, Listings, Bookings, Rentals
- Trust & Safety: Verification queue, Incidents, Disputes, Message reports
- Finance: Transactions, Refunds, Payouts, Reconciliation
- Communications: Conversations, Send message, Notifications/announcements
- Reports
- Audit log

Finance mutations remain disabled until policy is approved. Navigation visibility does not grant access.

## Tables
Support server-side pagination, search, allowlisted filters/sorts, stable references, status labels, timestamps, permission-aware actions, loading/empty/error/partial states and export with filter summary/count. Do not expose full ID numbers or private documents in rows.

## Detail pages
Consistent summary/state, allowed actions, profile/details, timeline, linked records, evidence, communication and audit sections. Keep customer-visible messages separate from private notes. Show actor/reason history for admin decisions.

## Forms/dialogs
Explicit labels and validation. Capture reason for sensitive actions. Explain impact before suspension, removal, cancellation, resolution, refund, payout or hold. Prevent duplicate clicks in UI but rely on server idempotency. Preserve safe form data after recoverable errors.

## Evidence viewer
Label evidence type/source/time and linked case/rental. Restrict access; do not expose raw permanent URLs. Distinguish original from supplemental evidence. Do not silently replace evidence.

## Dashboard
KPI cards, actionable queues, trends, high-priority incidents, reconciliation exceptions and verification backlog. Every metric needs definition/date range/empty state.

## Accessibility and responsive behavior
Keyboard navigation, visible focus, semantic headings, screen-reader labels, sufficient contrast, status not conveyed by color alone, responsive table alternatives and no hover-only actions. Confirm browser support and tablet requirements.

## State coverage
For every feature design default, loading, empty, error/retry, permission denied, partial data, confirmation and success states. Do not invent policy copy for cancellation, refunds, deposits, payouts, verification or disputes.
