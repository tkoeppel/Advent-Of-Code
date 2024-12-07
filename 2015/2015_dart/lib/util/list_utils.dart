class ListUtils {
  static swap<T>(List<T> list, int loc1, int loc2) {
    T temp = list[loc2];
    list[loc2] = list[loc1];
    list[loc1] = temp;
  }
}
