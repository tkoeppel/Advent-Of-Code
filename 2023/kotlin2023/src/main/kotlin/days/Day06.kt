package days

import main.kotlin.days.Day
import kotlin.math.ceil
import kotlin.math.floor
import kotlin.math.pow
import kotlin.math.sqrt

class Day06 : Day(6) {
	override fun part1(input: List<String>): String {
		val boat = Boat(0)
		val races = Race.getRaces(input)
		val records = races.map { boat.calcRecordBeats(it) }
		return records.reduce { acc, i -> i * acc }.toString()
	}

	override fun part2(input: List<String>): String {
		val boat = Boat(0)
		val race = Race.getTotalRace(input)
		return boat.calcRecordBeats(race).toString()
	}


}

data class Boat(val initialSpeed: Long) {
	fun calcRecordBeats(race: Race): Long {
		// resolved equation: distance = initialSpeed + (raceTime - charge) * charge
		val discriminant = sqrt(race.time.toDouble().pow(2) - (4 * race.distance) - (4 * initialSpeed))
		val floor = (race.time - discriminant) / 2
		val ceiling = (race.time + discriminant) / 2
		return (floor(ceiling).toInt() - ceil(floor).toInt() + 1).toLong()
	}
}

data class Race(val time: Long, val distance: Long) {

	companion object {
		fun getTotalRace(input: List<String>): Race {
			val time = findNumbers(input[0]).reduce { acc, i -> "$acc$i".toLong() }
			val distance = findNumbers(input[1]).reduce{acc, i -> "$acc$i".toLong() }
			return Race(time.toLong(), distance.toLong())
		}

		fun getRaces(input: List<String>): List<Race> {
			val races = mutableListOf<Race>()
			val times = findNumbers(input[0])
			val distances = findNumbers(input[1])
			for (i in times.indices) {
				races.add(Race(times[i], distances[i]))
			}
			return races.toList()
		}

		private fun findNumbers(input: String): List<Long> {
			return Regex("[0-9]+").findAll(input).map { it.value.toLong() }.toList()
		}
	}
}