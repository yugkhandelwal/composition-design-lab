# Composition Design Lab - Deployment Script (PowerShell)
# This script prepares and deploys the project to production

Write-Host "🚀 Starting deployment process for Composition Design Lab..." -ForegroundColor Green

# Check if we're in the right directory
if (-Not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Run tests if they exist
if ((Test-Path "src/__tests__") -or (Test-Path "tests")) {
    Write-Host "🧪 Running tests..." -ForegroundColor Yellow
    npm test
}

# Build the project
Write-Host "🔨 Building the project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Please fix the errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Check build size
Write-Host "📊 Checking build size..." -ForegroundColor Yellow
$size = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum
Write-Host "Build size: $([math]::Round($size/1MB, 2)) MB"
Get-ChildItem -Path "dist" -Name

# Validate PWA
Write-Host "🔍 Validating PWA configuration..." -ForegroundColor Yellow
if (Test-Path "dist/manifest.webmanifest") {
    Write-Host "✅ PWA manifest found" -ForegroundColor Green
} else {
    Write-Host "⚠️  PWA manifest not found" -ForegroundColor Yellow
}

if (Test-Path "dist/sw.js") {
    Write-Host "✅ Service worker found" -ForegroundColor Green
} else {
    Write-Host "⚠️  Service worker not found" -ForegroundColor Yellow
}

Write-Host "🎉 Project is ready for deployment!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. For Vercel: Run 'vercel deploy --prod'"
Write-Host "2. For Netlify: Run 'netlify deploy --prod --dir=dist'"
Write-Host "3. For manual deployment: Upload the 'dist' folder to your web server"
Write-Host ""
Write-Host "🌐 Don't forget to:" -ForegroundColor Cyan
Write-Host "- Set up your custom domain"
Write-Host "- Configure environment variables"
Write-Host "- Set up Google Analytics"
Write-Host "- Test the PWA functionality"
Write-Host "- Submit sitemap to Google Search Console"
