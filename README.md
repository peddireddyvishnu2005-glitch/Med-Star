# MedStart — Enterprise Hospital Finder & Navigation Platform

MedStart is an enterprise-grade Hospital Finder & Turn-by-Turn Navigation Platform built with Next.js 15, React 19, TypeScript, Tailwind CSS, Leaflet/OpenStreetMap, Firebase Auth & Firestore, NestJS, and Docker.

---

## 🌟 Key Features

- 🏥 **Hospital Discovery & Search**: Filter by city, specialty department, star rating, and 24/7 emergency availability.
- 📍 **GPS Geolocation & Radial Proximity**: Automatic HTML5 geolocation detection with sub-100ms distance calculation.
- 🗺️ **Turn-by-Turn Interactive Map Navigation**: Leaflet.js rendering with fastest/shortest route geometry and step-by-step guidance.
- 🚨 **Live Emergency Bed Tracking**: Real-time ICU and emergency room bed counts.
- 👑 **Multi-Tier RBAC Admin Portal**: Switch seamlessly between Guest, Registered User, Admin, and Super Admin roles.
- 📱 **Progressive Web App (PWA)**: Offline route caching, custom manifest, and service worker shell.
- ⚡ **REST API & Swagger Docs**: NestJS OpenAPI specifications at `/docs`.

---

## 📁 Repository & Documentation Directory

- Complete enterprise specifications are available in the [/docs](file:///c:/Users/vallu/OneDrive/Desktop/mywebside/MedStar-pj/docs/README.md) folder (25 markdown documents).

---

## 🛠️ Quick Start & Installation

### Option A: Local Web Application Development

```bash
# Navigate to web application directory
cd apps/web

# Install dependencies
npm install

# Run Next.js 15 App Router Dev Server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Option B: Local NestJS REST API Development

```bash
# Navigate to NestJS backend directory
cd apps/server

# Install dependencies
npm install

# Run NestJS Dev Server with Watch Mode
npm run dev
```

Swagger OpenAPI documentation will be live at [http://localhost:4000/docs](http://localhost:4000/docs).

---

### Option C: Docker Containerization

```bash
docker-compose up --build
```

---

## 🧪 Testing

```bash
# Run web unit tests
cd apps/web && npm run test
```

---

## 📄 License

MIT License © MedStart Engineering Team.
