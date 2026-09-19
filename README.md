# SiteFlow — Construction Inventory Control

Construction-first multi-site inventory MVP for the Multi-Agent ERP & Project Management System.

## MVP
- Executive inventory dashboard
- Multi-site inventory visibility
- Barcode-oriented scan workflow
- Site-to-site transfers
- Material requisitions
- AI inventory recommendations
- Audit trail
- Responsive field-oriented UX
- Netlify-ready static deployment

## Architecture direction
The prototype uses demo data in the browser. Production architecture should use Go + PostgreSQL as the transactional source of truth, with native Android (Kotlin/Jetpack Compose) and iOS (Swift/SwiftUI) clients using the same API.

## Netlify
Connect this repository to Netlify and publish the repository root. `netlify.toml` is included.

## Next production milestones
1. Go API + PostgreSQL
2. Authentication/RBAC
3. Immutable inventory transaction ledger
4. Camera barcode/QR scanning
5. Offline-first sync and conflict resolution
6. Procurement, GRN, issues and returns
7. AI agent services
8. Native Android/iOS apps
9. Production security and observability
