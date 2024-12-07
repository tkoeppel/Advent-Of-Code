import 'abstract_day.dart';

class Day05 extends AbstractDay {
  @override
  int day = 5;

  @override
  String title = "Doesn't He Have Intern-Elves For This?";

  @override
  int solvePart1() {
    List<Word> words = Word.extract(data);
    List<Word> niceWords = [];
    for (Word w in words) {
      if (w.has3Vocals() && w.hasConnected() && w.hasNot()) {
        niceWords.add(w);
      }
    }
    return niceWords.length;
  }

  @override
  int solvePart2() {
    List<Word> words = Word.extract(data);
    List<Word> niceWords = [];
    for (Word w in words) {
      if (w.hasSandwich() && w.hasPairTwice()) {
        niceWords.add(w);
      }
    }
    return niceWords.length;
  }
}

class Word {
  final String value;

  Word(this.value);

  bool has3Vocals() {
    RegExp regex = RegExp(r'([a-z]*[aeiou][a-z]*){3,}');
    return regex.hasMatch(value);
  }

  bool hasConnected() {
    RegExp regex = RegExp(r'([a-z])\1');
    return regex.hasMatch(value);
  }

  bool hasNot() {
    RegExp regex = RegExp(r'ab|cd|pq|xy');
    return !regex.hasMatch(value);
  }

  bool hasSandwich() {
    RegExp regex = RegExp(r'([a-z])[a-z]\1');
    return regex.hasMatch(value);
  }

  bool hasPairTwice() {
    RegExp regex = RegExp(r'([a-z][a-z])[a-z]*\1');
    return regex.hasMatch(value);
  }

  static List<Word> extract(String data) {
    return data.trim().split("\n").map((s) => Word(s)).toList();
  }
}
