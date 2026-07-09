# انتخاب استک فنی

## 1. Frontend: Flutter

### دلایل انتخاب:
- ✓ یک کد برای iOS + Android
- ✓ APK سبک‌تر و سریع‌تر
- ✓ UI فارسی و RTL پشتیبانی عالی
- ✓ Performance بهتر برای لیست‌های طویل
- ✓ Hot reload برای توسعه سریع
- ✓ Material Design + Cupertino support

### Dependencies:
```yaml
flutter: ">=3.0.0"
get: ^4.6.0              # State Management
http: ^1.1.0             # API Calls
hive: ^2.2.0             # Local Storage
share_plus: ^6.0.0       # Share
geolocator: ^9.0.0       # Location
url_launcher: ^6.1.0     # Open URLs
cached_network_image: ^3.2.0
flutter_rating_bar: ^4.0.0
intl: ^0.18.0            # i18n
```

---

## 2. Backend: Node.js + Express

### دلایل انتخاب:
- ✓ JavaScript سمت دو طرف
- ✓ npm ecosystem غنی
- ✓ JSON Native Support
- ✓ Real-time capabilities
- ✓ Easy deployment
- ✓ Scalable horizontally

### Dependencies:
```json
{
  "express": "^4.18.0",
  "pg": "^8.10.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.0",
  "multer": "^1.4.0",
  "sharp": "^0.32.0",
  "dotenv": "^16.0.0",
  "cors": "^2.8.0",
  "helmet": "^7.0.0",
  "joi": "^17.9.0",
  "winston": "^3.8.0"
}
```

---

## 3. Database: PostgreSQL

### دلایل انتخاب:
- ✓ JSONB support برای داده‌های نیمه‌ساخت‌یافته
- ✓ Full-Text Search برای جستجو
- ✓ Scalable و reliable
- ✓ GIS support برای نقشه
- ✓ ACID compliance
- ✓ هزینه پایین

### Extensions:
- `uuid-ossp` برای ID تولید
- `pg_trgm` برای جستجوی fuzzy

---

## 4. Cache: Redis

### استفاده:
- جستجوی Cached
- Session Management
- Rate Limiting
- Job Queue

---

## 5. Admin Panel: React

### دلایل انتخاب:
- ✓ Rich Ecosystem
- ✓ UI Libraries (Material-UI, Ant Design)
- ✓ Admin Templates موجود
- ✓ Real-time updates

### Dependencies:
```json
{
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "axios": "^1.4.0",
  "@mui/material": "^5.0.0",
  "@mui/icons-material": "^5.0.0",
  "zustand": "^4.0.0",
  "react-hook-form": "^7.0.0",
  "react-quill": "^2.0.0",
  "recharts": "^2.7.0"
}
```

---

## 6. Infrastructure

### Development
- Docker Compose برای Local Development
- PostgreSQL 15
- Redis 7
- Node.js 18+
- Flutter 3.10+

### Production
- Docker Containers
- nginx Reverse Proxy
- GitHub Actions CI/CD
- AWS EC2 / Linode
- PostgreSQL RDS یا نگهداری‌شده
- Redis Managed
- S3/Wasabi برای تصاویر

---

## 7. مشخصات Build APK

```bash
flutter build apk --release --split-per-abi
# Output: app-arm64-v8a-release.apk
# Size: ~35-45MB
```
