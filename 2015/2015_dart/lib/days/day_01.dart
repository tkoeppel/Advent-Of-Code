import 'abstract_day.dart';

class Day01 extends AbstractDay {
  @override
  int day = 1;

  @override
  String title = "Not Quite Lisp";

  @override
  int solvePart1() {
    Building building = Building(0);
    List<Direction> directions = Building.convertToDirections(data);

    return building.move(directions);
  }

  @override
  int solvePart2() {
    Building building = Building(0);
    List<Direction> directions = Building.convertToDirections(data);

    return building.moveIntoBasement(directions);
  }
}

enum Direction implements Comparable<Direction> {
  up(code: "(", vector: 1),
  down(code: ")", vector: -1);

  const Direction({required this.code, required this.vector});

  final String code;
  final int vector;

  @override
  int compareTo(Direction other) => vector - other.vector;
}

class Building {
  final int basementLevel = -1;
  final int startLevel;

  Building(this.startLevel);

  int move(List<Direction> directions) {
    var level = startLevel;
    for (Direction direction in directions) {
      level = level + direction.vector;
    }

    return level;
  }

  int moveIntoBasement(List<Direction> directions) {
    var level = startLevel;
    for (int i = 0; i < directions.length; i++) {
      level = level + directions[i].vector;

      if (level == basementLevel) {
        return i + 1;
      }
    }

    throw Exception(
        "The Basement levele $basementLevel is never reached. Current level: $level");
  }

  static List<Direction> convertToDirections(String data) {
    List<Direction> directions = [];
    for (int i = 0; i < data.length; i++) {
      var direction =
          (data[i] == Direction.up.code) ? Direction.up : Direction.down;
      directions.add(direction);
    }

    return directions;
  }
}
