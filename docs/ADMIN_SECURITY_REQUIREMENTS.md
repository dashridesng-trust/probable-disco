# Routic Admin Portal — Security Requirements

## Objectives
Protect customer personal data, identity/driver documents, vehicle records, transaction information, dispute evidence, internal communications and administrative authority.

## Authentication
Clerk is the planned identity provider; admin approval is manual through Clerk dashboard. NestJS verifies sessions/tokens on protected requests and rejects unapproved/inactive identities. MFA/session lifetime/reauthentication are open decisions. Never expose Clerk secret keys in Vite client bundles.

## Authorization
Every endpoint checks admin approval, capability and resource-level access. Current admins share capabilities. No admin account-management endpoints. Prevent IDOR/BOLA. Never trust client role claims or actor IDs.

## Sensitive actions
Use explicit confirmation, reason capture where appropriate, idempotency for retryable side effects and audit logging. Consider reauthentication for high-risk actions after policy approval.

## Data protection
Minimize PII in list views/logs; mask identifiers unless needed; protect private documents/evidence with authorized short-lived access; separate public listing media from private documents; use TLS and provider encryption at rest; do not store card credentials; define retention/deletion for documents, cases, messages, exports and audit.

## Application security
Validate server-side; rate-limit login-adjacent, search, message, export and high-risk endpoints; protect against XSS, CSRF where applicable, injection, SSRF and malicious uploads; strict CORS; secure headers/CSP; render untrusted messages safely; validate upload content/size; least-privilege service credentials.

## Financial safety
Until payment/deposit/payout model is approved, allow only safe read-only financial views. Disable refund/deposit/payout/settlement mutations. Never infer escrow. Verify Paystack events server-side; browser redirect is not proof of payment. Use idempotency and reconciliation.

## Security tests
Unauthenticated/unapproved access; expired/revoked sessions; cross-user resource access; absent admin-management endpoints; forged permission payloads; XSS; malicious uploads; export leakage; duplicate financial requests; audit tampering.
