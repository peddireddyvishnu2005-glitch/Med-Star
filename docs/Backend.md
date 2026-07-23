# Backend Architecture — MedStart

## 1. Overview
The backend service (`apps/server`) is implemented using NestJS with TypeScript, providing modular Controllers, Services, Guards, Interceptors, DTO validation, and Swagger OpenAPI specs.

## 2. NestJS Module Layout
```
apps/server/src/
├── main.ts                   # Bootstrap NestJS app, setup Swagger & CORS
├── app.module.ts             # Root module importing feature modules
├── modules/
│   ├── auth/                 # Auth controller, Firebase Admin guard, RBAC roles
│   ├── hospitals/            # Hospital CRUD, geo-search, specialty filters
│   ├── doctors/              # Doctor roster service & controller
│   ├── departments/          # Department taxonomy service
│   ├── navigation/           # Route calculation proxy & route history
│   ├── favorites/            # User favorite hospitals
│   ├── notifications/        # FCM notification dispatching
│   ├── audit/                # Audit logs recorder
│   └── analytics/            # Admin dashboard statistics aggregator
├── common/
│   ├── decorators/           # Custom decorators (@Roles, @CurrentUser)
│   ├── guards/               # AuthGuard, RolesGuard
│   ├── interceptors/         # LoggingInterceptor, TransformInterceptor
│   └── filters/              # GlobalExceptionFilter
```
