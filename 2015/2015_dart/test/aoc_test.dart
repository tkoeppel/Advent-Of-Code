import 'package:dart_2015/days/day_01.dart';
import 'package:dart_2015/days/day_02.dart';
import 'package:dart_2015/days/day_03.dart';
import 'package:dart_2015/days/day_04.dart';
import 'package:dart_2015/days/day_05.dart';
import 'package:dart_2015/days/day_06.dart';
import 'package:test/test.dart';

void main() {
  /// DAY 01
  group('Day 01', () {
    final day = Day01();
    test('Part1', () {
      expect(day.solvePart1(), 74);
    });
    test('Part2', () {
      expect(day.solvePart2(), 1795);
    });
  });

  /// DAY 02
  group('Day 02', () {
    final day = Day02();
    test('Part1', () {
      expect(day.solvePart1(), 1586300);
    });
    test('Part2', () {
      expect(day.solvePart2(), 3737498);
    });
  });

  /// DAY 03
  group('Day 03', () {
    final day = Day03();
    test('Part1', () {
      expect(day.solvePart1(), 2565);
    });
    test('Part2', () {
      expect(day.solvePart2(), 2639);
    });
  });

  /// DAY 04
  group('Day 04', () {
    final day = Day04();
    test('Part1', () {
      expect(day.solvePart1(), 282749);
    });
    test('Part2', () {
      expect(day.solvePart2(), 9962624);
    });
  });

  /// DAY 05
  group('Day 05', () {
    final day = Day05();
    test('Part1', () {
      expect(day.solvePart1(), 236);
    });
    test('Part2', () {
      expect(day.solvePart2(), 51);
    });
  });

  /// DAY 06
  group('Day 06', () {
    final day = Day06();
    test('Part1', () {
      expect(day.solvePart1(), 377891);
    });
    test('Part2', () {
      expect(day.solvePart2(), 14110788);
    });
  });
}
