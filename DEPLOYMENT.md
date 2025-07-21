# Deployment Guide

## Overview

This document provides comprehensive instructions for deploying the Star Wars Character Browser application to various hosting platforms.

## Quick Deployment (Netlify)

### Automatic Deployment

The application is already deployed and accessible at:
**🚀 Live URL**: [https://melodic-tartufo-d120ac.netlify.app](https://melodic-tartufo-d120ac.netlify.app)

## Manual Deployment Options

### 1. Netlify (Recommended)

#### Prerequisites

- Netlify account
- Git repository with your code

#### Steps

1. **Build the Application**

   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login to Netlify
   netlify login

   # Deploy to production
   netlify deploy --prod --dir=dist
   ```

3. **Deploy via Netlify Dashboard**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Click "Deploy site"

#### Netlify Configuration

Create `netlify.toml` in project root:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 2. Vercel

#### Prerequisites

- Vercel account
- Git repository

#### Steps

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Deploy**

   ```bash
   # Login to Vercel
   vercel login

   # Deploy
   vercel --prod
   ```

#### Vercel Configuration

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. GitHub Pages

#### Prerequisites

- GitHub repository
- GitHub Actions enabled

#### Steps

1. **Create GitHub Actions Workflow**
   Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest

       steps:
         - name: Checkout
           uses: actions/checkout@v3

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: "18"
             cache: "npm"

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build

         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Configure Repository**
   - Go to repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch

#### Vite Configuration for GitHub Pages

Update `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/your-repository-name/", // Replace with your repo name
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
```

### 4. Firebase Hosting

#### Prerequisites

- Firebase account
- Firebase CLI

#### Steps

1. **Install Firebase CLI**

   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**

   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure Firebase**
   Select or create a project, then configure:

   - Public directory: `dist`
   - Single-page app: `Yes`
   - Automatic builds: `No`

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

#### Firebase Configuration

`firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/static/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

### 5. AWS S3 + CloudFront

#### Prerequisites

- AWS account
- AWS CLI configured

#### Steps

1. **Build Application**

   ```bash
   npm run build
   ```

2. **Create S3 Bucket**

   ```bash
   aws s3 mb s3://your-bucket-name
   ```

3. **Upload Files**

   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

4. **Configure S3 for Static Hosting**

   ```bash
   aws s3 website s3://your-bucket-name \
     --index-document index.html \
     --error-document index.html
   ```

5. **Set Up CloudFront Distribution**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure custom error pages for SPA routing

## Environment Variables

### Development Environment

Create `.env.local`:

```bash
# Development settings
VITE_API_BASE_URL=https://www.swapi.tech/api
VITE_APP_TITLE=Star Wars Character Browser
```

### Production Environment

Set environment variables in your hosting platform:

```bash
VITE_API_BASE_URL=https://www.swapi.tech/api
VITE_APP_TITLE=Star Wars Character Browser
NODE_VERSION=18
```

## Build Optimization

### Production Build Settings

#### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2015",
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false, // Set to true for debugging
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          icons: ["lucide-react"],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
```

#### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "build:analyze": "npm run build && npx vite-bundle-analyzer dist/assets/*.js"
  }
}
```

## Performance Optimization

### Caching Strategy

#### HTTP Headers

```
Cache-Control: public, max-age=31536000, immutable  # Static assets
Cache-Control: public, max-age=3600                 # HTML files
Cache-Control: no-cache                             # API responses
```

#### Service Worker (Future Enhancement)

```javascript
// sw.js
const CACHE_NAME = "star-wars-app-v1";
const urlsToCache = ["/", "/static/js/bundle.js", "/static/css/main.css"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});
```

### Bundle Analysis

#### Analyze Bundle Size

```bash
# Install analyzer
npm install --save-dev vite-bundle-analyzer

# Analyze build
npm run build
npx vite-bundle-analyzer dist/assets/*.js
```

#### Optimization Techniques

- Tree shaking for unused code
- Code splitting for route-based chunks
- Dynamic imports for large components
- Image optimization and lazy loading

## Monitoring and Analytics

### Performance Monitoring

#### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci && npm run build
      - run: npx @lhci/cli@0.12.x autorun
```

#### Web Vitals Tracking

```typescript
// src/utils/analytics.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Error Tracking

#### Sentry Integration (Optional)

```bash
npm install @sentry/react @sentry/tracing
```

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

## Security Considerations

### Content Security Policy

```html
<!-- In index.html -->
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               connect-src 'self' https://www.swapi.tech;"
/>
```

### HTTPS Configuration

- Always use HTTPS in production
- Configure HSTS headers
- Use secure cookie settings

## Troubleshooting

### Common Deployment Issues

#### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 18+

# Verbose build for debugging
npm run build -- --verbose
```

#### Routing Issues (404 on Refresh)

- Ensure SPA fallback is configured
- Check server redirects to index.html
- Verify base URL configuration

#### Environment Variable Issues

```bash
# Check environment variables
echo $NODE_ENV
echo $VITE_API_BASE_URL

# Verify build includes variables
npm run build && grep -r "VITE_" dist/
```

### Performance Issues

#### Slow Loading

- Check bundle size with analyzer
- Implement code splitting
- Optimize images and assets
- Enable compression (gzip/brotli)

#### Memory Leaks

- Check for uncleaned event listeners
- Verify useEffect cleanup functions
- Monitor component re-renders

## Rollback Strategy

### Quick Rollback

```bash
# Netlify
netlify deploy --prod --dir=previous-build

# Vercel
vercel --prod --prebuilt

# Manual backup
cp -r dist/ backup-$(date +%Y%m%d)
```

### Version Management

- Tag releases in Git
- Keep previous build artifacts
- Document deployment changes
- Test rollback procedures

---

This deployment guide ensures reliable and optimized deployment across multiple platforms with proper monitoring and troubleshooting procedures.
