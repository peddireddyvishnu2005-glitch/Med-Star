# Wireframes Specification — MedStart

## 1. Landing / Hero Screen Wireframe

```
+-----------------------------------------------------------------------+
|  MedStart [Logo]      [Search]  [Emergency]  [Favorites]   [Login]    |
+-----------------------------------------------------------------------+
|                                                                       |
|   Find Emergency Hospitals & Fast Navigation Near You                 |
|   [ 🔍 Search hospital, city, specialty... ]  [📍 Detect Location]    |
|                                                                       |
|   [🚨 24/7 Emergency Nearby]  [🫀 Cardiology]  [👶 Pediatrics]        |
+-----------------------------------------------------------------------+
|  Top Nearby Hospitals (Grid / Cards)                                  |
|  +------------------------+  +------------------------+               |
|  | City General Hospital  |  | St. Jude Care Center   |               |
|  | ⭐ 4.8 (120 reviews)   |  | ⭐ 4.6 (85 reviews)    |               |
|  | 📍 1.2 km away         |  | 📍 3.4 km away         |               |
|  | 🚨 Emergency Open      |  | 🚨 Emergency Open      |               |
|  | [View]  [Navigate]     |  | [View]  [Navigate]     |               |
|  +------------------------+  +------------------------+               |
+-----------------------------------------------------------------------+
```

## 2. Interactive Navigation Wireframe

```
+-----------------------------------------------------------------------+
|  <- Back to Hospital Details                       Distance: 2.4 km   |
+----------------------------------------------------+------------------+
|                                                    | Turn Instructions|
|                                                    | ---------------- |
|                  MAP CANVAS                        | ⬆️ Head North    |
|             (Leaflet OSM Polyline)                 |    200m on Main |
|                                                    | ➡️ Turn Right    |
|                    [📍 User]                       |    500m on Oak   |
|                      \                             | 🏁 Destination   |
|                       \==== [🏥 Hospital]          |    on Left       |
|                                                    | [ Recalculate ]  |
+----------------------------------------------------+------------------+
```
