# Folder Structure

## Backend Project Structure

```
backend/
├── config/
│   ├── database.js
│   ├── redis.js
│   ├── secrets.js
│   └── multer.js
├── src/
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── rateLimit.js
│   │   └── validation.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── businessController.js
│   │   ├── searchController.js
│   │   └── adminController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── businesses.js
│   │   ├── search.js
│   │   ├── admin/
│   │   │   ├── businesses.js
│   │   │   ├── categories.js
│   │   │   └── logs.js
│   │   └── index.js
│   ├── services/
│   │   ├── businessService.js
│   │   ├── searchService.js
│   │   └── authService.js
│   ├── models/
│   │   ├── business.js
│   │   ├── user.js
│   │   └── category.js
│   ├── migrations/
│   │   ├── 001_init.sql
│   │   └── 002_add_indexes.sql
│   └── app.js
├── .env.example
├── package.json
└── server.js
```

## Flutter Project Structure

```
flutter_app/
├── lib/
│   ├── main.dart
│   ├── config/
│   │   ├── app_colors.dart
│   │   ├── app_routes.dart
│   │   └── app_theme.dart
│   ├── data/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── services/
│   ├── presentation/
│   │   ├── controllers/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── search/
│   │   │   ├── business_detail/
│   │   │   └── favorites/
│   │   └── widgets/
│   └── utils/
├── assets/
│   ├── images/
│   └── i18n/
├── pubspec.yaml
└── build_apk.sh
```

## Admin Panel Project Structure

```
admin-panel/
├── src/
│   ├── main.jsx
│   ├── config/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Businesses/
│   │   └── Categories/
│   ├── components/
│   ├── services/
│   ├── store/
│   └── utils/
├── public/
├── package.json
└── vite.config.js
```
