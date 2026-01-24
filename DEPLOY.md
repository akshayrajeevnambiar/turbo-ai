# Turbo AI Deployment Guide

This guide covers deploying the Turbo AI website to various hosting providers and configuring your domain with GoDaddy DNS.

## Quick Start

### Build Requirements

- **Node.js**: 18 or higher
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Install Command**: `npm ci`

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Analytics (optional)
VITE_ENABLE_ANALYTICS=false
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Features
VITE_ENABLE_PWA=true
```

## Hosting Providers

### 1. Vercel (Recommended)

**Why Vercel?**

- Automatic deployments from GitHub
- Built-in CDN and edge caching
- Excellent performance optimization
- Free SSL certificates

**Setup Steps:**

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**:

   ```bash
   vercel login
   vercel --prod
   ```

3. **Or use GitHub Integration**:

   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm ci`

4. **Environment Variables** (in Vercel dashboard):
   - `VITE_ENABLE_ANALYTICS`: `true` (if using analytics)
   - `VITE_GA_MEASUREMENT_ID`: Your GA4 measurement ID

**GitHub Secrets for CI/CD**:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

**Custom Domain**: Add `turbo-ai.ca` in Vercel dashboard → Project → Settings → Domains

---

### 2. Netlify

**Setup Steps:**

1. **Manual Deploy**:

   ```bash
   npm run build
   npx netlify-cli deploy --prod --dir=dist
   ```

2. **Or use GitHub Integration**:

   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Build settings:
     - Build Command: `npm run build`
     - Publish Directory: `dist`

3. **Configuration Files** (already included):
   - `netlify.toml` - Build and header settings
   - `public/_headers` - Security headers
   - `public/_redirects` - SPA routing

**GitHub Secrets for CI/CD**:

```
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

**Custom Domain**: Netlify dashboard → Site → Domain settings → Add custom domain

---

### 3. Cloudflare Pages

**Setup Steps:**

1. **Connect GitHub**:

   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pages → Create a project → Connect to Git
   - Select your repository

2. **Build Settings**:

   - Build Command: `npm run build`
   - Build Output Directory: `dist`
   - Root Directory: `/`

3. **Configuration Files** (already included):
   - `public/_headers` - Security and caching headers
   - `public/_redirects` - SPA routing

**GitHub Secrets for CI/CD**:

```
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_PROJECT_NAME=your_project_name
```

---

## GoDaddy DNS Configuration

### For Vercel

1. **Login to GoDaddy DNS Management**:

   - Go to [dcc.godaddy.com](https://dcc.godaddy.com)
   - Select your domain → DNS → Manage Zones

2. **Add/Update DNS Records**:

   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 600 (10 minutes)

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 600
   ```

3. **Remove Parked Domain Records**:

   - Delete any existing A records pointing to GoDaddy parking
   - Remove any CNAME records for @ or www pointing to GoDaddy

4. **SSL Certificate**:
   - Vercel automatically provisions SSL certificates
   - May take 24-48 hours to fully propagate

### For Netlify

1. **DNS Records**:

   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   TTL: 600

   Type: A
   Name: @
   Value: 99.83.190.102
   TTL: 600

   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   TTL: 600
   ```

### For Cloudflare Pages

1. **If using Cloudflare DNS**:

   ```
   Type: CNAME
   Name: @
   Value: your-project.pages.dev
   TTL: Auto

   Type: CNAME
   Name: www
   Value: your-project.pages.dev
   TTL: Auto
   ```

2. **If using GoDaddy DNS**:
   - Get the IP addresses from Cloudflare dashboard
   - Add A records pointing to those IPs

---

## Domain Redirect Setup

### Apex to WWW (or vice versa)

**In Vercel**:

- Add both `turbo-ai.co.uk` and `www.turbo-ai.co.uk`
- Set one as primary (redirects automatically)

**In Netlify**:

- Site settings → Domain management → Domain aliases
- Add redirect rule in `public/_redirects`:
  ```
  https://www.turbo-ai.co.uk/* https://turbo-ai.co.uk/:splat 301!
  ```

**In Cloudflare**:

- Use Page Rules or Redirect Rules in Cloudflare dashboard

---

## Verification Steps

### 1. DNS Propagation Check

```bash
# Check if DNS has propagated
nslookup turbo-ai.co.uk
dig turbo-ai.co.uk

# Online tools
# whatsmydns.net
# dnschecker.org
```

### 2. Performance Testing

- [GTmetrix](https://gtmetrix.com)
- [PageSpeed Insights](https://pagespeed.web.dev)
- [WebPageTest](https://webpagetest.org)

### 3. Security Headers Check

- [Security Headers](https://securityheaders.com)
- [SSL Labs](https://ssllabs.com/ssltest)

### 4. SEO Validation

- [Google Search Console](https://search.google.com/search-console)
- Test robots.txt: `https://turbo-ai.co.uk/robots.txt`
- Test sitemap: `https://turbo-ai.co.uk/sitemap.xml`

---

## Troubleshooting

### Common Issues

**DNS Not Propagating**:

- Wait 24-48 hours for full propagation
- Clear browser DNS cache: `chrome://net-internals/#dns`
- Try different DNS servers (8.8.8.8, 1.1.1.1)

**SSL Certificate Issues**:

- Ensure DNS is pointing correctly first
- Check for mixed content (HTTP resources on HTTPS pages)
- Verify CAA records don't block certificate generation

**Build Failures**:

- Check Node.js version (18+)
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm ci`

**404 on Refresh**:

- Verify SPA redirect rules are in place
- Check hosting provider's SPA documentation

### Getting Help

1. **Check build logs** in your hosting provider's dashboard
2. **Test locally**: `npm run build && npm run preview`
3. **Compare configurations** with working examples
4. **Contact support** for your hosting provider

---

## CI/CD Setup

### GitHub Secrets Required

**For Vercel**:

- `VERCEL_TOKEN`: Personal access token from Vercel
- `VERCEL_ORG_ID`: Team/organization ID
- `VERCEL_PROJECT_ID`: Project ID from dashboard

**For Netlify**:

- `NETLIFY_AUTH_TOKEN`: Personal access token
- `NETLIFY_SITE_ID`: Site ID from dashboard

**For Cloudflare Pages**:

- `CLOUDFLARE_API_TOKEN`: API token with Pages:Edit permissions
- `CLOUDFLARE_ACCOUNT_ID`: Account ID from dashboard
- `CLOUDFLARE_PROJECT_NAME`: Project name

### Enabling CI/CD

1. Uncomment the relevant deployment job in `.github/workflows/ci.yml`
2. Add the required secrets to your GitHub repository
3. Push to the main branch to trigger deployment

---

## Performance Optimizations

✅ **Already Configured**:

- Asset hashing and long-term caching
- Code splitting for optimal bundle sizes
- Font preloading and display optimization
- Service Worker for offline functionality
- Minified CSS and JavaScript
- Responsive images and lazy loading
- Critical CSS inlining

**Additional Recommendations**:

- Monitor Core Web Vitals with analytics
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Consider implementing a CDN for global users
- Use image optimization services for large assets

---

## Support

For additional help:

- Check hosting provider documentation
- GitHub Issues for this repository
- Contact the development team

**Happy deploying! 🚀**
