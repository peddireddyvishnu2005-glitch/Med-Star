# UI/UX Design System Specification — MedStart

## 1. Design Philosophy
MedStart applies a modern glassmorphic aesthetic tailored for clinical clarity, high contrast accessibility, dynamic responsiveness, and premium user experience.

## 2. Color Palette (Tailwind Tokens & CSS Variables)

```css
:root {
  /* Brand Palette */
  --primary: #0284c7;         /* Ocean Blue */
  --primary-foreground: #ffffff;
  --secondary: #0f172a;       /* Deep Slate */
  --accent: #06b6d4;          /* Cyan Accent */
  
  /* Status Colors */
  --emergency: #ef4444;       /* Vivid Crimson */
  --success: #10b981;         /* Emerald Green */
  --warning: #f59e0b;         /* Amber Yellow */
  
  /* Theme Surfaces (Light Mode) */
  --background: #f8fafc;
  --surface: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --border: #e2e8f0;
}

.dark {
  /* Theme Surfaces (Dark Mode) */
  --background: #090d16;
  --surface: #111827;
  --text-main: #f9fafb;
  --text-muted: #9ca3af;
  --border: #1f2937;
}
```

## 3. Typography Hierarchy
- **Primary Font**: `Inter`, system-ui, sans-serif
- **Heading 1**: 2.5rem (40px) / Bold / Tracking tight
- **Heading 2**: 1.875rem (30px) / SemiBold
- **Heading 3**: 1.25rem (20px) / Medium
- **Body Text**: 1rem (16px) / Regular / Leading relaxed
- **Caption / Meta**: 0.875rem (14px) / Regular

## 4. Responsive Breakpoints
- **Mobile S**: 320px
- **Mobile M**: 375px
- **Mobile L**: 480px
- **Tablet**: 768px
- **Laptop**: 1024px
- **Desktop**: 1280px
- **Wide Desktop**: 1440px +
