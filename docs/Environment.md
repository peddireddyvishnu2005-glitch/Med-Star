# Environment Variables Configuration — MedStart

## 1. Web Frontend Environment Variables (`apps/web/.env.example`)
```env
NEXT_PUBLIC_APP_NAME="MedStart"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000/api/v1"

# Firebase Public Config
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyDummyKey_MedStart123"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="medstart-app.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="medstart-app"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="medstart-app.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1092837465"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1092837465:web:abcdef123456"

# OpenRouteService Mapping Key (Optional for fallback)
NEXT_PUBLIC_OPENROUTE_API_KEY="5b3ce3597851110001cf6248..."
```

## 2. Server API Environment Variables (`apps/server/.env.example`)
```env
PORT=4000
NODE_ENV=development
CORS_ORIGIN="http://localhost:3000"

# Firebase Admin SDK Credentials
FIREBASE_PROJECT_ID="medstart-app"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk@medstart-app.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```
