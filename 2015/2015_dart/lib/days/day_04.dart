import 'dart:convert';
import 'package:crypto/crypto.dart';

import 'abstract_day.dart';

class Day04 extends AbstractDay {
  @override
  int day = 4;

  @override
  String title = "The Ideal Stocking Stuffer";

  @override
  int solvePart1() {
    Miner miner = Miner(data);
    return miner.mine("00000");
  }

  @override
  int solvePart2() {
    Miner miner = Miner(data);
    return miner.mine("000000");
  }
}

class Miner {
  final String secretKey;

  Miner(this.secretKey);

  int mine(String startSeq) {
    int i = 0;
    String md5 = generateMd5("$secretKey$i");
    while (!checkStartSeq(md5, startSeq)) {
      i++;
      md5 = generateMd5("$secretKey$i");
    }
    return i;
  }

  String generateMd5(String input) {
    return md5.convert(utf8.encode(input)).toString();
  }

  bool checkStartSeq(String full, String seq) {
    return full.substring(0, seq.length) == seq;
  }
}
