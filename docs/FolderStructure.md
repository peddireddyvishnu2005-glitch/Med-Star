# Monorepo Folder Structure — MedStart

```
MedStar-pj/
├── apps/
│   ├── web/                     # Next.js 15 App Router Web App & PWA
│   │   ├── public/              # Static icons, markers, manifest.json
│   │   ├── src/
│   │   │   ├── app/             # Next.js App Router Page hierarchy
│   │   │   ├── components/      # UI components (Leaflet Map, Cards, Modals)
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   ├── services/        # Firebase & API client SDK
│   │   │   └── types/           # Frontend TypeScript interfaces
│   │   └── package.json
│   └── server/                  # NestJS REST Backend API
│       ├── src/
│       │   ├── modules/         # Auth, Hospitals, Doctors, Navigation, Admin
│       │   ├── common/          # Guards, Filters, Interceptors, Decorators
│       │   └── main.ts
│       └── package.json
├── docs/                        # Complete Enterprise Specifications (25 Files)
├── docker/                      # Dockerfiles and Docker Compose configs
├── .github/workflows/           # CI/CD Workflows
├── firestore.rules              # Firebase Firestore Security Rules
├── firestore.indexes.json       # Firebase Firestore Composite Indexes
├── package.json                 # Monorepo workspace config
└── README.md                    # Main Project Overview
```
