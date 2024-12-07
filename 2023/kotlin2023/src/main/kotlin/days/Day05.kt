package days

import main.kotlin.days.Day

class Day05 : Day(5) {
	override fun part1(input: List<String>): String {
		val almanac = Almanac(input)
		val locations = almanac.getLocations()
		return locations.min().toString()
	}

	override fun part2(input: List<String>): String {
		val almanac = Almanac(input)
		val locations = almanac.getLocationsRanged().sortedBy { it.first }
		return locations.minOf { it.first }.toString()
	}
}

class Almanac(input: List<String>) {
	private val seeds: List<Long> = Regex("(?<= )[0-9]+").findAll(input[0]).map { mr -> mr.value.toLong() }.toList()
	private val maps: MutableList<ConversionMap> = mutableListOf()

	init {
		var currentMap: ConversionMap? = null
		for (line in input.subList(2, input.size - 1)) {
			// empty line
			if (line.isEmpty()) continue

			val matches = "[0-9]+".toRegex().findAll(line).map { m -> m.value.toLong() }.toList()
			if (matches.isNotEmpty() && currentMap != null) {
				currentMap.conversions.add(
					Conversion(
						matches[1]..<matches[1] + matches[2], matches[0]..<matches[0] + matches[2]
					)
				)
			} else {
				finalizeMap(maps, currentMap)
				currentMap = ConversionMap(Regex("([a-z-]+)to([a-z-]+)").find(line)!!.value)
			}
		}
		finalizeMap(maps, currentMap)
	}

	private fun finalizeMap(maps: MutableList<ConversionMap>, map: ConversionMap?) {
		if (map != null) {
			map.conversions.sortBy { it.sourceRange.first }
			maps.add(map)
		}
	}

	fun getLocations(): List<Long> {
		val locations: MutableList<Long> = mutableListOf()
		for (seed in seeds) {
			var currentNumber = seed
			var currentMap = getNextMap("seed")
			while (currentMap != null) {
				currentNumber = currentMap.getCorresponding(currentNumber)
				currentMap = getNextMap(currentMap.target)
			}
			locations.add(currentNumber)
		}
		return locations
	}

	fun getLocationsRanged(): List<LongRange> {
		var currentRanges = getRangedSeeds()
		var currentMap = getNextMap("seed")
		while (currentMap != null) {
			currentRanges = currentMap.getCorrespondingRanges(currentRanges)
			currentRanges.sortedBy { it.first }
			currentMap = getNextMap(currentMap.target)
		}
		return currentRanges
	}

	private fun getNextMap(target: String): ConversionMap? {
		return maps.find { m -> m.source == target }
	}

	private fun getRangedSeeds(): List<LongRange> {
		val rangedSeeds: MutableList<LongRange> = mutableListOf()
		for (i in seeds.indices step 2) {
			val range = seeds[i]..<seeds[i] + seeds[i + 1]
			rangedSeeds.add(range)
		}
		rangedSeeds.sortBy { it.first }
		return rangedSeeds.toList()
	}
}

data class ConversionMap(
	val name: String, var conversions: MutableList<Conversion> = mutableListOf()
) {
	val source: String
	val target: String

	init {
		val nameParts = name.split("-to-")
		source = nameParts[0]
		target = nameParts[1]
	}

	fun getCorresponding(number: Long): Long {
		for (conversion in conversions) {
			if (conversion.sourceRange.contains(number)) {
				return conversion.targetRange.first + (number - conversion.sourceRange.first)
			}
		}
		return number
	}

	fun getCorrespondingRanges(sources: List<LongRange>): List<LongRange> {
		val incoming: List<LongRange> = sources
		val outgoing: HashSet<LongRange> = hashSetOf()
		var parts: List<LongRange> = incoming.toList()
		var partsBefore = listOf<LongRange>()

		while (parts != partsBefore) {
			partsBefore = parts.toList()
			parts = scanCongruences(parts.sortedBy { it.first }, outgoing)
		}
		outgoing.addAll(parts)
		return outgoing.toList()
	}

	private fun scanCongruences(
		xs: List<LongRange>, ys: HashSet<LongRange>
	): List<LongRange> {
		val parts: HashSet<LongRange> = hashSetOf()
		for (x in xs) {
			for (c in conversions) {
				val s1 = c.sourceRange.first
				val s2 = c.sourceRange.last
				val t1 = c.targetRange.first
				val t2 = c.targetRange.last

				if (x.last < s1) {
					ys.add(x)
					break
				}

				if (c.sourceRange.contains(x.first) && c.sourceRange.contains(x.last)) {
					// --- s1 --- x1 --- x2 --- s2 ---
					ys.add((t1 + (x.first - s1)..t1 + (x.last - s1)))
					break
				} else if (c.sourceRange.contains(x.first) && !c.sourceRange.contains(x.last)) {
					// --- s1 --- x1 --- s2 --- x2 ---
					ys.add(t1 + (x.first - s1)..t2)
					parts.add(s2 + 1..x.last)
					break
				} else if (x.contains(s1) && x.contains(s2)) {
					// --- x1 --- s1 --- s2 --- x2 ---
					parts.add(x.first..<s1)
					ys.add(c.targetRange)
					parts.add(s2 + 1..x.last)
					break
				} else if (!c.sourceRange.contains(x.first) && c.sourceRange.contains(x.last)) {
					// --- x1 --- s1 --- x2 --- s2 ---
					parts.add(x.first..<s1)
					ys.add(t1..t1 + (x.last - s1) + 1)
					break
				} else if (conversions.last() == c) {
					// no conversion contained range in any way
					ys.add(x)
					break
				}
			}
		}
		return parts.toList()
	}

}

data class Conversion(val sourceRange: LongRange, val targetRange: LongRange)