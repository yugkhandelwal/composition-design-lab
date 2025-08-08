# 🚀 Vercel Deployment Guide - Composition Design Lab

## Step 1: Create Vercel Account
1. Visit [vercel.com/signup](https://vercel.com/signup)
2. Sign up with **GitHub** (recommended) for easier project management
3. Verify your email address

## Step 2: Deploy Your Project

### Option A: Command Line Deployment (Current Setup)
```powershell
# In your project directory
vercel

# Follow the prompts:
# - Login to your Vercel account
# - Set up your project name: "composition-design-lab" 
# - Link to existing project: No (first deployment)
# - Want to override settings: No (use defaults)
```

### Option B: GitHub Integration (Recommended for Future Updates)
1. **Push code to GitHub** (if not already there):
   ```powershell
   git init
   git add .
   git commit -m "Professional Composition Design Lab website"
   git branch -M main
   git remote add origin https://github.com/yourusername/composition-design-lab.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub
   - Select your repository
   - Deploy with default settings

## Step 3: Configuration Settings

### Build & Output Settings (Auto-detected)
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables (Optional)
Add these in Vercel Dashboard → Project → Settings → Environment Variables:
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_SITE_URL=https://your-domain.vercel.app
```

## Step 4: Custom Domain Setup

### Free Vercel Domain
- Your site will be available at: `https://composition-design-lab.vercel.app`
- Or similar auto-generated URL

### Custom Domain (Professional)
1. **Purchase domain** from registrar (GoDaddy, Namecheap, etc.)
2. **Add domain in Vercel**:
   - Go to Project Settings → Domains
   - Add your domain: `compositiondesignlab.com`
3. **Update DNS records** at your registrar:
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.19.61`
4. **Wait for DNS propagation** (up to 48 hours)

## Step 5: Post-Deployment Checklist

### ✅ Technical Verification
- [ ] Site loads correctly at your Vercel URL
- [ ] PWA install prompt appears on mobile
- [ ] Contact form works properly
- [ ] All images display correctly
- [ ] Mobile touch interactions work
- [ ] Analytics tracking active (if configured)

### ✅ Performance Testing
- [ ] Run Lighthouse audit (should score 90+)
- [ ] Test on different devices and browsers
- [ ] Verify PWA functionality (install, offline mode)
- [ ] Check loading speed on mobile

### ✅ SEO & Marketing Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google My Business listing
- [ ] Update social media profiles with new URL
- [ ] Share with existing clients and contacts

## Automatic Deployments

Once connected to GitHub:
- **Every push to main branch** → Automatic production deployment
- **Pull requests** → Preview deployments for testing
- **Rollback capability** → Easy rollback to previous versions

## Vercel Features Included

### 🔥 Performance
- **Global CDN**: Fast loading worldwide
- **Image Optimization**: Automatic WebP conversion
- **Edge Functions**: Server-side rendering at edge locations

### 🛡️ Security
- **Automatic HTTPS**: SSL certificates included
- **DDoS Protection**: Enterprise-level protection
- **Security Headers**: Automatic security headers

### 📊 Analytics
- **Web Analytics**: Built-in visitor tracking
- **Real User Monitoring**: Performance insights
- **Core Web Vitals**: Performance metrics

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify TypeScript compilation: `npm run build` locally
- Check build logs in Vercel dashboard

### PWA Not Working
- Ensure HTTPS is active (automatic on Vercel)
- Check service worker in browser dev tools
- Verify manifest.webmanifest is served correctly

### Custom Domain Issues
- Verify DNS records are correct
- Wait up to 48 hours for DNS propagation
- Use DNS checker tools to verify changes

## Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Integration**: [vercel.com/docs/git](https://vercel.com/docs/git)
- **Custom Domains**: [vercel.com/docs/custom-domains](https://vercel.com/docs/custom-domains)

---

**Ready to launch your professional architecture website! 🎉**

After deployment, your Composition Design Lab website will be live with:
- Professional domain and HTTPS
- Mobile-optimized PWA experience
- Global CDN for fast loading
- Automatic deployments from GitHub
