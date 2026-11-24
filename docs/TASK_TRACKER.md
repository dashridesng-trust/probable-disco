# Routic Admin Portal — Engineering Task Tracker

**Product:** Routic — Peer-to-peer car rental marketplace  
**Admin Portal Stack:** React + Vite + TypeScript · Refine + Ant Design · Clerk Auth  
**Backend:** `C:\Users\Joseph\Documents\GitHub\crispy-octo-potato` (NestJS · MongoDB · Redis · Clerk · Paystack)  
**Backend Task Tracker:** `C:\Users\Joseph\.gemini\antigravity-ide\brain\5fdfdd21-fcc2-48b7-8406-3a80468ac5c2\task_tracker.md`  
**Status:** Aligned to Backend Phases  

---

## 🎨 Strict Color System (21 HEX Tokens Only)

No colors outside these 21 HEX tokens may be used in stylesheets, inline styles, Ant Design theme tokens, SVG icons, or components:

| Color Name | HEX Code | Theme Role (Light Mode) | Theme Role (Dark Mode) |
|---|---|---|---|
| Bright orange | `#FF5B1A` | Primary accent, CTA buttons, active focus | Primary accent, CTA buttons, active focus |
| Golden amber | `#F5A623` | Warning status, pending badges, alerts | Warning status, pending badges, alerts |
| Deep navy | `#07153F` | Sidebar background, primary brand dark | Primary dark container, card backgrounds |
| Dark navy | `#0C1636` | High-contrast headers, dark elements | Deep dark background canvas, app shell |
| Midnight blue | `#0B1C50` | Secondary dark brand accent | Surface panels, elevated dark cards |
| Royal navy | `#172B66` | Selected nav items, active tabs | Active navigation, selected table rows |
| Slate gray | `#687189` | Secondary text, muted labels, subtitles | Secondary text, subheadings |
| Muted blue-gray | `#8B91A3` | Borders, subtle dividers, secondary icons | Borders, card outlines, subtle dividers |
| Cool gray | `#9097A9` | Placeholder text, disabled icon states | Muted text, disabled icon states |
| Medium gray | `#949AAB` | Auxiliary borders, muted timestamps | Auxiliary borders, secondary icons |
| Silver gray | `#9AA0AF` | Grid lines, table borders | Table borders, divider lines |
| Muted lavender | `#AEB7D5` | Informational tags, soft badge text | Informational tags, badge text |
| Pale lavender | `#CBD2E7` | Light informational chip background | Informational chip borders |
| Light blue-gray | `#CDD3E0` | Input border hover, table dividers | Muted borders, hover state borders |
| Light gray | `#DFE2E9` | Inactive component backgrounds, search borders| Inactive element text |
| Cool light gray | `#E2E5EB` | Secondary button backgrounds, borders | Secondary element fills |
| Pale gray | `#E8EAF0` | Card borders, secondary containers | Secondary container accents |
| Frame background gray | `#E9EBEF` | Main app shell canvas background | Sub-container borders |
| Off-white gray | `#EEF0F4` | Panel backgrounds, elevated light surface | High-contrast text elements |
| Soft off-white | `#F5F6F8` | Table row hover, input background | Primary text on dark surfaces |
| White | `#FFFFFF` | Primary card background, pure white text | Pure white high-contrast text |

---

## 📋 Aligned Implementation Phases

### Phase 0 — Project Scaffolding & Design System
*Status: Completed*
- [x] **AP0-1** Initialize React + Vite + TypeScript project in `probable-disco`.
- [x] **AP0-2** Install Refine core (`@refinedev/core`), Ant Design (`antd`, `@ant-design/icons`, `@refinedev/antd`), and routing (`@refinedev/react-router-v6`).
- [x] **AP0-3** Configure Ant Design `ConfigProvider` theme tokens overriding colors exclusively to the 21 HEX tokens.
- [x] **AP0-4** Implement Theme Context with **Light Mode** as default and **Dark Mode** toggle using the 21 colors.
- [x] **AP0-5** Configure flexible table density support (`small` / `middle` / `large`) per component requirement.
- [x] **AP0-6** Configure environment variables (`.env.example`, `.env`) with backend API URL and Clerk publishable key.
- [x] **AP0-7** Add comprehensive `.gitignore` for Node/Vite/pnpm/React workspace.
- [x] **AP0-8** Build shared component boilerplate: `AdminTable`, `StatusBadge`, `ReasonCaptureModal`, `EvidenceViewer`, `GatedPhasePlaceholder`.
- [x] **AP0-9** Build shared utility library: `currency.ts` (kobo/NGN formatting), `dates.ts` (dayjs formatting), `validation.ts` (audit reason rules).

