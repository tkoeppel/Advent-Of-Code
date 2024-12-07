package days

import main.kotlin.days.Day
import main.kotlin.utils.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import kotlin.system.measureTimeMillis

abstract class DayTestBase(private val day: Day, private val solution1: String, private val solution2: String) {
	@Test
	fun part1() {
		"Day ${getVerboseDay(day.day)}:".println()
		var part1Solution = "";
		val timePart1 = measureTimeMillis {
			part1Solution = day.part1(getDefaultInput())
		}
		getSolveString(1, timePart1.format(), part1Solution).println()
		assertEquals(solution1, part1Solution)
	}

	@Test
	fun part2() {
		var part2Solution = "";
		val timePart2 = measureTimeMillis {
			part2Solution = day.part2(getDefaultInput())
		}
		getSolveString(2, timePart2.format(), part2Solution).println()
		assertEquals(solution2, part2Solution)
		"".println()
	}

	private fun getDefaultInput(): List<String> {
		return readInput(day.javaClass.simpleName)
	}

	private fun getSolveString(part: Int, time: String, solution: String): String {
		val timeString = "[$time ms]".grey()
		return "$timeString Part $part: ${solution.green()}"
	}

	private fun getVerboseDay(day: Int): String {
		return if (day < 10) "0$day" else "$day"
	}


}