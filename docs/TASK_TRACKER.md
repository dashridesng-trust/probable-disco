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
*Status: Ready to implement*
- [ ] **AP0-1** Initialize React + Vite + TypeScript project in `probable-disco`.
- [ ] **AP0-2** Install Refine core (`@refinedev/core`), Ant Design (`antd`, `@ant-design/icons`, `@refinedev/antd`), and routing (`@refinedev/react-router`).
- [ ] **AP0-3** Configure Ant Design `ConfigProvider` theme tokens overriding colors exclusively to the 21 HEX tokens.
- [ ] **AP0-4** Implement Theme Context with **Light Mode** as default and **Dark Mode** toggle using the 21 colors.
- [ ] **AP0-5** Configure flexible table density support (`small` / `middle` / `default`) per component requirement.
- [ ] **AP0-6** Configure environment variables (`.env.example`, `.env`) with backend API URL and Clerk publishable key.

---

### Phase 1 — Auth & App Shell (Backend Phase 1 Aligned)
*Status: Backend P1 is Complete (`ClerkAuthGuard`, `UserRole.ADMIN`)*
- [ ] **AP1-1** Integrate Clerk authentication (`@clerk/clerk-react`).
- [ ] **AP1-2** Enforce Clerk claim `publicMetadata.role === 'ADMIN'` before granting portal access; display unauthorized access screen for non-admin accounts.
- [ ] **AP1-3** Create API client (Axios/Fetch) with Clerk session token injection and correlation ID headers.
- [ ] **AP1-4** Implement Routic App Shell Layout:
  - Persistent left sidebar with Routic branding, Deep Navy (`#07153F`) background, and Royal Navy (`#172B66`) active states.
  - Header bar with title, breadcrumbs, theme toggle, and logged-in admin Clerk profile avatar.
  - Main content container with responsive layout and Frame Background Gray (`#E9EBEF`) canvas.
- [ ] **AP1-5** Access Control Provider integration with Refine (`accessControlProvider`).
- [ ] **AP1-6** Verify that no admin user creation, invitation, or account-management UI is present.

---

### Phase 2 — Verification Queue (Backend Phase 2 Aligned)
*Status: Backend P2 is Complete (`GET /verifications`, `GET /verifications/:id`, `PATCH /verifications/:id/review`)*
- [ ] **AP2-1** Verification Queue List view (`/verifications`):
  - Integrate `GET /verifications` with filter tabs: All, User Verifications (`targetType=USER`), Vehicle Verifications (`targetType=VEHICLE`).
  - Status filters: `PENDING`, `APPROVED`, `REJECTED`, `RETRY_REQUIRED`.
  - Server-side pagination and sorting.
- [ ] **AP2-2** Verification Inspection Detail / Drawer (`/verifications/:id`):
  - Identity document viewer: NIN slip, live selfie, driver's license (front & back).
  - Proof of address & Flutter Maps GPS coordinate pin drop comparison.
  - Vehicle document inspection: Proof of ownership, vehicle license, roadworthiness, insurance certificate, hackney permit.
- [ ] **AP2-3** Verification Adjudication Action (`PATCH /verifications/:id/review`):
  - Approve / Reject / Retry Required modal dialog.
  - Expiry dates capture (`driverLicenseExpiryDate`, `vehicleLicenseExpiryDate`, etc.).
  - Mandatory `decisionReason` input and internal review notes.
  - Optimistic / error handling and audit trace display.

---

### Phase 3 — Vehicles & Listings Management (Backend Phase 3 Aligned)
*Status: Backend P3 is Complete (`GET /vehicles/admin/queue`, `PATCH /vehicles/admin/:id/review`, `GET /vehicles/:id`)*
- [ ] **AP3-1** Vehicle Management Table (`/vehicles`):
  - Integrate `GET /vehicles/admin/queue`.
  - Filters by `listingStatus` (`DRAFT`, `PENDING_REVIEW`, `PUBLISHED`, `UNPUBLISHED`, `SUSPENDED`, `REJECTED`) and `verificationStatus`.
  - Columns: Vehicle specs (make, model, year), plate number, host, daily rate (kobo to NGN format), listing status, verification badge.
- [ ] **AP3-2** Vehicle Detail & Media Inspector (`/vehicles/:id`):
  - Specs, pricing, policies, fuzzed public location vs private pickup address.
  - Photo gallery (exterior, interior, odometer) with zoom modal.
  - Availability calendar blocks view.
