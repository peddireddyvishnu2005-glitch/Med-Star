# Security Specification — MedStart

## 1. OWASP Top 10 Mitigation
- **Injection Prevention**: Cloud Firestore strictly uses parameter-bound document references; SQL/NoSQL injection vectors are eliminated.
- **Broken Authentication**: Auth tokens verified on every server request via Firebase Admin SDK; token expiration and refresh handled securely.
- **Sensitive Data Exposure**: All data in transit strictly enforced with HTTPS TLS 1.3. Environment secrets managed securely.
- **Cross-Site Scripting (XSS)**: Next.js automatically escapes React JSX outputs. Content-Security-Policy (CSP) headers applied via Helmet.
- **CSRF Protection**: SameSite cookie policy and Authorization Bearer headers for API requests.

## 2. Firebase App Check & Rate Limiting
- Firebase App Check verifies incoming requests originate from legitimate MedStart web client apps.
- Express Rate Limit limits incoming requests to 100 calls per 15 minutes per IP address to eliminate DDoS vectors.
