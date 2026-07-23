# Authentication & Role-Based Access Control (RBAC) — MedStart

## 1. Authentication Engine
MedStart uses Firebase Authentication supporting:
- Email / Password Login
- Google OAuth Single Sign-On (SSO)
- Phone SMS Verification
- JWT bearer tokens for backend NestJS verification

## 2. Role-Based Access Control (RBAC) Matrix

| User Role | Discover & Search | View Details & Route | Save Favorites | Write Reviews | Admin Dashboard | CRUD Hospitals / Doctors | Manage Users |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Guest** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **User** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Super Admin** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## 3. NestJS Authorization Execution
```typescript
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@Post('hospitals')
async createHospital(@Body() dto: CreateHospitalDto) {
  return this.hospitalsService.create(dto);
}
```
