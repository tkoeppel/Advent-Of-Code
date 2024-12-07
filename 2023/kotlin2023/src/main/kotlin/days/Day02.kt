package days

import main.kotlin.days.Day

class Day02 : Day(2) {
	override fun part1(input: List<String>): String  {
		val bag = Bag(12, 13, 14)
		val gameRecords = input.map { i -> GameRecord(i) }.toList()
		return bag.sumPossibleGames(gameRecords).toString();
	}

	override fun part2(input: List<String>): String {
		val gameRecords = input.map { i -> GameRecord(i) }.toList()
		val powers = gameRecords.map { g -> g.minGamePower() }
		return powers.sum().toInt().toString()
	}

}

class Bag(private val red: Int, private val green : Int, private val blue: Int) {
	fun sumPossibleGames(gameRecords: List<GameRecord>): Int {
		var sum = 0
		for (record in gameRecords) {
			if (record.isPossible(red, green, blue)) {
				sum += record.id
			}
		}
		return sum
	}
}

enum class Color(val color: String) {
	RED("red"), GREEN("green"), BLUE("blue")
}

class GameRecord(input: String) {
	val id: Int = Regex("(?<=Game )[0-9]+").find(input)!!.value.toInt()
	private val reds: MutableList<Int> = mutableListOf()
	private val greens: MutableList<Int> = mutableListOf()
	private val blues: MutableList<Int> = mutableListOf()

	init {
		val cubesString = Regex("(?<=:).*").find(input)!!.value.split(";", ",")
		for (cubeString in cubesString) {
			val color: Color =
				Regex(Color.entries.joinToString("|") { c -> c.color }).find(cubeString)?.value?.let { Color.valueOf(it.uppercase()) }!!;
			val number: Int = Regex("[0-9]{1,2}").find(cubeString)?.value?.toInt() ?: 0

			when (color) {
				Color.RED -> reds.add(number)
				Color.GREEN -> greens.add(number)
				Color.BLUE -> blues.add(number)
			}
		}
		reds.sort()
		greens.sort()
		blues.sort()
	}

	fun isPossible(red: Int, green: Int, blue: Int) : Boolean{
		return isPossible(reds, red) && isPossible(greens, green) && isPossible(blues, blue)
	}

	fun minGamePower():Int{
		return greens.max() * reds.max() * blues.max()
	}

	private fun isPossible(cubes: List<Int>, maxNumber: Int): Boolean{
		for (cube in cubes){
			if(cube > maxNumber){
				return false
			}
		}
		return true
	}
}