package de.tkoeppel.aoc;

import java.util.List;

class Day01 extends AbstractDay {

    @Override
    String part1(List<String> input) {
        List<Rotation> rotations = Rotation.fromStringList(input);
        return null;
    }

    @Override
    String part2(List<String> input) {
        return null;
    }
}

class Rotation {
    private Direction direction;
    private int clicks;

    public Rotation(Direction direction, int clicks) {
        this.direction = direction;
        this.clicks = clicks;
    }

    public static List<Rotation> fromStringList(List<String> rotationsStr) {
        return rotationsStr.stream()
                .map(rot -> //
                new Rotation( //
                        Direction.fromStr(rot.substring(0, 1)), //
                        Integer.valueOf(rot.substring(1)).intValue()))
                .toList();
    }
}

enum Direction {
    LEFT(-1), RIGHT(1);

    private int click;

    Direction(int click) {
        this.click = click;
    }

    public static Direction fromStr(String letter) {
        if (letter.equals("L")) {
            return Direction.LEFT;
        } else if (letter.equals("R")) {
            return Direction.RIGHT;
        }

        return null;
    }
}