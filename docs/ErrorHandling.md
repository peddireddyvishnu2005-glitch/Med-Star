# Global Error Handling Specification — MedStart

## 1. HTTP Status Taxonomy
- `400 Bad Request`: Validation failure (Zod / Class Validator DTO errors).
- `401 Unauthorized`: Missing or expired Firebase JWT token.
- `403 Forbidden`: Insufficient RBAC privilege.
- `404 Not Found`: Hospital, Doctor, or Route resource not found.
- `409 Conflict`: Duplicate entry or resource state clash.
- `429 Too Many Requests`: Exceeded rate limit thresholds.
- `500 Internal Server Error`: Unhandled exception caught by global filter.

## 2. Offline & Network Error Recovery
- Network error boundaries trigger offline toast notification.
- Offline navigation mode automatically falls back to cached route polylines and stored hospital details.
