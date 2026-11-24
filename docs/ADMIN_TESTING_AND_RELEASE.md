# Routic Admin Portal — Testing and Release

## Frontend tests
Navigation and access states; table pagination/filter/sort; loading/empty/error states; form validation and server errors; confirmation/reason capture; permission-aware controls; message targeting; export status; accessibility and keyboard interaction.

## Backend tests
Clerk verification/admin approval; resource-level authorization; state transitions; audit event creation and scrubbing; case assignment/resolution; manual verification; idempotency; export authorization/filtering; message targeting; finance mutations blocked until policy approval.

## End-to-end scenarios
1. Approved admin signs in.
2. Unapproved Clerk identity is denied.
3. Admin searches and views user.
4. Admin reviews verification.
5. Admin manually reviews vehicle/listing.
6. Admin suspends/restores user with reason and audit.
7. Admin views booking/rental timeline.
8. Admin opens and assigns incident.
9. Internal note is not visible to customer.
10. Admin sends individual in-app message.
11. Admin moderates reported message.
12. Admin exports approved report.
13. Unauthorized evidence access is denied.
14. Admin-management route/API is absent.
15. Financial mutation is blocked while payment model is unresolved.
16. Sensitive actions create audit records.

## Security tests
Direct API calls bypassing UI; forged roles; IDOR/BOLA; XSS through user content; CSV formula injection; malicious uploads; rate limits; bulk messaging abuse; export leakage; duplicate refund/payout simulation after approval; audit mutation/deletion attempts.

## Release gates
Clerk approval tested; MFA policy decided; no admin self-management; backend authorization on every endpoint; audit coverage verified; private evidence protected; state transitions tested; payment model approved before financial mutations; metric definitions reviewed; export protections tested; monitoring/backups/incident response ready; privacy and retention reviewed; separate staging/production credentials.

## Runbooks
Clerk admin approval/offboarding; verification backlog; listing review; incident/dispute escalation; payment reconciliation; refund/payout exceptions; privacy/evidence requests; bulk notification mistakes; export exposure; security incident investigation.
