# Technical Requirements Document (TRD) — MedStart

## 1. High-Level Architecture & Tech Stack

### Web Application Frontend (`apps/web`)
- **Framework**: Next.js 15 (App Router with Server Components & Client Components)
- **UI Engine**: React 19, Tailwind CSS, shadcn/ui components, Framer Motion animations
- **State & Data Fetching**: TanStack Query (React Query v5), React Hook Form, Zod validation schemas
- **Interactive Mapping**: Leaflet.js, React-Leaflet, OpenStreetMap tiles, OpenRouteService API
- **PWA & Offline**: Workbox Service Worker, Web Manifest, IndexedDB storage cache

### Backend REST Service (`apps/server`)
- **Framework**: NestJS (TypeScript Node.js)
- **API Standard**: RESTful JSON API with OpenAPI / Swagger Documentation
- **Database & Auth Integration**: Firebase Admin SDK (Cloud Firestore, Firebase Authentication, FCM)
- **Security Middleware**: Helmet, CORS, Express Rate Limit, Firebase App Check Verification

### Database & Cloud Platform
- **Database**: Cloud Firestore (NoSQL Document Store with sub-collections)
- **Auth Provider**: Firebase Auth (Email/Password, Google OAuth, Phone SMS OTP)
- **File Storage**: Firebase Cloud Storage (Images, Document attachments)
- **Push Messaging**: Firebase Cloud Messaging (FCM)
- **Infrastructure & Hosting**: Docker, Vercel, Firebase Hosting, GitHub Actions CI/CD

## 2. Low-Level System Components

```
+-----------------------------------------------------------------------+
|                           Client Layer                                |
|   Next.js 15 App Router (PWA) | Leaflet Mapping | TanStack Query     |
+-----------------------------------+-----------------------------------+
                                    | HTTPS / WSS / JWT
                                    v
+-----------------------------------------------------------------------+
|                           API Gateway / Server                        |
|   NestJS REST API Controllers | Rate Limiting | Helmet Security     |
+-----------------------------------+-----------------------------------+
                                    | Firebase Admin SDK
                                    v
+-----------------------------------------------------------------------+
|                           Cloud Data Layer                            |
|   Cloud Firestore Database | Firebase Auth | Firebase Cloud Storage   |
+-----------------------------------------------------------------------+
```

## 3. Disaster Recovery & Backup Strategy
- **Firestore Backups**: Automated daily automated export to Google Cloud Storage (GCS) cold-bucket with 30-day retention policy.
- **Failover Mechanism**: Multiple CDN edge caches via Vercel Edge Network for static UI assets and cached API responses.
- **Data Integrity**: Enforce strict Firestore Security Rules guarding every collection against unauthorized mutation.
