import 'dart:io';

abstract class AbstractDay {
  AbstractDay() {
    data = readData();
    solve();
  }

  abstract int day;
  abstract String title;

  late String data;

  solvePart1();
  solvePart2();

  String readData() {
    var parsedDay = (day < 10) ? "0$day" : "$day";
    return File('input/day_$parsedDay.txt').readAsStringSync().trim();
  }

  void solve() {
    print('\n--- Day $day: $title ---');

    DateTime s1 = DateTime.now();
    dynamic part1 = solvePart1();
    DateTime s2 = DateTime.now();
    print('[${s2.difference(s1)}] Part 1: $part1');

    DateTime s3 = DateTime.now();
    dynamic part2 = solvePart2();
    DateTime s4 = DateTime.now();
    print('[${s4.difference(s3)}] Part 2: $part2');
  }
}