---

### Phase 1 — Auth & App Shell (Backend Phase 1 Aligned)
*Status: Completed*
- [x] **AP1-1** Integrate Clerk authentication (`@clerk/clerk-react`).
- [x] **AP1-2** Enforce Clerk claim `publicMetadata.role === 'ADMIN'` before granting portal access; display unauthorized access screen for non-admin accounts.
- [x] **AP1-3** Create API client (Axios) with Clerk session token injection and correlation ID headers.
- [x] **AP1-4** Implement Routic App Shell Layout:
  - Persistent left sidebar with Routic branding, Deep Navy (`#07153F`) background, and Royal Navy (`#172B66`) active states.
  - Header bar with title, breadcrumbs, theme toggle, and logged-in admin Clerk profile avatar.
  - Main content container with responsive layout and Frame Background Gray (`#E9EBEF`) canvas.
- [x] **AP1-5** Access Control Provider integration with Refine (`authProvider`).
- [x] **AP1-6** Verify that no admin user creation, invitation, or account-management UI is present.
- [x] **AP1-7** Enhanced Login Page with Clerk `<SignIn>` component, public self-signup disabled, role-based automatic redirection (`/` for admin, `/unauthorized` for non-admin).

---

### Phase 2 — Verification Queue (Backend Phase 2 Aligned)
*Status: Completed & Integrated with Backend P2*
- [x] **AP2-1** Verification Queue List view (`/verifications`):
  - Integrate `GET /verifications` with filter tabs: All, User Verifications (`targetType=USER`), Vehicle Verifications (`targetType=VEHICLE`).
  - Status filters: `PENDING`, `APPROVED`, `REJECTED`, `RETRY_REQUIRED`.
  - Server-side pagination and sorting.
- [x] **AP2-2** Verification Inspection Detail / View (`/verifications/:id`):
  - Identity document viewer: NIN slip, live selfie, driver's license (front & back).
  - Proof of address & GPS coordinate pin drop comparison.
  - Vehicle document inspection: Proof of ownership, vehicle license, roadworthiness, insurance certificate, hackney permit.
- [x] **AP2-3** Verification Adjudication Action (`PATCH /verifications/:id/review`):
  - Approve / Reject / Retry Required modal dialog.
  - Expiry dates capture (`driverLicenseExpiryDate`, `vehicleLicenseExpiryDate`, etc.).
  - Mandatory `decisionReason` input and internal review notes.
  - Optimistic / error handling and audit trace display.

---

### Phase 3 — Vehicles & Listings Management (Backend Phase 3 Aligned)
*Status: Completed & Integrated with Backend P3*
- [x] **AP3-1** Vehicle Management Table (`/vehicles`):
  - Integrate `GET /vehicles/admin/queue`.
  - Filters by `listingStatus` (`DRAFT`, `PENDING_REVIEW`, `PUBLISHED`, `UNPUBLISHED`, `SUSPENDED`, `REJECTED`) and `verificationStatus`.
  - Columns: Vehicle specs (make, model, year), plate number, location, daily rate (kobo to NGN format), listing status, verification badge.
- [x] **AP3-2** Vehicle Detail & Media Inspector (`/vehicles/:id`):
  - Specs, pricing, policies, fuzzed public location vs private pickup address.
  - Photo gallery (exterior, interior, odometer) with zoom modal.
- [x] **AP3-3** Listing Adjudication Modal (`PATCH /vehicles/admin/:id/review`):
  - Actions: `APPROVE`, `REJECT`, `SUSPEND`.
  - Security deposit amount input (in NGN, converted to minor kobo units).
  - Mandatory review reason code and notes.

---

### Phase 4 — Bookings Management (Gated on Backend Phase 4)
*Status: ⏳ Boilerplate Scaffolding Completed — Gated on Backend P4*
- [x] **AP4-0** Scaffolding: `BookingListPage.tsx`, `BookingDetailPage.tsx` connected to route tree.
- [ ] **AP4-1** Bookings list view (`/bookings`) with status filters (`REQUESTED`, `APPROVED`, `PAYMENT_PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`).
- [ ] **AP4-2** Booking detail view: Itemized price breakdown, renter/host information, rental agreement acceptance details.
- [ ] **AP4-3** State-appropriate admin interventions with reason capture.

---

### Phase 5 — Payments & Financial Oversight (Gated on Backend Phase 5)
*Status: ⏳ Boilerplate Scaffolding Completed — Gated on Backend P5*
- [x] **AP5-0** Scaffolding: `TransactionListPage.tsx` connected to route tree.
- [ ] **AP5-1** Transaction monitoring table (Paystack reference, booking ID, amount in NGN, status, timestamps).
- [ ] **AP5-2** Payment reconciliation exceptions view.
- [ ] **AP5-3** **STRICT ENFORCEMENT**: Read-only oversight; all money-moving actions (refunds, deposit releases) remain disabled until policy approval.

