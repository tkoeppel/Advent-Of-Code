class StringUtils {
  static List<String> getLines(String raw) {
    return raw.trim().split("\n");
  }

  static String? regex(String pattern, String data, int gr) {
    return RegExp(r'' + pattern).firstMatch(data)?.group(gr);
  }
}
