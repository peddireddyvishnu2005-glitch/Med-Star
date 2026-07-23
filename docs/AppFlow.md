# Application Flow Document — MedStart

## 1. Flow Overview
MedStart supports three primary user navigation flows: Guest Flow, Registered User Flow, and Admin Flow.

## 2. Guest User Flow Diagram

```
Landing Page
   │
   ├──► Search Hospitals (Filter by City / Specialty / Emergency)
   │       │
   │       └──► Hospital List View
   │               │
   │               └──► Hospital Details Page
   │                       │
   │                       └──► Allow GPS Permission
   │                               │
   │                               └──► Generate Route (Fastest / Shortest)
   │                                       │
   │                                       └──► Interactive Leaflet Map
   │                                               │
   │                                               └──► Turn-by-Turn Directions
   │                                                       │
   │                                                       └──► Complete Navigation
```

## 3. Registered User Flow Diagram

```
User Login / Register
   │
   └──► User Dashboard
           ├──► Search & Discover Hospitals
           ├──► View Hospital Profile ──► Save to Favorites
           ├──► Interactive Turn-by-Turn Navigation ──► Log to Navigation History
           ├──► Manage Profile & Saved Locations
           └──► Notification Preferences
```

## 4. Admin Management Flow Diagram

```
Admin Login
   │
   └──► Admin Dashboard
           ├──► Hospital CRUD Management (Add/Edit/Delete Hospitals)
           ├──► Doctor Roster Management (Specialties, Availability)
           ├──► Department Management
           ├──► User & RBAC Permission Management (Assign Roles)
           ├──► FCM Notification Dispatch Portal
           ├──► System Audit Logs
           └──► Platform Analytics & Reports
```
