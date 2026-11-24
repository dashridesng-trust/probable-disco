# Routic Admin Portal Documentation

Status: Working specification based on product-owner decisions supplied 20 November 2026.

## Confirmed decisions
- Scope: full administration across operations, trust and safety, and finance.
- All approved admins initially have equal access.
- Admins cannot create, approve, invite, deactivate, delete, or manage other admin accounts or permissions.
- Admin accounts require manual approval through the Clerk dashboard.
- Frontend: React + Vite + TypeScript; Refine is the selected direction.
- Dashboard includes the full candidate operational and financial metrics catalogue.
- Selected reports export to CSV and Excel.
- Full user, vehicle/listing, booking and rental management.
- Vehicle verification is initially manual.
- Incident/dispute management includes all identified categories, communication history, internal notes, priority, severity, case assignment, resolution and dispute-related payout holds.
- Financial management is in scope; dual approval is not required at present.
- Payment/deposit/payout model remains undecided. Do not enable money-moving actions until approved.
- Admins can send individual in-app messages, targeted notifications and announcements, and manage communications/moderation.
- Sensitive admin actions must be audited.
- Build capability-based authorization for future role differentiation, but do not build admin account management.
- Target scope is Option C: full administration.

## Document order
1. `ADMIN_PORTAL_PRD.md`
2. `ADMIN_WORKFLOWS.md`
3. `ADMIN_RBAC_AND_ACCESS.md`
4. `ADMIN_ARCHITECTURE.md`
5. `ADMIN_API_CONTRACT.md`
6. `ADMIN_DATA_AND_AUDIT_MODEL.md`
7. `ADMIN_DESIGN_SYSTEM.md`
8. `ADMIN_SECURITY_REQUIREMENTS.md`
9. `ADMIN_REPORTING_AND_EXPORTS.md`
10. `ADMIN_TESTING_AND_RELEASE.md`
11. `OPEN_DECISIONS.md`

## AI coding-agent rules
- Confirmed decisions are requirements.
- Anything marked OPEN must be asked before implementing the affected behavior.
- Do not invent financial, legal, verification, dispute or access policies.
- Backend authorization is mandatory; hiding a button is not security.
- NestJS is the authoritative business-logic boundary. Do not connect the browser directly to MongoDB.
- Do not create admin-user-management endpoints or screens.
- Do not enable refund, deposit, payout or settlement mutations until the payment model is approved.
- Inspect the actual repository, API and installed package versions before implementation.
- Update these documents only when the product owner approves a change.
