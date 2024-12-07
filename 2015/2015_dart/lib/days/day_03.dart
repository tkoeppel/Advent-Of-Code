import 'abstract_day.dart';

class Day03 extends AbstractDay {
  @override
  int day = 3;

  @override
  String title = "Perfectly Spherical Houses in a Vacuum";

  @override
  int solvePart1() {
    Santa santa = Santa(0, 0);
    List<House> visited = santa.deliver(Santa.readDirections(data));

    return visited.length;
  }

  @override
  int solvePart2() {
    Santa santa = Santa(0, 0);
    Santa roboSanta = Santa(0, 0);
    List<Direction> directions = Santa.readDirections(data);

    List<House> santaVisited =
        santa.deliver(Santa.distributeDirections(directions, true));
    List<House> roboSantaVisited =
        roboSanta.deliver(Santa.distributeDirections(directions, false));
    List<House> visited = santaVisited + roboSantaVisited;

    return Set.from(visited.map((h) => h.serialized())).length;
  }
}

class Santa {
  final int startX;
  final int startY;

  Santa(this.startX, this.startY);

  List<House> deliver(List<Direction> directions) {
    int x = startX;
    int y = startY;
    List<House> visited = [House(x, y)];

    for (Direction d in directions) {
      x += d.xVec;
      y += d.yVec;

      List<House> hs = visited.where((h) => h.x == x && h.y == y).toList();
      if (hs.isEmpty) {
        visited.add(House(x, y));
      }
    }

    return visited;
  }

  static List<Direction> readDirections(String data) {
    List<Direction> directions = [];
    for (int i = 0; i < data.length; i++) {
      directions.add(Direction.getDirection(data[i]));
    }
    return directions;
  }

  static distributeDirections(List<Direction> directions, bool retEven) {
    List<Direction> even = [];
    List<Direction> odd = [];
    for (int i = 0; i < directions.length; i++) {
      if (i % 2 == 0) {
        even.add(directions[i]);
      } else {
        odd.add(directions[i]);
      }
    }

    return retEven ? even : odd;
  }
}

class House {
  final int x;
  final int y;

  House(this.x, this.y);

  String serialized() {
    return "$x,$y";
  }
}

enum Direction implements Comparable<Direction> {
  north(symbol: "^", xVec: 0, yVec: 1),
  east(symbol: ">", xVec: 1, yVec: 0),
  south(symbol: "v", xVec: 0, yVec: -1),
  west(symbol: "<", xVec: -1, yVec: 0);

  const Direction(
      {required this.symbol, required this.xVec, required this.yVec});

  final String symbol;
  final int xVec;
  final int yVec;

  static getDirection(String symbol) {
    switch (symbol) {
      case "^":
        return Direction.north;
      case ">":
        return Direction.east;
      case "v":
        return Direction.south;
      case "<":
        return Direction.west;
    }
  }

  @override
  int compareTo(Direction other) => (xVec + yVec) - (other.xVec + other.yVec);
}
