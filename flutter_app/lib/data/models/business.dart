class Business {
  final String id;
  final String name;
  final String? description;
  final String categoryId;
  final String categoryName;
  final String? districtId;
  final String? districtName;
  final String? phone;
  final String? whatsapp;
  final String? instagram;
  final String? address;
  final double? latitude;
  final double? longitude;
  final String? openingTime;
  final String? closingTime;
  final double rating;
  final int reviewCount;
  final int viewsCount;
  final bool isFeatured;
  final String? primaryImageUrl;
  final List<String> imageUrls;

  Business({
    required this.id,
    required this.name,
    this.description,
    required this.categoryId,
    required this.categoryName,
    this.districtId,
    this.districtName,
    this.phone,
    this.whatsapp,
    this.instagram,
    this.address,
    this.latitude,
    this.longitude,
    this.openingTime,
    this.closingTime,
    required this.rating,
    required this.reviewCount,
    required this.viewsCount,
    required this.isFeatured,
    this.primaryImageUrl,
    this.imageUrls = const [],
  });

  factory Business.fromJson(Map<String, dynamic> json) {
    return Business(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String?,
      categoryId: json['category_id'] as String,
      categoryName: json['category_name'] as String? ?? '',
      districtId: json['district_id'] as String?,
      districtName: json['district_name'] as String?,
      phone: json['phone'] as String?,
      whatsapp: json['whatsapp'] as String?,
      instagram: json['instagram'] as String?,
      address: json['address'] as String?,
      latitude: (json['latitude'] as num?)?.toDouble(),
      longitude: (json['longitude'] as num?)?.toDouble(),
      openingTime: json['opening_time'] as String?,
      closingTime: json['closing_time'] as String?,
      rating: ((json['rating'] as num?)?.toDouble()) ?? 0.0,
      reviewCount: (json['review_count'] as num?)?.toInt() ?? 0,
      viewsCount: (json['views_count'] as num?)?.toInt() ?? 0,
      isFeatured: json['is_featured'] as bool? ?? false,
      primaryImageUrl: json['primary_image_url'] as String?,
      imageUrls: (json['image_urls'] as List?)?.cast<String>() ?? [],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'description': description,
    'category_id': categoryId,
    'category_name': categoryName,
    'district_id': districtId,
    'district_name': districtName,
    'phone': phone,
    'whatsapp': whatsapp,
    'instagram': instagram,
    'address': address,
    'latitude': latitude,
    'longitude': longitude,
    'opening_time': openingTime,
    'closing_time': closingTime,
    'rating': rating,
    'review_count': reviewCount,
    'views_count': viewsCount,
    'is_featured': isFeatured,
    'primary_image_url': primaryImageUrl,
    'image_urls': imageUrls,
  };
}
