import 'package:get/get.dart';

class AppRoutes {
  static const String home = '/';
  static const String search = '/search';
  static const String businessDetail = '/business/:id';
  static const String favorites = '/favorites';
  static const String categories = '/categories';
  static const String districts = '/districts';
  static const String about = '/about';
  static const String contact = '/contact';

  static final pages = [
    GetPage(
      name: home,
      page: () => const Placeholder(),
    ),
    GetPage(
      name: search,
      page: () => const Placeholder(),
    ),
    GetPage(
      name: businessDetail,
      page: () => const Placeholder(),
    ),
    GetPage(
      name: favorites,
      page: () => const Placeholder(),
    ),
    GetPage(
      name: categories,
      page: () => const Placeholder(),
    ),
    GetPage(
      name: districts,
      page: () => const Placeholder(),
    ),
    GetPage(
      name: about,
      page: () => const Placeholder(),
    ),
    GetPage(
      name: contact,
      page: () => const Placeholder(),
    ),
  ];
}
