# Quick Setup Script for Website CMS

Write-Host "🚀 Setting up Website CMS..." -ForegroundColor Cyan

# Check if .env.local exists
if (!(Test-Path ".env.local")) {
    Write-Host "📝 Creating .env.local file..." -ForegroundColor Yellow
    Copy-Item ".env.local.example" ".env.local"
    Write-Host "⚠️  IMPORTANT: Edit .env.local with your MongoDB connection string!" -ForegroundColor Red
    Write-Host ""
    Write-Host "You need to:" -ForegroundColor Yellow
    Write-Host "1. Get MongoDB connection string from https://cloud.mongodb.com (free)" -ForegroundColor White
    Write-Host "2. Update MONGODB_URI in .env.local" -ForegroundColor White
    Write-Host "3. Generate a secure NEXTAUTH_SECRET" -ForegroundColor White
    Write-Host ""
    $continue = Read-Host "Press Enter when you've updated .env.local (or Ctrl+C to exit)"
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencies installed!" -ForegroundColor Green

# Seed database
Write-Host "🌱 Seeding database..." -ForegroundColor Cyan
npm run seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to seed database. Check your MongoDB connection!" -ForegroundColor Red
    Write-Host "Make sure MONGODB_URI in .env.local is correct" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Database seeded successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server, run:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then visit:" -ForegroundColor Cyan
Write-Host "  Public site: http://localhost:3000" -ForegroundColor White
Write-Host "  Admin panel: http://localhost:3000/admin/login" -ForegroundColor White
Write-Host ""
Write-Host "Default admin credentials:" -ForegroundColor Yellow
Write-Host "  Email: admin@example.com" -ForegroundColor White
Write-Host "  Password: admin123" -ForegroundColor White
Write-Host ""
