package days

import main.kotlin.days.Day
import kotlin.math.pow
import kotlin.math.sqrt

class Day08 : Day(8) {
	override fun part1(input: List<String>): String {
		val wasteland = WastelandNetwork(input)
		val steps = wasteland.followDirections("AAA", "ZZZ")
		return steps.toString()
	}

	override fun part2(input: List<String>): String {
		val wasteland = WastelandNetwork(input)
		val steps = wasteland.followAllDirections('A', 'Z')
		return steps.toString()
	}

}

class WastelandNetwork(input: List<String>) {
	private val directions = input[0]
	private val nodes: Map<String, Pair<String, String>>

	init {
		val nodeMap: MutableMap<String, Pair<String, String>> = mutableMapOf()
		for (raw in input.slice(2..<input.size)) {
			val n = Regex("[A-Z]+").findAll(raw).map { it.value }.toList()
			nodeMap[n[0]] = Pair(n[1], n[2])
		}
		nodes = nodeMap.toMap()
	}

	fun followDirections(from: String, to: String): Int {
		var steps = 0
		var directionIndex = 0
		var current = from
		while (!current.contains(to)) {
			directionIndex = if (directionIndex >= directions.length) 0 else directionIndex
			if (directions[directionIndex] == 'L') {
				current = nodes[current]!!.first
			} else {
				current = nodes[current]!!.second
			}
			steps++
			directionIndex++
		}
		return steps
	}

	private fun followDirections(start: String, endChar: Char): Int {
		var steps = 0
		var directionIndex = 0
		var current = start
		while (!current.endsWith(endChar)) {
			directionIndex = if (directionIndex >= directions.length) 0 else directionIndex
			current = if (directions[directionIndex] == 'L') {
				nodes[current]!!.first
			} else {
				nodes[current]!!.second
			}
			steps++
			directionIndex++
		}
		return steps
	}

	fun followAllDirections(startChar: Char, endChar: Char): Long {
		val starts = nodes.keys.filter { it.endsWith(startChar) }
		val steps = starts.map { followDirections(it, endChar) }
		return lcm(steps)
	}

	/**
	 * Least Common Multiplier
	 *
	 * @param numbers
	 * @return The least common multiplier
	 */
	private fun lcm(numbers: List<Int>): Long {
		// Get prime factors for each step and make a pair of (factor, count)
		val primeFactors = numbers.map { primeFactors(it) }
		val allPrimeFactors: HashSet<Pair<Int, Int>> = hashSetOf()
		for (factors in primeFactors){
			allPrimeFactors.addAll(factors.groupingBy { it }.eachCount().toList())
		}
		// Make a map: for each factor occurring there is a List of the factor pairs occuring
		val distinctionMap: MutableMap<Int,MutableList<Pair<Int,Int>>> = mutableMapOf()
		for (factor in allPrimeFactors){
			if(distinctionMap.containsKey(factor.first)){
				distinctionMap[factor.first]?.add(factor)
			} else {
				distinctionMap[factor.first] = mutableListOf(factor)
			}
		}
		// Now find the max occurrences for each entry/factor and power the factor with the count
		val maxFactorsPowered: MutableList<Long> = mutableListOf()
		for(entry in distinctionMap){
			val max = entry.value.maxBy { it.first }
			maxFactorsPowered.add(max.first.toDouble().pow(max.second.toDouble()).toLong())
		}
		// product of all powered prime factors
		return maxFactorsPowered.reduce { acc, i -> acc * i }
	}

	/**
	 * **Stolen from:**
	 * [Kotlin Program to Find All Prime Factors of Given Number](https://tutorialwing.com/kotlin-program-to-find-all-prime-factors-of-given-number/)
	 */
	private fun primeFactors(number: Int): List<Int> {
		val arr: MutableList<Int> = mutableListOf()
		var n = number
		while (n % 2 == 0) {
			arr.add(2)
			n /= 2
		}

		val squareRoot = sqrt(n.toDouble()).toInt()
		for (i in 3..squareRoot step 2) {
			while (n % i == 0) {
				arr.add(i)
				n /= i
			}
		}

		if (n > 2) {
			arr.add(n)
		}

		return arr
	}
}