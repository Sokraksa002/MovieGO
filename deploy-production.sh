#!/bin/bash

echo "🚀 Starting Production Deployment..."

# 1. Update environment to production
echo "📝 Setting environment to production..."
sed -i 's/APP_ENV=local/APP_ENV=production/' .env
sed -i 's/APP_DEBUG=true/APP_DEBUG=false/' .env

# 2. Install dependencies
echo "📦 Installing dependencies..."
composer install --no-dev --optimize-autoloader

# 3. Clear and cache config
echo "🧹 Clearing and caching configuration..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

# 4. Generate optimized files
echo "⚡ Generating optimized files..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 5. Build frontend assets
echo "🎨 Building frontend assets..."
npm run build

# 6. Set proper permissions
echo "🔐 Setting permissions..."
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# 7. Test streaming endpoint
echo "🧪 Testing streaming endpoint..."
php artisan route:list | grep streaming

echo "✅ Deployment complete!"
echo "🎬 Test streaming at: https://yourdomain.com/api/streaming/movie/803796"
