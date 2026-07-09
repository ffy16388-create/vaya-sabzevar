class Category {
  final String id;
  final String name;
  final String? nameEn;
  final String slug;
  final String? iconUrl;
  final int businessCount;

  Category({
    required this.id,
    required this.name,
    this.nameEn,
    required this.slug,
    this.iconUrl,
    this.businessCount = 0,
  });

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: json['id'] as String,
      name: json['name_fa'] as String,
      nameEn: json['name_en'] as String?,
      slug: json['slug'] as String,
      iconUrl: json['icon_url'] as String?,
      businessCount: (json['business_count'] as num?)?.toInt() ?? 0,
    );
  }
}
