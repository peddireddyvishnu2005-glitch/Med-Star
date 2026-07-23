# Performance Specification — MedStart

## 1. Lighthouse Target Benchmarks
- **Performance**: ≥ 95
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 2. Optimization Techniques
1. **Dynamic Dynamic Imports / Code Splitting**: Leaflet map components are lazily loaded with `next/dynamic` (`ssr: false`) to avoid server-side window errors and reduce bundle size.
2. **Image Optimization**: Using `next/image` with WebP/AVIF formats and responsive srcsets.
3. **PWA Offline Service Worker**: Pre-caches HTML shells, CSS bundles, font assets, and map icons for instant load.
4. **Font Optimization**: Google Fonts `Inter` loaded with `font-display: swap` and preconnect links.
