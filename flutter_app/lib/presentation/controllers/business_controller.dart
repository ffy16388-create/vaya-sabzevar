import 'package:get/get.dart';

class BusinessController extends GetxController {
  final businessId = ''.obs;
  final business = Rxn();
  final reviews = <dynamic>[].obs;
  final images = <String>[].obs;
  final isLoading = false.obs;
  final error = '';

  Future<void> loadBusiness(String id) async {
    try {
      isLoading.value = true;
      businessId.value = id;
      // Implement API call to fetch business details
    } catch (e) {
      error.toString(); // Use error
    } finally {
      isLoading.value = false;
    }
  }
}
