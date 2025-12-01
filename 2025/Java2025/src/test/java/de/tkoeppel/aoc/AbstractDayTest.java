package de.tkoeppel.aoc;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.junit.jupiter.api.Test;

abstract class AbstractDayTest {
    private List<String> input;

    public AbstractDayTest(int day) throws IOException{
        String dayString = day < 10 ? "0" + day : String.valueOf(day);
        this.input = getLines(getInput(String.format("day%i.txt", dayString)));
    }

    protected String getInput(String fileName) throws IOException {
        return Files.readString(Path.of("src/test/resources", fileName));
    }

    protected List<String> getLines(String input) throws IOException {
        return input.lines().toList();
    }

    @Test
    public void doTestPart1() {
        testPart1(this.input);
    }

    abstract void testPart1(List<String> lines);

    @Test
    public void testPart2() {
        testPart2(this.input);
    }

    abstract void testPart2(List<String> lines);

}