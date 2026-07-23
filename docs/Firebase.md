# Firebase Configuration & Security Rules — MedStart

## 1. Firebase Integration Architecture
MedStart integrates Firebase Auth for multi-provider login, Cloud Firestore for enterprise persistence, Cloud Storage for hospital media, and Firebase Cloud Messaging (FCM) for emergency alerts.

## 2. Cloud Firestore Security Rules (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && (
        request.auth.token.role == 'ADMIN' || 
        request.auth.token.role == 'SUPER_ADMIN'
      );
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Public readable hospital listings
    match /hospitals/{hospitalId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /doctors/{doctorId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /departments/{deptId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /users/{userId} {
      allow read, write: if isOwner(userId) || isAdmin();
      
      match /routeHistory/{historyId} {
        allow read, write: if isOwner(userId);
      }
    }

    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update, delete: if isOwner(resource.data.userId) || isAdmin();
    }
    
    match /auditLogs/{logId} {
      allow read, write: if isAdmin();
    }
  }
}
```
