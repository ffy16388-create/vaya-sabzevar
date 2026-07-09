import 'package:get/get.dart';

class FavoriteController extends GetxController {
  final favorites = <dynamic>[].obs;
  final isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    loadFavorites();
  }

  Future<void> loadFavorites() async {
    try {
      isLoading.value = true;
      // Implement API call
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> addFavorite(String businessId) async {
    // Implement API call
  }

  Future<void> removeFavorite(String businessId) async {
    // Implement API call
  }
}
