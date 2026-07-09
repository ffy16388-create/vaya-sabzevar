# API Design Specification

## Base URL
```
https://api.vaya.ir/api/v1
```

## Authentication
```
Header: Authorization: Bearer <JWT_TOKEN>
Expiry: 24 hours
Refresh Token: 30 days
```

---

## Public Endpoints

### Search
```http
GET /search?q=string&city_id=uuid&limit=20&offset=0
GET /search/advanced?city_id&category_id&district_id&min_rating&max_rating
```

### Businesses
```http
GET /businesses
GET /businesses/{id}
GET /businesses/{id}/reviews
GET /businesses/{id}/images
GET /businesses?city_id&category_id&district_id&sort=rating&order=desc
```

### Categories
```http
GET /categories?city_id=uuid
GET /categories/{id}
```

### Districts
```http
GET /districts?city_id=uuid
GET /districts/{id}
```

### Reviews
```http
GET /reviews?business_id=uuid&limit=10
POST /reviews
```

---

## Admin Endpoints

### Authentication
```http
POST /admin/auth/login
GET /admin/auth/me
POST /admin/auth/logout
POST /admin/auth/refresh
```

### Businesses Management
```http
POST /admin/businesses
GET /admin/businesses
GET /admin/businesses/{id}
PUT /admin/businesses/{id}
DELETE /admin/businesses/{id}
PATCH /admin/businesses/{id}/feature
PATCH /admin/businesses/{id}/activate
```

### Images Management
```http
POST /admin/businesses/{id}/images
GET /admin/businesses/{id}/images
DELETE /admin/images/{image_id}
PATCH /admin/images/{image_id}/primary
```

### Categories Management
```http
POST /admin/categories
GET /admin/categories
PUT /admin/categories/{id}
DELETE /admin/categories/{id}
```

### Districts Management
```http
POST /admin/districts
GET /admin/districts
PUT /admin/districts/{id}
DELETE /admin/districts/{id}
```

### Admin Logs
```http
GET /admin/logs?limit=50&offset=0
GET /admin/logs/{id}
```

### Dashboard
```http
GET /admin/dashboard/stats
```

---

## Rate Limiting
- Public endpoints: 100 req/min per IP
- Search: 50 req/min per IP
- Admin endpoints: 1000 req/min per user
- File upload: 10 req/min per user
