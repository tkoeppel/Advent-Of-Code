package days

import main.kotlin.days.Day

class Day09 : Day(9) {
	override fun part1(input: List<String>): String {
		val oasis = Oasis(input)
		return oasis.getExtrapolated(false).sum().toString()
	}

	override fun part2(input: List<String>): String {
		val oasis = Oasis(input)
		return oasis.getExtrapolated(true).sum().toString()
	}
}

class Oasis(input: List<String>) {
	private val history = input.map { it -> Regex("[0-9-]+").findAll(it).map { it.value.toInt() }.toList() }

	fun getExtrapolated(backwards: Boolean): List<Int> {
		val extrapolated: MutableList<Int> = mutableListOf()
		for (h in history) {
			val differences = getPivotalDifferences(h, backwards)
			extrapolated.add(extrapolate(differences, backwards))
		}
		return extrapolated
	}

	private fun getPivotalDifferences(numbers: List<Int>, backwards: Boolean): List<Int> {
		val differences: MutableList<List<Int>> = mutableListOf(numbers)
		var current = numbers
		while (!current.all { it == 0 }) {
			val currentDiff: MutableList<Int> = mutableListOf()
			for (i in 0..current.size - 2) {
				currentDiff.add(current[i + 1] - current[i])
			}
			differences.add(currentDiff.toList())
			current = currentDiff.toList()
		}
		return if(backwards) differences.map { it.first() } else differences.map { it.last() }
	}

	private fun extrapolate(differences: List<Int>, backwards: Boolean): Int {
		var extrapolated = 0
		for (diff in differences.reversed()) {
			if (backwards) {
				extrapolated = diff - extrapolated
			} else {
				extrapolated += diff
			}
		}
		return extrapolated
	}
}