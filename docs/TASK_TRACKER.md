# Routic Web Admin Portal — Engineering Task Tracker

**Status:** Initial Baseline  
**Reference Palette:** 21 Strict Hex Colors  
**Backend Reference:** `C:\Users\Joseph\Documents\GitHub\crispy-octo-potato` (NestJS + MongoDB + Clerk)  
**Current Repository:** `c:\Users\Joseph\Documents\GitHub\probable-disco`  

---

## 🎨 Color Palette Token Mapping (Strict Compliance)

Only the following 21 HEX color codes are permitted across the entire admin application:

| Token Name | HEX | Intended Role |
|---|---|---|
| Bright orange | `#FF5B1A` | Primary brand accent, primary CTA buttons, critical highlights |
| Golden amber | `#F5A623` | Secondary accent, warning badges, pending status |
| Deep navy | `#07153F` | Dark surface base, sidebar background, headers |
| Dark navy | `#0C1636` | High-contrast dark backgrounds, table headers |
| Midnight blue | `#0B1C50` | Primary dark brand color, card accents |
| Royal navy | `#172B66` | Selected navigation items, active tabs |
| Slate gray | `#687189` | Secondary text, inactive tab labels, metadata |
| Muted blue-gray | `#8B91A3` | Borders, subtle dividers, secondary icons |
| Cool gray | `#9097A9` | Placeholder text, disabled icon states |
| Medium gray | `#949AAB` | Auxiliary borders, muted timestamps |
| Silver gray | `#9AA0AF` | Table grid lines, subtle component strokes |
| Muted lavender | `#AEB7D5` | Informational chips, soft badge text |
| Pale lavender | `#CBD2E7` | Light informational tag background, focus rings |
| Light blue-gray | `#CDD3E0` | Input border hover states, card dividing lines |
| Light gray | `#DFE2E9` | Inactive component backgrounds, search input borders |
| Cool light gray | `#E2E5EB` | Secondary button backgrounds, table alternating row borders |
| Pale gray | `#E8EAF0` | Card borders, secondary containers |
| Frame background gray | `#E9EBEF` | Main app shell canvas background |
| Off-white gray | `#EEF0F4` | Panel backgrounds, elevated light surface |
| Soft off-white | `#F5F6F8` | Table row hover, input background |
| White | `#FFFFFF` | Primary card background, pure white text/contrast |

---

## 🧭 Engineering Process & Phases

### Phase 1: Foundation, Design Tokens & Project Scaffolding
- [ ] **1.1** Initialize React + Vite + TypeScript project structure in `probable-disco`.
- [ ] **1.2** Configure CSS / Tailwind / Styling system strictly locked to the 21 HEX tokens (zero arbitrary colors or standard utility colors).
- [ ] **1.3** Set up Clerk authentication integration on frontend matching backend configuration (`@clerk/clerk-react`).
- [ ] **1.4** Configure Refine or routing core (`@refinedev/core`, router, notification provider).
- [ ] **1.5** Implement API client layer with Axios / Fetch interceptors (Clerk Bearer token injection, correlation ID, standard error handler).
- [ ] **1.6** Set up capability-based Access Control Provider (frontend UX guards reflecting backend permissions).

### Phase 2: App Shell, Navigation & Layout
- [ ] **2.1** Persistent left navigation sidebar using Deep Navy (`#07153F`) / Dark Navy (`#0C1636`) with Royal Navy (`#172B66`) active states and Bright Orange (`#FF5B1A`) indicator.
- [ ] **2.2** Header bar with breadcrumbs, page title, logged-in admin identity profile, and Clerk session management.
- [ ] **2.3** Main content wrapper with Frame Background Gray (`#E9EBEF`) and responsive grid structure.
- [ ] **2.4** Global reusable components:
  - Accessible Data Table with server-side pagination, sorting, and filtering.
  - Status Badge component mapped strictly to status states.
  - Reason-capture confirmation dialog for high-risk actions.
  - Protected media / evidence modal viewer.
  - Filter drawer / search input with debouncing.

### Phase 3: Dashboard & Operational Metrics
- [ ] **3.1** Define typed contract for `/admin/dashboard` metrics.
- [ ] **3.2** KPI Summary Cards: Active Renters/Owners, Verification Backlog, Active Listings, Confirmed Bookings, Active/Overdue Rentals, Open Disputes.
- [ ] **3.3** Actionable operational queues: Pending Verifications, Vehicle Review Queue, High-Priority Incidents.
- [ ] **3.4** Metric definition tooltips (source, formula, timezone, refresh schedule).

### Phase 4: User Management (`/admin/users`)
- [ ] **4.1** User search and paginated table (name, email, phone, account status, verification status, created date).
- [ ] **4.2** User detail view:
  - Account status & driver verification badge.
  - Linked activity tabs: Listings, Bookings, Rentals, Reviews, Incidents/Disputes.
  - Internal operational notes timeline (never visible to customer).
- [ ] **4.3** Account status action dialogs: Restrict / Suspend / Restore (with mandatory reason capture and audit payload).
- [ ] **4.4** Verify prohibition: No admin user management / invite / delete interfaces.

