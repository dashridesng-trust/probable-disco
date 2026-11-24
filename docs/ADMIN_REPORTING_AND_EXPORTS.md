# Routic Admin Portal — Reporting and Exports

## Dashboard metrics catalogue
### Marketplace/users
Total users; active users; renter-capable users; owner-capable users; new registrations; suspended/restricted users; verification backlog and completion/rejection rates.

### Supply
Total vehicles; active/pending/rejected/suspended listings; vehicles awaiting manual verification; supply by location/category/status where supported.

### Bookings/rentals
Booking requests; accepted/declined/expired/cancelled; confirmed bookings; active/upcoming/ending-soon/overdue/completed rentals; booking conversion/completion/cancellation rates; average rental duration if defined.

### Trust/safety
Open incidents/disputes; cases by category/priority/severity; first-response and resolution times; reopened cases; reported-message queue.

### Finance
Payment attempts by status; successful/failed/pending/refunded/reversed/disputed transactions; platform fees/revenue; owner earnings; payouts pending/paid/failed/held; refunds; reconciliation exceptions. Do not equate gross booking value with platform revenue. Hide/label unavailable until accounting definitions are approved.

### Support/communications
Open support cases; age/status; message volume; notification processing/delivery failures where provider supports it; staff workload if approved.

## Metric definition
Every metric must have formula, source, timezone, date-range behavior, inclusion/exclusion rules, refresh cadence and owner responsible for correctness.

## Reports
Candidate reports: user growth/status; verification backlog/turnaround; vehicle/listing supply and review outcomes; booking funnel/cancellations; rental completion/overdue; incident/dispute volume/resolution; payment/reconciliation; refund/payout; support workload; notification/messaging activity.

## CSV/Excel export
Selected reports export to CSV and Excel. Enforce the same server-side filters and authorization as the report. Preview record count/columns. Audit who exported which report, filters, timestamp and result. Protect files with authenticated/time-limited access. Apply row/file limits and background jobs for large exports. Exclude sensitive fields by default. Escape CSV formula injection. Use consistent dates/currency/encoding. Never include secrets, raw identity documents or unnecessary PII.

## Open decisions
Which reports launch first? Which fields are prohibited? Row/file limits? Retention? Timezone? Who can export financial/sensitive data? Synchronous or background exports?
