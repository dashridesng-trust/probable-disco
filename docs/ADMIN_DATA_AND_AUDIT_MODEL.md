# Routic Admin Portal — Data and Audit Model

## Principles
Reuse existing Routic domain records. Admin-specific records should represent verification decisions, case management, assignments, internal notes, export jobs and audit events. Backend is authoritative. Minimize sensitive data in list views.

## Admin identity
Map verified Clerk subject to internal admin identity. A separate Routic approval record is undecided; do not assume one is necessary until Clerk approval representation is confirmed.

## Case record requirements
Case reference; category; priority; severity; status; linked users, vehicle/listing, booking/rental, payment/payout references; reporter/source; assigned admin; summary; evidence references; private notes; customer-visible communication references; resolution/reason; created/updated/resolved timestamps; escalation/reopen history.

Case lifecycle and taxonomy are OPEN decisions.

## Verification review
Subject type; submission/evidence reference; status; reviewer; decision; reason/rejection code; additional-information request; reviewed timestamp; resubmission linkage; audit reference. Never copy raw identity documents into audit events.

## Internal notes
Private-only API and UI. Never include in customer conversation responses. Record author/time. Preserve material edit history or use append-only corrections. Do not store secrets or unnecessary sensitive information.

## Audit event fields
`eventId`, `actorAdminId`, `action`, `resourceType`, `resourceId`, `occurredAt`, `reason`, `outcome`, `requestId`, safe `before`/`after` snapshots and scrubbed metadata. IP/user-agent capture requires purpose and privacy review.

Audit is append-oriented. Admins cannot update/delete audit entries. Do not store passwords, tokens, raw documents, full ID numbers or payment secrets.

## Example event names
`admin.user.profile_updated`, `admin.user.verification_approved`, `admin.user.suspended`, `admin.listing.approved`, `admin.booking.cancelled`, `admin.case.assigned`, `admin.case.resolved`, `admin.payout.hold_applied`, `admin.refund.initiated`, `admin.message.sent`, `admin.notification.broadcast`, `admin.report.exported`, `admin.evidence.accessed`.

## Evidence/media
Private verification and dispute evidence must not use public permanent URLs. Use authorized short-lived access or backend-mediated delivery. Record uploader, time, related case/rental and evidence metadata. Define retention/deletion before production.
