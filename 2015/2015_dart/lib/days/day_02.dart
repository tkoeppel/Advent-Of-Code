import 'abstract_day.dart';

class Day02 extends AbstractDay {
  @override
  int day = 2;

  @override
  String title = "I Was Told There Would Be No Math";

  @override
  int solvePart1() {
    List<WrappingPaper> papers = Wrapper.extract(data)
        .map((e) => WrappingPaper(e.length, e.width, e.height))
        .toList();

    return WrappingFactory.wrapPaperTotal(papers);
  }

  @override
  int solvePart2() {
    List<Ribbon> ribbons = Wrapper.extract(data)
        .map((e) => Ribbon(e.length, e.width, e.height))
        .toList();

    return WrappingFactory.wrapRibbonTotal(ribbons);
  }
}

class WrappingPaper extends Wrapper {
  late int surface;
  late int slack;

  WrappingPaper(int l, int w, int h) : super(l, w, h) {
    surface = calculatePrismSurface();
    slack = calculateSlack();
  }

  int calculatePrismSurface() {
    return 2 * length * width + 2 * width * height + 2 * height * length;
  }

  int calculateSlack() {
    final List<int> minima = getTwoMinima();
    return minima[0] * minima[1];
  }
}

class Ribbon extends Wrapper {
  late int surface;
  late int bow;

  Ribbon(int l, int w, int h) : super(l, w, h) {
    surface = calculateSurface();
    bow = calculateBow();
  }

  calculateSurface() {
    List<int> minima = getTwoMinima();
    return 2 * minima[0] + 2 * minima[1];
  }

  calculateBow() {
    return length * width * height;
  }
}

class WrappingFactory {
  static int wrapPaperTotal(List<WrappingPaper> papers) {
    int total = 0;
    for (WrappingPaper paper in papers) {
      total = total + paper.surface + paper.slack;
    }

    return total;
  }

  static int wrapRibbonTotal(List<Ribbon> ribbons) {
    int total = 0;
    for (Ribbon ribbon in ribbons) {
      total = total + ribbon.surface + ribbon.bow;
    }

    return total;
  }
}

class Wrapper {
  int length;
  int width;
  int height;

  Wrapper(this.length, this.width, this.height);

  List<int> getTwoMinima() {
    final dimensions = <int>[length, width, height];
    dimensions.sort();
    return dimensions.sublist(0, 2);
  }

  static List<Wrapper> extract(String data) {
    List<Wrapper> papers = [];
    List<String> rawPapers = data.split("\n");
    for (String raw in rawPapers) {
      List<int> dim = raw.split("x").map((e) => int.parse(e)).toList();

      if (dim.length != 3) {
        throw Exception(
            "Corrupt data. Wrapping paper has only ${dim.length} dimension(s).");
      }

      papers.add(Wrapper(dim[0], dim[1], dim[2]));
    }
    return papers;
  }
}
