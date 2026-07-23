# Testing & Quality Assurance Plan — MedStart

## 1. Testing Strategy
- **Unit Testing**: Vitest and Jest for utility functions, distance calculators, custom hooks, and NestJS services.
- **Integration Testing**: Supertest for NestJS API endpoints with mock Firestore database context.
- **End-to-End (E2E) Testing**: Playwright testing user flows: search hospital, trigger navigation, toggle favorites, and admin CRUD workflows.
- **Accessibility Testing**: `@axe-core/playwright` automated WCAG 2.2 AA validation.

## 2. Test Command Execution
```bash
# Run unit & component tests
npm run test

# Run E2E Playwright tests
npm run test:e2e
```
