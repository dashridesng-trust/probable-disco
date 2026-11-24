# Routic Admin Portal — Open Decisions

AI agents must ask the product owner before implementing behavior dependent on an unresolved decision. Record approved answers here and update affected docs.

## Authentication/admin provisioning
1. What exact Clerk signal identifies approved admins: organization membership, role/metadata claim, allowlist or other?
2. Is MFA mandatory for every admin?
3. Who can approve/offboard admins in Clerk dashboard?
4. What is the offboarding process and revocation propagation time?
5. Is a separate Routic admin-active record required?
6. What session lifetime and reauthentication rules apply?

## User management
1. Canonical account states?
2. Difference between restrict, suspend, deactivate and delete?
3. Can admins permanently delete users or only request deletion?
4. What happens to active rentals, bookings, messages and payouts on suspension?
5. Which profile fields may admins edit?
6. Appeal/reinstatement process?
7. Verification types and eligibility criteria?

## Vehicles/listings
1. Required documents by vehicle type?
2. What does manual verification certify?
3. Is physical inspection required?
4. Listing states and valid transitions?
5. Difference between reject, suspend, unpublish and remove?
6. Appeal process?
7. Vehicle categories/location rules at launch?

## Bookings/rentals
1. Canonical booking and rental states?
2. What can admins cancel or modify?
3. Can admins change dates, price, parties or vehicle after booking?
4. No-show, late pickup, overdue and non-return rules?
5. Are extensions in MVP and what is the approval flow?
6. When may an admin override completion?
7. Pickup/return evidence requirements?
8. Accident/theft/non-return escalation process?

## Incidents/disputes
1. Approve case lifecycle and category taxonomy?
2. Define priority and severity separately?
3. Response/resolution targets?
4. Final decision authority and escalation?
5. Reopen/appeal conditions?
6. Evidence types/file limits/retention?
7. Payout hold/release criteria, authority and scope?

## Finance — resolve before money-moving implementation
1. Payment sequence relative to owner acceptance?
2. Platform fee/commission?
3. Deposit? If yes, legal/provider-supported mechanism?
4. Is “escrow” accurate and approved?
5. Cancellation/refund matrix?
6. Owner payout trigger and delay?
7. Who can place/release holds?
8. Chargeback, reversal, partial refund and payout failure handling?
9. Paystack product/account configuration?
10. Authoritative definitions for revenue, owner payable and fees?

## Messaging/notifications
1. Does admin reply in the existing renter/owner chat thread?
2. Attachments and file limits?
3. Can admins message users who opt out of promotional notifications?
4. Transactional vs promotional classification?
5. Bulk-send limits and confirmation?
6. Moderation actions allowed?
7. Message/attachment retention?
8. Templates required?

## Dashboard/exports
1. Launch-critical metrics and formulas?
2. Default timezone/date ranges and refresh cadence?
3. Which reports export?
4. Prohibited export fields?
5. Row/file limits and retention?
6. Who can export financial/sensitive data?
7. Background or synchronous export?

## Design
1. Official logo, colors, fonts and brand references?
2. Light/dark/system theme?
3. Supported browsers and minimum viewport?
4. Tablet support?
5. Compact or spacious table density?
6. Preferred navigation after staff feedback?

## Infrastructure
1. Hosting provider and admin domain?
2. CI/CD and deployment approval?
3. Monitoring/error reporting?
4. Durable queue/job technology?
5. Backup/restore objectives?
6. Expected admin count/concurrency?
7. Hosting and third-party budget?

## AI implementation gate
State the missing decision, explain why it changes implementation, ask the smallest useful question set, do not code production behavior based on a guess, continue unrelated safe work where possible, and record approved answers here.
