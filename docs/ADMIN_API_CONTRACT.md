# Routic Admin Portal — API Contract Requirements

This document defines contract requirements, not final schemas. Inspect the current NestJS API before introducing new conventions.

## Rules
- Every admin endpoint requires verified Clerk identity and backend admin authorization.
- Every operation checks resource-level access and valid state transitions.
- Use DTOs, validation, explicit response projections, pagination and allowlisted filters/sorts.
- Never return raw MongoDB documents.
- Use consistent error codes and request/correlation IDs.
- Use idempotency for financial and retryable side effects.
- Never accept client-supplied admin identity or permission as authority.

## Resource capabilities
| Resource | Operations |
|---|---|
| Dashboard | Summary metrics, trends, queue counts |
| Users | Search, detail, history, approved edits, verification, restriction |
| Verifications | Queue, detail, approve, reject, request information |
| Vehicles/listings | Search, detail, manual review, edit approved fields, approve/reject/suspend |
| Bookings/rentals | Search, detail, timeline, state-appropriate interventions |
| Cases | Create/link, assign, priority/severity/status, evidence, notes, resolve/reopen |
| Transactions | Search, detail, provider status, reconciliation |
| Refunds/payouts | Read; mutations only after policy approval |
| Communications | History, individual messages, announcements, moderation |
| Notifications | Targeted send and delivery status |
| Reports | Catalogue, preview, export job/status/download |
| Audit | Search/filter/read; never edit/delete |

## Suggested route shapes (illustrative only)
```http
GET  /admin/users
GET  /admin/users/:id
POST /admin/users/:id/restrict
POST /admin/verifications/:id/approve
POST /admin/verifications/:id/reject
GET  /admin/listings
POST /admin/listings/:id/approve
POST /admin/listings/:id/suspend
GET  /admin/bookings
GET  /admin/rentals
GET  /admin/cases
POST /admin/cases/:id/assign
POST /admin/cases/:id/resolve
GET  /admin/transactions
GET  /admin/reports
POST /admin/reports/:id/exports
GET  /admin/audit-logs
```
Do not implement exact routes until aligned with existing API. Do not create admin account-management routes.

## Mutation processing
Authenticate → authorize capability → load resource → validate state transition → validate reason/evidence → apply domain operation → persist audit → queue notifications/jobs → return authoritative state.

## Error catalogue
`UNAUTHENTICATED`, `ADMIN_NOT_APPROVED`, `ADMIN_INACTIVE`, `FORBIDDEN`, `NOT_FOUND`, `VALIDATION_ERROR`, `INVALID_STATE_TRANSITION`, `CONFLICT`, `IDEMPOTENCY_CONFLICT`, `PROVIDER_PENDING`, `PROVIDER_FAILURE`, `RATE_LIMITED`, `INTERNAL_ERROR`.

## Open contract decisions
API prefix/version/error envelope; pagination strategy; search/filter semantics; optimistic concurrency; bulk actions and limits; export mechanism; reauthentication rules; whether admin messages use existing chat APIs.
