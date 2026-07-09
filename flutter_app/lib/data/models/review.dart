class Review {
  final String id;
  final String businessId;
  final String? userId;
  final int rating;
  final String? title;
  final String? content;
  final DateTime createdAt;

  Review({
    required this.id,
    required this.businessId,
    this.userId,
    required this.rating,
    this.title,
    this.content,
    required this.createdAt,
  });

  factory Review.fromJson(Map<String, dynamic> json) {
    return Review(
      id: json['id'] as String,
      businessId: json['business_id'] as String,
      userId: json['user_id'] as String?,
      rating: (json['rating'] as num).toInt(),
      title: json['title'] as String?,
      content: json['content'] as String?,
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }
}