### Phase 5: Vehicles & Listings Management (`/admin/listings`)
- [ ] **5.1** Integrate with existing backend vehicle queue endpoint (`GET /vehicles/admin/queue`).
- [ ] **5.2** Vehicle listings table with status filters (`DRAFT`, `PENDING_REVIEW`, `PUBLISHED`, `UNPUBLISHED`, `SUSPENDED`, `REJECTED`).
- [ ] **5.3** Vehicle inspection & detail page:
  - Specs, pricing (kobo to NGN formatting), policies, public fuzzed vs private pickup location.
  - Media photo gallery (exterior, interior, odometer) with zoom.
- [ ] **5.4** Listing review action (`PATCH /vehicles/admin/:id/review`):
  - Approve, Reject, or Suspend.
  - Set security deposit amount if requested by host.
  - Mandatory decision reason logging.

### Phase 6: Trust & Safety: Verification Queue (`/admin/verifications`)
- [ ] **6.1** Integrate with backend verification queue (`GET /verifications` with `targetType` and `status` query params).
- [ ] **6.2** Verification cases table: Target type (`USER` vs `VEHICLE`), applicant type (`INDIVIDUAL` vs `CORPORATE`), submission date, status.
- [ ] **6.3** Verification case inspection drawer/view (`GET /verifications/:id`):
  - NIN slip, live selfie, driver's license (front/back), proof of address.
  - Vehicle ownership, vehicle license, roadworthiness, insurance certificate, hackney permit.
  - Captured GPS pin drop vs submitted address.
- [ ] **6.4** Verification adjudication (`PATCH /verifications/:id/review`):
  - Approve / Reject / Request Information.
  - Expiry date records capture (driver's license, insurance, roadworthiness).
  - Mandatory audit reason.

### Phase 7: Booking & Rental Management (`/admin/bookings`, `/admin/rentals`)
- [ ] **7.1** Bookings list & filter by reference, vehicle, renter, owner, dates, and status (`REQUESTED`, `APPROVED`, `PAYMENT_PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`).
- [ ] **7.2** Booking detail view: Itemized price breakdown (`dailyRateKobo`, `platformFeeKobo`, `securityDepositKobo`, `totalAmountKobo`), agreement signature timestamp.
- [ ] **7.3** Rental operations view: Operational lifecycle (`UPCOMING`, `ACTIVE`, `ENDING_SOON`, `EXPIRED`, `OVERDUE`, `RETURN_PENDING`, `COMPLETED`).
- [ ] **7.4** Pickup & return inspection comparison viewer (before/after photos, odometer, fuel, condition notes).
- [ ] **7.5** Overdue / non-return intervention flows and exception handling.

### Phase 8: Incidents & Disputes Management (`/admin/cases`)
- [ ] **8.1** Unified case management table (damage, accident, late return, non-return, payment issue, misconduct).
- [ ] **8.2** Priority (`LOW`, `MEDIUM`, `HIGH`, `URGENT`) and Severity indicators.
- [ ] **8.3** Case detail view:
  - Linked parties, vehicle, rental, and payment records.
  - Chronological activity timeline.
  - Private internal notes (separated from customer messages).
  - Case assignment to active admin.
- [ ] **8.4** Dispute resolution modal with reason, findings, and dispute-related payout hold control.

### Phase 9: Communications & Messaging Moderation (`/admin/communications`)
- [ ] **9.1** Admin individual user messaging interface (transactional vs operational).
- [ ] **9.2** Targeted announcement / broadcast composer with cohort selection and recipient count preview.
- [ ] **9.3** Flagged message / reported conversation moderation queue.
- [ ] **9.4** Strict separation: Customer-facing messages vs internal operational notes.

### Phase 10: Financial Oversight & Transactions (`/admin/finance`)
- [ ] **10.1** Transaction monitoring table (Paystack reference, booking ID, amount in NGN/kobo, status, timestamps).
- [ ] **10.2** Payout status tracker (Pending, Processing, Completed, Failed, On Hold).
- [ ] **10.3** Reconciliation exceptions list.
- [ ] **10.4** STRICT ENFORCEMENT: Keep all money-moving actions (refunds, manual payouts, fee overrides) disabled until payment/escrow policy is approved.

### Phase 11: Audit Logging & Activity Trail (`/admin/audit-logs`)
- [ ] **11.1** Audit log browser: actor admin, action name, resource type, resource ID, timestamp, reason, outcome.
- [ ] **11.2** Audit event detail inspector: Safe sanitized before/after payload diffs (zero PII/passwords/secrets).
- [ ] **11.3** Read-only enforcement (no edit/delete capabilities).

### Phase 12: Reporting & Data Exports (`/admin/reports`)
- [ ] **12.1** Report catalogue UI (User growth, verification turnaround, fleet supply, bookings funnel, dispute resolution).
- [ ] **12.2** Secure CSV and Excel export generator with column filters and date ranges.
- [ ] **12.3** Export sanitization: CSV formula injection prevention (`=`, `+`, `-`, `@` escaping) and PII masking.
- [ ] **12.4** Export audit logging (who exported, filters applied, timestamp).

### Phase 13: End-to-End Verification, Security & Release Hardening
- [ ] **13.1** Role and unauthorized access verification (unapproved Clerk users, forged roles, IDOR/BOLA checks).
- [ ] **13.2** Verify absence of admin self-management or role management screens.
- [ ] **13.3** Accessibility and keyboard navigation testing across tables and dialogs.
- [ ] **13.4** Complete test coverage for state transition guards and audit emissions.
