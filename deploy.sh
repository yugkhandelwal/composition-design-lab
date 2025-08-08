#!/bin/bash

# Composition Design Lab - Deployment Script
# This script prepares and deploys the project to production

echo "🚀 Starting deployment process for Composition Design Lab..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Please run this script from the project root."
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run tests if they exist
if [ -f "src/__tests__" ] || [ -f "tests" ]; then
  echo "🧪 Running tests..."
  npm test
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Please fix the errors and try again."
  exit 1
fi

echo "✅ Build completed successfully!"

# Check build size
echo "📊 Checking build size..."
du -sh dist/
ls -la dist/

# Validate PWA
echo "🔍 Validating PWA configuration..."
if [ -f "dist/manifest.webmanifest" ]; then
  echo "✅ PWA manifest found"
else
  echo "⚠️  PWA manifest not found"
fi

if [ -f "dist/sw.js" ]; then
  echo "✅ Service worker found"
else
  echo "⚠️  Service worker not found"
fi

echo "🎉 Project is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. For Vercel: Run 'vercel deploy --prod'"
echo "2. For Netlify: Run 'netlify deploy --prod --dir=dist'"
echo "3. For manual deployment: Upload the 'dist' folder to your web server"
echo ""
echo "🌐 Don't forget to:"
echo "- Set up your custom domain"
echo "- Configure environment variables"
echo "- Set up Google Analytics"
echo "- Test the PWA functionality"
echo "- Submit sitemap to Google Search Console"
