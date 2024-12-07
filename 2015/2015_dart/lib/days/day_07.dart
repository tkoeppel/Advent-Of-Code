import 'package:dart_2015/days/abstract_day.dart';
import 'package:dart_2015/util/list_utils.dart';
import 'package:dart_2015/util/string_utils.dart';

class Day07 extends AbstractDay {
  @override
  int day = 7;

  @override
  String title = "Some Assembly Required";

  @override
  int solvePart1() {
    List<Instruction> instrs = Instruction.extract(data);
    Circuit circuit = Circuit(<String, int>{});
    Instruction.sort(instrs);
    circuit.apply(instrs);

    return circuit.wires["a"]!;
  }

  @override
  int solvePart2() {
    // TODO
    return 0;
  }
}

class Circuit {
  Map<String, int> wires;

  Circuit(this.wires);

  apply(List<Instruction> instrs) {
    for (Instruction instr in instrs) {
      instr.applyTo(wires);
    }
  }
}

abstract class Instruction {
  InstructionType type;
  String dest;

  Instruction(this.dest, this.type);

  applyTo(Map<String, int> circuit);

  static List<Instruction> extract(String data) {
    List<Instruction> instrs = [];
    for (String raw in StringUtils.getLines(data)) {
      String? argLoc1 = StringUtils.regex("([a-z]*)(?= .* ->)", raw, 0);
      String? argLoc2 = StringUtils.regex("([a-z]*)(?= ->)", raw, 0);
      String? gate = StringUtils.regex("([A-Z]{0,6})", raw, 0);
      String? val = StringUtils.regex("([0-9]*)", raw, 0);
      String dest = StringUtils.regex("(?<=-> )([a-z]*)", raw, 1)!;

      instrs.add(Instruction.create(argLoc1, argLoc2, gate, val, dest));
    }

    return instrs;
  }

  static Instruction create(String? argLoc1, String? argLoc2, String? type,
      String? val, String dest) {
    InstructionType instrType = InstructionType.extract(type, argLoc1);

    switch (instrType) {
      case InstructionType.and:
        return AndInstruction(dest, argLoc1!, argLoc2!);
      case InstructionType.or:
        return OrInstruction(dest, argLoc1!, argLoc2!);
      case InstructionType.lshift:
        return LShiftInstruction(dest, argLoc1!, int.parse(val!));
      case InstructionType.rshift:
        return RShiftInstruction(dest, argLoc1!, int.parse(val!));
      case InstructionType.not:
        return NotInstruction(dest, argLoc1!);
      case InstructionType.valassign:
        return ValAssignInstruction(dest, int.parse(argLoc1!));
      case InstructionType.locassign:
        return LocAssignInstruction(dest, val!);
    }
  }

  static void sort(List<Instruction> instrs) {
    List<ValAssignInstruction> assignInstrs =
        instrs.whereType<ValAssignInstruction>().toList();
    Set<String> dests = assignInstrs.map((i) => i.dest).toSet();
    int i = assignInstrs.length;
    instrs.sort((a, b) => a.type.compareTo(b.type));

    while (i < instrs.length) {
      for (int j = 0; j < instrs.length; j++) {
        if (instrs[j] is LocAssignInstruction) {
          tryAddDests(dests, instrs[j].dest,
              (instrs[j] as LocAssignInstruction).loc, i);
        } else if (instrs[j] is ShiftInstruction) {
          tryAddDests(
              dests, instrs[j].dest, (instrs[j] as ShiftInstruction).argLoc, i);
        } else if (instrs[j] is LogicalInstruction) {
          if (dests.contains((instrs[j] as LogicalInstruction).argLoc1) &&
              dests.contains((instrs[j] as LogicalInstruction).argLoc2)) {
            dests.add(instrs[j].dest);
            i++;
            ListUtils.swap<Instruction>(instrs, i, j);
          }
        }
      }
    }
  }

  static void tryAddDests(Set<String> dests, String dest, String loc, int i) {
    if (dests.contains(loc)) {
      dests.add(dest);
      i++;
    }
  }
}

abstract class LogicalInstruction extends Instruction {
  String argLoc1;
  String argLoc2;

  LogicalInstruction(super.d, super.name, this.argLoc1, this.argLoc2);
}

class AndInstruction extends LogicalInstruction {
  AndInstruction(String dest, String argLoc1, String argLoc2)
      : super(dest, InstructionType.and, argLoc1, argLoc2);

  @override
  applyTo(Map<String, int> circuit) {
    circuit[dest] = circuit[argLoc1]! & circuit[argLoc2]!;
  }
}

class OrInstruction extends LogicalInstruction {
  OrInstruction(String dest, String argLoc1, String argLoc2)
      : super(dest, InstructionType.or, argLoc1, argLoc2);

  @override
  applyTo(Map<String, int> circuit) {
    circuit[dest] = circuit[argLoc1]! | circuit[argLoc2]!;
  }
}

abstract class ShiftInstruction extends Instruction {
  String argLoc;
  int val;

  ShiftInstruction(super.dest, super.name, this.argLoc, this.val);
}

class LShiftInstruction extends ShiftInstruction {
  LShiftInstruction(String dest, String argLoc, int val)
      : super(dest, InstructionType.lshift, argLoc, val);

  @override
  applyTo(Map<String, int> circuit) {
    circuit[dest] = circuit[argLoc]! << val;
  }
}

class RShiftInstruction extends ShiftInstruction {
  RShiftInstruction(String dest, String argLoc, int val)
      : super(dest, InstructionType.rshift, argLoc, val);

  @override
  applyTo(Map<String, int> circuit) {
    circuit[dest] = circuit[argLoc]! >> val;
  }
}

class NotInstruction extends Instruction {
  String argLoc;

  NotInstruction(String dest, this.argLoc) : super(dest, InstructionType.not);

  @override
  applyTo(Map<String, int> circuit) {
    circuit[dest] = ~circuit[argLoc]!;
  }
}

class ValAssignInstruction extends Instruction {
  int val;

  ValAssignInstruction(String dest, this.val)
      : super(dest, InstructionType.valassign);

  @override
  applyTo(Map<String, int> circuit) {
    circuit[dest] = val;
  }
}

class LocAssignInstruction extends Instruction {
  String loc;

  LocAssignInstruction(String dest, this.loc)
      : super(dest, InstructionType.locassign);

  @override
  applyTo(Map<String, int> circuit) {
    circuit[dest] = circuit[loc]!;
  }
}

enum InstructionType implements Comparable<InstructionType> {
  and(verbose: "AND", priority: 1),
  or(verbose: "OR", priority: 1),
  lshift(verbose: "LSHIFT", priority: 1),
  rshift(verbose: "RSHIFT", priority: 1),
  not(verbose: "NOT", priority: 1),
  valassign(verbose: "", priority: 0),
  locassign(verbose: "", priority: 1);

  final String verbose;
  final int priority;

  const InstructionType({required this.verbose, required this.priority});

  static InstructionType extract(String? data, dynamic val) {
    if (data == null || data == "") {
      return val is int ? InstructionType.valassign : InstructionType.locassign;
    }
    return InstructionType.values.firstWhere((g) => g.verbose == data);
  }

  @override
  int compareTo(InstructionType other) => priority - other.priority;
}
