# Routic Admin Portal — Operational Workflows

## User verification
Queue → inspect user/submission → review protected evidence → approve/reject/request information → record reason and evidence reference → persist reviewer/timestamp → notify user → audit. Ask before implementation for required ID/licence types, eligibility rules, review SLA, rejection/resubmission and retention policy.

## Vehicle/listing manual verification
Pending queue → inspect listing, owner, vehicle details, photos and documents → compare against approved checklist → approve/reject/request information/escalate → persist reason, reviewer, timestamp and evidence references → audit. Ask what “verified” means, required documents, physical inspection requirements, expiry and appeal rules.

## User intervention
Review profile and linked activity → select allowed restriction/suspension/restoration/deactivation action → explain impact → capture reason → backend validates current state and policy → persist and audit → notify if required. Ask for account states, suspension duration, active rental consequences, appeal and deletion rules.

## Booking/rental intervention
Search record → inspect timeline, parties, payment and handover evidence → choose explicit state-appropriate action → capture reason → backend validates transition and side effects → notify and audit. Never provide generic arbitrary status editing. Ask about cancellation authority, no-show, overdue thresholds, extension, completion override and refund consequences.

## Incidents/disputes
Proposed lifecycle, pending approval: `OPEN → TRIAGED → ASSIGNED → INVESTIGATING → AWAITING_USER → DECISION_PENDING → RESOLVED → CLOSED`, with `ESCALATED` and `REOPENED`. Link relevant users, vehicle, booking, rental, payment and payout. Assign owner; set priority/severity; collect evidence; maintain communication history and private notes; record findings, decision and reason; execute related financial action only through approved finance workflow; notify parties; close/reopen as policy allows. Ask for taxonomy, definitions, SLA, escalation, final decision authority, appeal and payout-hold rules.

## Finance
Until the model is approved, build read-only transaction visibility and reconciliation views only. Do not enable refund, deposit, payout or settlement actions. Once approved, define payment timing, platform fee, deposit mechanism, cancellation/refund matrix, payout trigger/delay, holds, chargebacks, reversals, partial refunds and reconciliation.

## Messaging/notifications
Choose individual user or approved cohort → clearly display recipient scope and message visibility → compose/preview → confirm send → backend checks eligibility/preferences → queue and track delivery where available → audit. Keep internal notes separate from customer-visible messages. Ask whether admin replies use existing chat threads, attachment rules, promotional consent, bulk limits and moderation actions.

## Exports
Select report/date range/filters → preview count and columns → generate securely → record export audit event → provide protected download. Ask about report catalogue, sensitive columns, row limits, retention and async generation.
