# VAYA - سبزوار سروسز دایرکتوری

## نمای کلی

وایا پلتفرمی هوشمند برای پیدا کردن خدمات و کسب‌وکارهای سبزوار است. این اپلیکیشن کاربران را قادر می‌کند تا به راحتی خدمات مورد نیاز خود را جستجو، فیلتر و مقایسه کنند.

## ویژگی‌ها

✅ **جستجوی قدرتمند**: جستجوی فول‌تکست در کل محتوا
✅ **فیلترینگ پیشرفته**: بر اساس دسته‌بندی، منطقه، امتیاز و غیره
✅ **نقشه تعاملی**: مکان کسب‌وکارها روی نقشه
✅ **نظرات و امتیاز‌ات**: مجتمع نظرات کاربران
✅ **علاقه‌مندی‌ها**: ذخیره آگهی‌های مورد علاقه
✅ **UI فارسی و RTL**: طراحی کاملاً متناسب با فارسی
✅ **مدیریت آسان**: پنل مدیریت حرفه‌ای برای مدیران
✅ **قابل توسعه**: معماری آماده برای شهرهای دیگر

## Stack فنی

- **Frontend**: Flutter (iOS/Android)
- **Admin Panel**: React + Zustand
- **Backend**: Node.js + Express
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **File Storage**: S3/Wasabi

## نحوه نصب و اجرا

### Prerequisites
- Docker و Docker Compose
- Git
- Node.js 18+
- Flutter 3.10+

### Development Setup

```bash
# Clone repository
git clone https://github.com/ffy16388-create/vaya-sabzevar.git
cd vaya-sabzevar

# Start services
docker-compose up -d

# Setup database
cd backend
npm install
npm run migrate
npm run seed
npm run dev

# Start admin panel
cd ../admin-panel
npm install
npm run dev

# Build Flutter
cd ../flutter_app
flutter pub get
flutter run
```

## ساخت APK

```bash
cd flutter_app
flutter build apk --release --split-per-abi
```

APK‌های تولید‌شده در `build/app/outputs/apk/release/` قرار دارند.

## ساختار Folder

- `backend/` - Node.js API Server
- `admin-panel/` - React Admin Dashboard
- `flutter_app/` - Flutter Mobile App
- `docs/` - Documentation
- `docker-compose.yml` - Development environment

## API Documentation

برای API Documentation کامل، به `docs/04_api_design.md` مراجعه کنید.

## لاگ‌ها

لاگ‌های سیستم در فایل‌های زیر ذخیره می‌شوند:
- Backend Logs: `backend/logs/`
- Admin Activity: Database `admin_logs` table
- Audit Trail: Database `audit_log` table

## Development Guidelines

### Commits
استفاده از Conventional Commits:
```
feat: Add search functionality
fix: Fix image upload bug
docs: Update API documentation
```

### Branches
```
main - Production
develop - Development
feature/* - New features
bugfix/* - Bug fixes
```

## License

MIT
