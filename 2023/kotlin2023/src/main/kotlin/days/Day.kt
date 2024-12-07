package main.kotlin.days

abstract class Day(val day: Int) {
	abstract fun part1(input: List<String>): String
	abstract fun part2(input: List<String>): String
}