# REST API Specification — MedStart

## 1. OpenAPI / Swagger Endpoints Summary

### Authentication
- `POST /api/v1/auth/verify-token` — Validate Firebase IdToken and fetch user claims.
- `GET /api/v1/auth/me` — Fetch currently authenticated profile and permissions.

### Hospitals
- `GET /api/v1/hospitals` — List hospitals with pagination, city, specialty, and emergency filtering.
- `GET /api/v1/hospitals/:id` — Get complete hospital detail, doctors, and department roster.
- `GET /api/v1/hospitals/nearby` — Geo-radial search (`lat`, `lng`, `radiusKm`).
- `POST /api/v1/hospitals` — [Admin] Create hospital.
- `PUT /api/v1/hospitals/:id` — [Admin] Update hospital status and bed count.
- `DELETE /api/v1/hospitals/:id` — [Admin] Soft delete hospital record.

### Navigation & Routing
- `GET /api/v1/navigation/route` — Calculate route geometry (`startLat`, `startLng`, `destLat`, `destLng`, `mode`).
- `POST /api/v1/navigation/history` — Save completed turn-by-turn navigation session.
- `GET /api/v1/navigation/history` — List user navigation history.

### Favorites & Reviews
- `POST /api/v1/favorites/toggle` — Add/remove hospital from user favorites.
- `GET /api/v1/favorites` — Get user saved hospitals.
- `POST /api/v1/reviews` — Add review and rating for a hospital.

### Admin & Analytics
- `GET /api/v1/admin/analytics` — Platform metrics (total searches, routes calculated, hospital counts).
- `GET /api/v1/admin/audit-logs` — System activity audit stream.
