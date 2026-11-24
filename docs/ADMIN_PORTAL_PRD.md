# Routic Admin Portal — Product Requirements Document

## 1. Purpose
The Routic Admin Portal is an internal web application for operating and overseeing Routic, a peer-to-peer car-rental marketplace. It supports users, vehicles/listings, bookings, rentals, verification, incidents, disputes, finance, communications, moderation, reporting and audit. It is not a ride-hailing or chauffeur-dispatch system.

## 2. Goals
1. Provide one reliable operational view of marketplace activity.
2. Enable full user, vehicle/listing, booking and rental management.
3. Support manual user and vehicle/listing verification.
4. Provide structured incident and dispute handling.
5. Provide financial visibility and approved financial operations.
6. Support individual in-app messaging, targeted notifications and announcements.
7. Audit sensitive administrative actions.
8. Support CSV and Excel exports.
9. Keep architecture ready for future differentiated admin capabilities.

## 3. Admin identity and access
All approved admins initially have the same application capabilities. Admin accounts are manually approved through the Clerk dashboard. No admin can create, invite, approve, deactivate, delete or manage another admin account or permission through the portal. Admin provisioning remains outside the portal.

Build capability-based authorization centrally so future narrower roles can be introduced after approval. Do not expose a role-management UI.

## 4. Scope — full administration
### Dashboard
Include total registered users; active renters/owners; pending identity and driver verification; pending vehicle/listing verification; active listings; pending requests; confirmed bookings; active/upcoming/ending-soon/overdue rentals; cancelled/rejected/expired bookings; incidents/disputes by priority and severity; restricted accounts; payment statuses; platform fees/revenue; owner earnings and payout liabilities; pending/paid/failed/held payouts; support volume and resolution times; verification backlog; booking completion/cancellation rates; growth trends.

Every metric needs a documented formula, source, time basis, timezone, refresh frequency and inclusion/exclusion rules. Do not fabricate or infer financial metrics.

### User management
Search users; view profiles and account status; inspect renter/owner activity; review verification; approve/reject/request information; view linked listings, bookings, rentals, reviews, incidents and disputes; restrict/suspend/restore/deactivate accounts according to approved policy; add internal notes; review suspicious activity. Editing user data must be limited to approved fields and audited.

### Vehicle and listing management
Search and inspect vehicles/listings; review photos and documents; manually verify; approve/reject/request information; pause/suspend/unpublish/remove listings; edit approved fields; inspect owner/vehicle history; review reports; restrict listing privileges when policy permits. Record reviewer, evidence references, decision, reason and timestamp. Never use “verified” without defining what was checked.

### Booking and rental management
Search by reference, party, vehicle, date and status; inspect timeline, payment status, rental agreement acceptance, pickup/return checklists and evidence; investigate overdue/non-return; manage cancellations and exceptions according to policy; record interventions. No arbitrary status editing. Completion overrides require a separately approved policy.

### Incidents and disputes
Support damage, accident, non-return, late return, condition disagreement, owner no-show, renter no-show, payment dispute, fraud, harassment/misconduct, missing documents and other approved categories. Support case assignment, priority, severity, linked records, evidence, communication history, private internal notes, escalation, resolution, reopening and payout holds where supported by the approved financial model.

### Finance
Provide transaction visibility, payment status, refund and payout operations, payout holds, reconciliation exceptions and financial reporting. Current decision: no dual approval requirement. This does not remove confirmation, authorization, idempotency, reason capture or audit requirements.

**CRITICAL:** Payment/deposit/payout model is undecided. Keep money-moving controls disabled until business rules, provider feasibility and legal position are approved. Do not assume escrow, deposit handling, split settlement, payout trigger, refund policy or commission.

### Communications
View authorized communication history; send individual in-app messages; send targeted notifications and announcements; track delivery state where supported; moderate reported messages; create internal notes that are never customer-visible. Distinguish transactional from promotional communications and respect approved consent/preferences.

### Audit
Record actor, action, target, timestamp, reason, outcome, request/correlation ID and safe before/after fields for sensitive changes. Admins cannot edit or delete audit records.

## 5. Out of scope / prohibited
- Admin account or permission management.
- Direct browser-to-database access.
- Bypassing backend business rules.
- Client-side proof of payment, verification or completion.
- Automated vehicle verification at initial launch.
- Unapproved financial actions or invented legal policy.
- Silent changes to transaction, verification or dispute records.

## 6. Non-functional requirements
Server-side authorization; secure Clerk integration; responsive desktop-first UX; search/filter/sort/pagination; accessible tables/forms; clear loading/empty/error/permission-denied states; correct currency/time formatting; export protection; observability; automated tests; maintainable modular architecture.

## 7. Acceptance criteria
- Only approved Clerk admins access admin APIs.
- No admin account-management endpoint or screen exists.
- All admins have the same initial capability set.
- Every sensitive mutation is authorized and audited.
- Manual vehicle/listing verification is supported.
- Booking/rental actions follow backend state machines.
- Cases support assignment, priority, severity, evidence, notes, communication and resolution.
- Financial mutations remain disabled until payment policy is approved.
- Customer-visible messages are separate from internal notes.
- Dashboard metrics have documented definitions.
- Approved reports export safely to CSV/Excel.
- Tests cover cross-user access, unauthorized actions, duplicate requests and audit creation.

## 8. Delivery phases
Foundation/auth/dashboard; core users/listings/bookings/rentals; trust and safety; communications; finance read-only then approved actions; reporting/exports; security and production hardening.
