import 'package:get/get.dart';

class SearchController extends GetxController {
  final query = ''.obs;
  final results = <dynamic>[].obs;
  final isLoading = false.obs;
  final error = ''.obs;
  final cityId = 'sabzevar'.obs;

  void search(String q) {
    query.value = q;
    if (q.isEmpty) {
      results.clear();
      return;
    }
    performSearch();
  }

  Future<void> performSearch() async {
    try {
      isLoading.value = true;
      error.value = '';
      // Implement API call
    } catch (e) {
      error.value = e.toString();
    } finally {
      isLoading.value = false;
    }
  }
}
