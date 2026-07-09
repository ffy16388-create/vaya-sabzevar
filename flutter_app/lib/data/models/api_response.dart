class ApiResponse<T> {
  final bool success;
  final T? data;
  final String? error;
  final String? message;

  ApiResponse({
    required this.success,
    this.data,
    this.error,
    this.message,
  });

  factory ApiResponse.fromJson(Map<String, dynamic> json, T Function(dynamic)? fromJsonT) {
    return ApiResponse(
      success: json['success'] as bool,
      data: fromJsonT != null && json['data'] != null ? fromJsonT(json['data']) : null,
      error: json['error'] as String?,
      message: json['message'] as String?,
    );
  }
}