---

### Phase 6 — Rentals & Handover Management (Gated on Backend Phase 6)
*Status: ⏳ Boilerplate Scaffolding Completed — Gated on Backend P6*
- [x] **AP6-0** Scaffolding: `RentalListPage.tsx`, `RentalDetailPage.tsx` connected to route tree.
- [ ] **AP6-1** Active rentals operations board (`UPCOMING`, `ACTIVE`, `ENDING_SOON`, `EXPIRED`, `OVERDUE`, `RETURN_PENDING`, `COMPLETED`).
- [ ] **AP6-2** Rental detail view: Handover schedule, extension requests, status timestamps.
- [ ] **AP6-3** Overdue & non-return tracking view.

---

### Phase 7 — Inspections & Completion Review (Gated on Backend Phase 7)
*Status: ⏳ Boilerplate Scaffolding Completed — Gated on Backend P7*
- [x] **AP7-0** Scaffolding: `InspectionListPage.tsx`, `InspectionDetailPage.tsx` connected to route tree.
- [ ] **AP7-1** Pickup vs Return inspection comparison viewer (odometer, fuel, condition notes, before/after photos).
- [ ] **AP7-2** Completion verification records.

---

### Phase 8 — Payouts Oversight (Gated on Backend Phase 8)
*Status: ⏳ Boilerplate Scaffolding Completed — Gated on Backend P8*
- [x] **AP8-0** Scaffolding: `PayoutListPage.tsx` connected to route tree.
- [ ] **AP8-1** Payouts queue (`PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`, `ON_HOLD`).
- [ ] **AP8-2** Payout hold / release controls linked to active disputes.

---

### Phase 9 — Messaging & Moderation (Gated on Backend Phase 9)
*Status: ⏳ Boilerplate Scaffolding Completed — Gated on Backend P9*
- [x] **AP9-0** Scaffolding: `MessageModerationPage.tsx` connected to route tree.
- [ ] **AP9-1** Flagged message / anti-circumvention queue.
- [ ] **AP9-2** Admin messaging interface with distinct customer-facing messages vs internal notes.

---

### Phase 10 — Incidents & Disputes (Gated on Backend Phase 10)
*Status: ⏳ Boilerplate Scaffolding Completed — Gated on Backend P10*
- [x] **AP10-0** Scaffolding: `IncidentListPage.tsx`, `IncidentDetailPage.tsx`, `DisputeListPage.tsx` connected to route tree.
- [ ] **AP10-1** Incidents queue (`NON_RETURN`, `DAMAGE`, `ACCIDENT`, `LATE_RETURN`, `PAYMENT_ISSUE`, `MISCONDUCT`).
- [ ] **AP10-2** Disputes case management, assignment, priority/severity, and resolution workflow.

---

### Phase 11 — Review Moderation (Gated on Backend Phase 11)
*Status: ⏳ Boilerplate Scaffolding Completed — Gated on Backend P11*
- [x] **AP11-0** Scaffolding: `ReviewListPage.tsx` connected to route tree.
- [ ] **AP11-1** User and vehicle reviews moderation table.

---

### Phase 12 — Notifications & Broadcasts (Gated on Backend Phase 12)
*Status: ⏳ Boilerplate Scaffolding Completed — Gated on Backend P12*
- [x] **AP12-0** Scaffolding: `NotificationsPage.tsx` connected to route tree.
- [ ] **AP12-1** Targeted announcement composer with cohort selection and delivery tracking.

---

### Phase 13 — Admin User Management & Profile Overview (Gated on Backend Phase 13)
*Status: ⏳ Boilerplate Scaffolding Completed — Gated on Backend P13-2*
- [x] **AP13-0** Scaffolding: `UserListPage.tsx`, `UserDetailPage.tsx` connected to route tree.
- [ ] **AP13-1** User management table (status, driver verification badge, renter/owner stats).
- [ ] **AP13-2** Account restriction/suspension/reinstatement dialogs with mandatory audit reason.

---

### Phase 14 — Audit Logs & System Health (Gated on Backend Phase 14)
*Status: ⏳ Boilerplate Scaffolding Completed — Gated on Backend P14-1*
- [x] **AP14-0** Scaffolding: `AuditLogPage.tsx`, `ReportListPage.tsx` connected to route tree.
- [ ] **AP14-1** Centralized append-only audit log browser.
- [ ] **AP14-2** Sanitized before/after change diff inspector.
