# Routic Admin Portal — RBAC and Access Control

## Current approved model
All approved admins have equal access to the same admin features. Admin accounts require manual approval through Clerk dashboard. No admin can create, invite, approve, deactivate, delete, revoke or manage another admin account or its permissions in the portal.

## Authentication vs authorization
Clerk authenticates the admin. NestJS verifies the Clerk identity and resolves it to an internal admin identity/status. The backend determines approval, activity and permissions. Frontend route guards are UX only. Never trust client-supplied `isAdmin`, roles, permissions or actor IDs.

## Capability catalogue
- `dashboard.read`
- `users.read`, `users.update`, `users.verify`, `users.restrict`
- `listings.read`, `listings.update`, `listings.verify`, `listings.moderate`
- `bookings.read`, `bookings.manage`
- `rentals.read`, `rentals.manage`
- `cases.read`, `cases.manage`, `cases.hold_payout`
- `finance.read`, `finance.refund`, `finance.payout`
- `communications.read`, `communications.send`, `communications.moderate`
- `reports.read`, `reports.export`
- `audit.read`

All current approved admins receive the same capability set. Financial mutation capabilities remain disabled until policy approval.

## High-risk actions
Require server-side authorization, explicit confirmation, reason where appropriate, idempotency for retryable side effects and audit logging. Examples: suspend/deactivate user, remove listing, booking/rental override, resolve dispute, hold/release payout, refund, payout, bulk message and sensitive export. Dual approval is not currently required.

## Future extensibility
Use a central capability map and authorization service, not scattered role-name checks. Future roles are not active until approved. Do not build a role-management UI. Any future role model must preserve the prohibition on admin account management unless the product owner explicitly changes it.

## Forbidden endpoints
No portal/API endpoints for listing admins for management, creating/inviting admins, approving admins, changing admin status, changing admin roles/permissions, revoking admin access or editing Clerk membership/settings.

## Open questions
- Is Clerk approval the sole source of admin eligibility, or is a separate Routic approval record required?
- Who performs Clerk-side offboarding and how quickly must access be revoked?
- Is MFA compulsory for every admin?
- What session lifetime and reauthentication rules apply?
