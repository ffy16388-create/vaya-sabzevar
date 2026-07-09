import 'package:hive/hive.dart';

class StorageService {
  static const String _favoritesBox = 'favorites';
  static const String _userBox = 'user';

  static Future<void> init() async {
    await Hive.openBox(_favoritesBox);
    await Hive.openBox(_userBox);
  }

  // Favorites
  static Future<void> addFavorite(String businessId) async {
    final box = Hive.box(_favoritesBox);
    await box.put(businessId, true);
  }

  static Future<void> removeFavorite(String businessId) async {
    final box = Hive.box(_favoritesBox);
    await box.delete(businessId);
  }

  static bool isFavorite(String businessId) {
    final box = Hive.box(_favoritesBox);
    return box.containsKey(businessId);
  }

  static List<String> getFavorites() {
    final box = Hive.box(_favoritesBox);
    return box.keys.cast<String>().toList();
  }

  // User Token
  static Future<void> setToken(String token) async {
    final box = Hive.box(_userBox);
    await box.put('token', token);
  }

  static String? getToken() {
    final box = Hive.box(_userBox);
    return box.get('token') as String?;
  }

  static Future<void> clearToken() async {
    final box = Hive.box(_userBox);
    await box.delete('token');
  }
}
