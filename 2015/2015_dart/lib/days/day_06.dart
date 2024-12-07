import 'abstract_day.dart';
import 'package:tuple/tuple.dart';

class Day06 extends AbstractDay {
  @override
  int day = 6;

  @override
  String title = "Probably a Fire Hazard";

  @override
  int solvePart1() {
    List<Instruction> instructions = Instruction.extract(data);
    LightGrid grid = LightGrid.create(1000, 1000);
    grid.apply(instructions);

    return grid.getLit();
  }

  @override
  int solvePart2() {
    List<Instruction> instructions = Instruction.extract(data);
    LightGrid grid = LightGrid.create(1000, 1000);
    grid.apply2(instructions);

    return grid.getLit();
  }
}

class LightGrid {
  List<List<int>> grid;

  LightGrid(this.grid);

  void apply(List<Instruction> instrs) {
    List<List<int>> current = deepCopy(grid);
    for (Instruction instr in instrs) {
      for (int x = instr.start.item1; x <= instr.end.item1; x++) {
        for (int y = instr.start.item2; y <= instr.end.item2; y++) {
          current[x][y] = instr.apply(current[x][y]);
        }
      }
    }
    grid = current;
  }

  void apply2(List<Instruction> instrs) {
    List<List<int>> current = deepCopy(grid);
    for (Instruction instr in instrs) {
      for (int x = instr.start.item1; x <= instr.end.item1; x++) {
        for (int y = instr.start.item2; y <= instr.end.item2; y++) {
          current[x][y] = instr.apply2(current[x][y]);
        }
      }
    }
    grid = current;
  }

  int getLit() {
    int lit = 0;
    for (int x = 0; x < grid.length; x++) {
      for (int y = 0; y < grid[x].length; y++) {
        lit += grid[x][y];
      }
    }

    return lit;
  }

  static LightGrid create(int w, int h) =>
      LightGrid(List<List<int>>.filled(w, List<int>.filled(h, 0)));
}

class Instruction {
  final InstructionType type;
  final Tuple2 start;
  final Tuple2 end;

  Instruction(this.type, this.start, this.end);

  int apply(int light) {
    if (type == InstructionType.turnOn) {
      return 1;
    } else if (type == InstructionType.turnOff) {
      return 0;
    } else {
      return light == 1 ? 0 : 1;
    }
  }

  int apply2(int light) {
    if (type == InstructionType.turnOn) {
      return light + 1;
    } else if (type == InstructionType.turnOff) {
      return light > 0 ? light - 1 : 0;
    } else {
      return light + 2;
    }
  }

  static List<Instruction> extract(String data) {
    int regToInt(String reg, String source) {
      return int.parse(RegExp(reg).firstMatch(source)?.group(0) as String);
    }

    List<Instruction> instrs = [];
    for (String raw in data.trim().split("\n")) {
      int startX = regToInt(r'[0-9]{1,3}(?=,[0-9]{1,3} through)', raw);
      int startY = regToInt(r'(?<=[0-9]{1,3},)[0-9]{1,3}(?= through)', raw);
      int endX = regToInt(r'(?<=through )[0-9]{1,3}(?=,)', raw);
      int endY = regToInt(r'(?<=through [0-9]{1,3},)[0-9]{1,3}', raw);
      instrs.add(Instruction(InstructionType.extract(raw),
          Tuple2(startX, startY), Tuple2(endX, endY)));
    }

    return instrs;
  }
}

enum InstructionType implements Comparable<InstructionType> {
  turnOn(verbose: "turn on"),
  turnOff(verbose: "turn off"),
  toggle(verbose: "toggle");

  final String verbose;

  const InstructionType({required this.verbose});

  static InstructionType extract(String source) {
    if (RegExp(r'' '${InstructionType.turnOn.verbose}').hasMatch(source)) {
      return InstructionType.turnOn;
    }
    if (RegExp(r'' '${InstructionType.turnOff.verbose}').hasMatch(source)) {
      return InstructionType.turnOff;
    }
    if (RegExp(r'' '${InstructionType.toggle.verbose}').hasMatch(source)) {
      return InstructionType.toggle;
    }

    throw Exception("No matching instruction found!");
  }

  @override
  int compareTo(InstructionType other) =>
      verbose.codeUnitAt(0) - other.verbose.codeUnitAt(0);
}

List<List<int>> deepCopy(List<List<int>> source) {
  return source.map((e) => e.toList()).toList();
}
