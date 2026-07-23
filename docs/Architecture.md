# Architecture Specification — MedStart

## 1. Monorepo Architectural Pattern
MedStart leverages a clean monorepo architecture separating client applications, server endpoints, and shared configuration.

```
medstart-monorepo/
├── apps/
│   ├── web/            # Next.js 15 App Router Frontend
│   └── server/         # NestJS REST Backend API
├── packages/
│   ├── config/         # Shared ESLint, TypeScript, Tailwind config
│   └── types/          # Shared TypeScript DTOs and Data Interfaces
└── docs/               # 25 Complete Specification Documents
```

## 2. Layer Separation & Clean Architecture
Following Clean Architecture principles, both the Frontend and Backend enforce strict boundaries:

1. **Presentation Layer**: React Components, Page Routes, UI Design Tokens.
2. **Application / Business Logic Layer**: Custom React Hooks, TanStack Query hooks, NestJS Services.
3. **Domain Layer**: Core Entity definitions, DTO validation schemas, RBAC permission matrices.
4. **Infrastructure Layer**: Firebase SDK integrations, Leaflet API adapters, HTTP Clients.

## 3. Data Flow Architecture
```
[User Browser / Device]
       │ (1) Action / Input
       ▼
[React Component / Page] ──► (2) TanStack Query Hook
                                    │
                                    ▼ (3) HTTP REST request with Auth Token
                            [NestJS Controller]
                                    │
                                    ▼ (4) Guard / RBAC Check
                            [NestJS Service]
                                    │
                                    ▼ (5) Repository / Firebase Admin SDK
                            [Cloud Firestore / Storage]
```
