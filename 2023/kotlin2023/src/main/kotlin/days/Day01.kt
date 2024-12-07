package days

import main.kotlin.days.Day

class Day01 : Day(1) {
	override fun part1(input: List<String>): String {
		val calibrationValues = mutableListOf<Int>()
		val allowedChars = Calibration.numbers.values.map { n -> n.toString() }
		for (code in input) {
			calibrationValues.add(Calibration(code).getCalibrationValue(allowedChars))
		}
		return calibrationValues.sum().toString()
	}

	override fun part2(input: List<String>): String {
		val calibrationValues = mutableListOf<Int>()
		val allowedChars = Calibration.numbers.keys.toList() + Calibration.numbers.values.map { n -> n.toString() }
		for (code in input) {
			calibrationValues.add(Calibration(code).getCalibrationValue(allowedChars))
		}
		return calibrationValues.sum().toString()
	}
}

class Calibration(private val code: String) {
	fun getCalibrationValue(allowedChars: List<String>): Int {
		val pattern = Regex(allowedChars.joinToString("|"))
		val matches = mutableListOf<String>()
		var i = 0
		while ( pattern.find(code, i) != null){
			matches.add(pattern.find(code, i)!!.value)
			i++
		}

		return toInt(matches[0]) * 10 + toInt(matches[matches.size - 1])
	}

	private fun toInt(digitString: String): Int {
		if (digitString.length == 1) {
			return digitString.toInt()
		}

		if (numbers.containsKey(digitString)) {
			return numbers[digitString]!!
		}
		throw Exception("Number or word does not exist!")
	}

	companion object {
		val numbers = mapOf(
			Pair("one", 1),
			Pair("two", 2),
			Pair("three", 3),
			Pair("four", 4),
			Pair("five", 5),
			Pair("six", 6),
			Pair("seven", 7),
			Pair("eight", 8),
			Pair("nine", 9)
		)
	}
}