- [ ] **AP3-3** Listing Adjudication Modal (`PATCH /vehicles/admin/:id/review`):
  - Actions: `APPROVE`, `REJECT`, `SUSPEND`.
  - Security deposit amount input (in kobo / NGN).
  - Mandatory review reason code and notes.

---

### Phase 4 — Bookings Management (Gated on Backend Phase 4)
*Status: ⏳ Gated — Waiting for Backend P4 completion*
- [ ] **AP4-1** Bookings list view (`/bookings`) with status filters (`REQUESTED`, `APPROVED`, `PAYMENT_PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`).
- [ ] **AP4-2** Booking detail view: Itemized price breakdown, renter/host information, rental agreement acceptance details.
- [ ] **AP4-3** State-appropriate admin interventions with reason capture.

---

### Phase 5 — Payments & Financial Oversight (Gated on Backend Phase 5)
*Status: ⏳ Gated — Waiting for Backend P5 completion*
- [ ] **AP5-1** Transaction monitoring table (Paystack reference, booking ID, amount in NGN, status, timestamps).
- [ ] **AP5-2** Payment reconciliation exceptions view.
- [ ] **AP5-3** **STRICT ENFORCEMENT**: Read-only oversight; all money-moving actions (refunds, deposit releases) remain disabled until policy approval.

---

### Phase 6 — Rentals & Handover Management (Gated on Backend Phase 6)
*Status: ⏳ Gated — Waiting for Backend P6 completion*
- [ ] **AP6-1** Active rentals operations board (`UPCOMING`, `ACTIVE`, `ENDING_SOON`, `EXPIRED`, `OVERDUE`, `RETURN_PENDING`, `COMPLETED`).
- [ ] **AP6-2** Rental detail view: Handover schedule, extension requests, status timestamps.
- [ ] **AP6-3** Overdue & non-return tracking view.

---

### Phase 7 — Inspections & Completion Review (Gated on Backend Phase 7)
*Status: ⏳ Gated — Waiting for Backend P7 completion*
- [ ] **AP7-1** Pickup vs Return inspection comparison viewer (odometer, fuel, condition notes, before/after photos).
- [ ] **AP7-2** Completion verification records.

---

### Phase 8 — Payouts Oversight (Gated on Backend Phase 8)
*Status: ⏳ Gated — Waiting for Backend P8 completion*
- [ ] **AP8-1** Payouts queue (`PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`, `ON_HOLD`).
- [ ] **AP8-2** Payout hold / release controls linked to active disputes.

---

### Phase 9 — Messaging & Moderation (Gated on Backend Phase 9)
*Status: ⏳ Gated — Waiting for Backend P9 completion*
- [ ] **AP9-1** Flagged message / anti-circumvention queue.
- [ ] **AP9-2** Admin messaging interface with distinct customer-facing messages vs internal notes.

---

### Phase 10 — Incidents & Disputes (Gated on Backend Phase 10)
*Status: ⏳ Gated — Waiting for Backend P10 completion*
- [ ] **AP10-1** Incidents queue (`NON_RETURN`, `DAMAGE`, `ACCIDENT`, `LATE_RETURN`, `PAYMENT_ISSUE`, `MISCONDUCT`).
- [ ] **AP10-2** Disputes case management, assignment, priority/severity, and resolution workflow.

---

### Phase 11 — Review Moderation (Gated on Backend Phase 11)
*Status: ⏳ Gated — Waiting for Backend P11 completion*
- [ ] **AP11-1** User and vehicle reviews moderation table.

---

### Phase 12 — Notifications & Broadcasts (Gated on Backend Phase 12)
*Status: ⏳ Gated — Waiting for Backend P12 completion*
- [ ] **AP12-1** Targeted announcement composer with cohort selection and delivery tracking.

---

### Phase 13 — Admin User Management & Profile Overview (Gated on Backend Phase 13)
*Status: ⏳ Gated — Waiting for Backend P13-2 completion*
- [ ] **AP13-1** User management table (status, driver verification badge, renter/owner stats).
- [ ] **AP13-2** Account restriction/suspension/reinstatement dialogs with mandatory audit reason.

---

### Phase 14 — Audit Logs & System Health (Gated on Backend Phase 14)
*Status: ⏳ Gated — Waiting for Backend P14-1 completion*
- [ ] **AP14-1** Centralized append-only audit log browser.
- [ ] **AP14-2** Sanitized before/after change diff inspector.
