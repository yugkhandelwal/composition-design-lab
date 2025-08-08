# 🚀 GitHub + Vercel Deployment Guide

## Step 1: Create GitHub Repository

1. **Visit the opened GitHub tab** or go to [github.com/new](https://github.com/new)
2. **Fill in repository details**:
   - **Repository name**: `composition-design-lab`
   - **Description**: `Professional architecture & design studio website with PWA features`
   - **Visibility**: Public (recommended for easy deployment)
   - **Initialize**: Leave all checkboxes UNCHECKED (we already have code)
3. **Click "Create repository"**

## Step 2: Push Code to GitHub

After creating the repository, GitHub will show you commands. Use these:

```powershell
# Add GitHub as remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/composition-design-lab.git

# Rename branch to main (modern standard)
git branch -M main

# Push code to GitHub
git push -u origin main
```

## Step 3: Connect Vercel to GitHub

### Option A: Via Vercel Dashboard (Recommended)
1. **Go to [vercel.com/dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import from GitHub**:
   - If not connected, authorize Vercel to access GitHub
   - Select your `composition-design-lab` repository
4. **Configure project**:
   - **Project name**: `composition-design-lab`
   - **Framework**: Vite (auto-detected)
   - **Build command**: `npm run build` (auto-detected)
   - **Output directory**: `dist` (auto-detected)
5. **Click "Deploy"**

### Option B: Via Command Line
```powershell
# Link to existing Vercel project (if you created one earlier)
vercel --prod

# Or create new project
vercel
```

## Step 4: Configure Environment Variables (Optional)

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_SITE_URL=https://composition-design-lab.vercel.app
VITE_CONTACT_EMAIL=contact@compositiondesignlab.com
```

## Step 5: Custom Domain Setup

### Get Your Free Vercel Domain
- Your site will be live at: `https://composition-design-lab.vercel.app`
- Or similar auto-generated URL

### Add Custom Domain (Professional)
1. **In Vercel Dashboard** → Project → Settings → Domains
2. **Add domain**: `compositiondesignlab.com`
3. **Follow DNS configuration** instructions
4. **Wait for verification** (usually 5-10 minutes)

## Benefits of GitHub + Vercel Integration

### 🔄 **Automatic Deployments**
- **Every push to main** → Automatic production deployment
- **Pull requests** → Preview deployments for testing
- **Branch deployments** → Test features before going live

### 📊 **Version Control**
- **Full project history** → See all changes over time
- **Easy rollbacks** → Restore previous versions instantly
- **Collaboration ready** → Multiple developers can contribute

### 🛡️ **Professional Features**
- **Automatic HTTPS** → SSL certificates included
- **Global CDN** → Fast loading worldwide
- **Performance monitoring** → Built-in analytics
- **Security headers** → Automatic protection

## Your Deployment URLs

After successful deployment:
- **Production**: `https://composition-design-lab.vercel.app`
- **GitHub Repository**: `https://github.com/YOUR_USERNAME/composition-design-lab`
- **Vercel Dashboard**: `https://vercel.com/dashboard`

## Future Updates

To update your website:
```powershell
# Make changes to your code
# Commit changes
git add .
git commit -m "Update portfolio with new project"

# Push to GitHub
git push

# Vercel automatically deploys! 🎉
```

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure `npm run build` works locally
- Verify all dependencies are in package.json

### GitHub Connection Issues
- Ensure repository is public or Vercel has access
- Check that you pushed code to the main branch
- Verify GitHub repository URL is correct

### Domain Not Working
- Check DNS records are correct
- Wait up to 48 hours for DNS propagation
- Verify domain ownership in Vercel dashboard

---

## 🎉 Ready to Go Live!

Once you complete these steps:
1. ✅ **Professional website** live on the internet
2. ✅ **Automatic deployments** from GitHub
3. ✅ **HTTPS security** included
4. ✅ **Global CDN** for fast loading
5. ✅ **PWA features** for mobile app experience
6. ✅ **SEO optimized** for better search rankings

Your Composition Design Lab website will be a professional, modern presence that helps grow your architectural practice!
