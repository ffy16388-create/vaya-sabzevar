-- Insert city (Sabzevar)
INSERT INTO cities (name_fa, name_en, slug, latitude, longitude) VALUES
('سبزوار', 'Sabzevar', 'sabzevar', 35.7839, 51.5832)
ON CONFLICT DO NOTHING;

-- Insert categories
INSERT INTO categories (city_id, name_fa, name_en, slug, order_index) VALUES
((SELECT id FROM cities WHERE slug = 'sabzevar'), 'تعمیر و نگهداری', 'Repair & Maintenance', 'repair', 1),
((SELECT id FROM cities WHERE slug = 'sabzevar'), 'نصب و راه‌اندازی', 'Installation', 'installation', 2),
((SELECT id FROM cities WHERE slug = 'sabzevar'), 'آموزش و مشاوره', 'Training & Consulting', 'training', 3),
((SELECT id FROM cities WHERE slug = 'sabzevar'), 'توسعه نرم‌افزار', 'Software Development', 'software', 4),
((SELECT id FROM cities WHERE slug = 'sabzevar'), 'خدمات شبکه و سرور', 'Network & Server', 'network', 5)
ON CONFLICT DO NOTHING;

-- Insert districts
INSERT INTO districts (city_id, name_fa, name_en, slug) VALUES
((SELECT id FROM cities WHERE slug = 'sabzevar'), 'مرکز شهر', 'Downtown', 'downtown'),
((SELECT id FROM cities WHERE slug = 'sabzevar'), 'بخش شمالی', 'North', 'north'),
((SELECT id FROM cities WHERE slug = 'sabzevar'), 'بخش جنوبی', 'South', 'south'),
((SELECT id FROM cities WHERE slug = 'sabzevar'), 'بخش شرقی', 'East', 'east'),
((SELECT id FROM cities WHERE slug = 'sabzevar'), 'بخش غربی', 'West', 'west'),
((SELECT id FROM cities WHERE slug = 'sabzevar'), 'حومه', 'Suburbs', 'suburbs')
ON CONFLICT DO NOTHING;

-- Insert admin user
INSERT INTO users (email, password_hash, role) VALUES
('admin@vaya.ir', '$2a$10$GCu.OZ4iXJ7.z6p4CnhzPOJYG0n8x3z0Bz6Q5K8Y9Q8Y9Q8Y9Q8Y9Q', 'admin')
ON CONFLICT DO NOTHING;
