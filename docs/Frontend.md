# Frontend Architecture — MedStart

## 1. Overview & Framework Setup
The frontend (`apps/web`) is built with Next.js 15 App Router using React 19, TypeScript, Tailwind CSS, Lucide icons, and Leaflet mapping libraries.

## 2. Directory Architecture
```
apps/web/src/
├── app/                  # Next.js 15 App Router pages & layouts
│   ├── (auth)/           # Login, Register, Forgot Password
│   ├── admin/            # Admin Dashboard, CRUD management
│   ├── hospitals/        # Hospital listing, details, reviews
│   ├── navigation/       # Interactive Leaflet map & turn-by-turn nav
│   ├── profile/          # User profile, history, favorites
│   ├── layout.tsx        # Global Layout with Providers & Navigation
│   └── page.tsx          # Main Landing Page
├── components/           # Reusable UI & Feature components
│   ├── ui/               # Base design system components (Button, Card, Dialog, etc.)
│   ├── map/              # Leaflet map container, markers, routing polyline
│   ├── hospital/         # Cards, filter bars, detail tabs
│   └── admin/            # Data tables, stat cards, management forms
├── hooks/                # Custom React hooks (useGeolocation, useRoute, useAuth)
├── services/             # Firebase & REST API SDK service callers
├── store/                # Client state management
└── types/                # Component & API TypeScript interfaces
```
