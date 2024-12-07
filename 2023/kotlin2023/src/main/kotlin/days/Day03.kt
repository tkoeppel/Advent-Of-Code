package days

import main.kotlin.days.Day

class Day03 : Day(3) {
	override fun part1(input: List<String>): String {
		val engineSchematic = EngineSchematic(input)
		val partNumbers = engineSchematic.schematicNumbers.filter { n -> n.parts.isNotEmpty() }
		return partNumbers.sumOf { p -> p.number }.toString()
	}

	override fun part2(input: List<String>): String {
		val engineSchematic = EngineSchematic(input)
		val gearToNumbers = engineSchematic.getPartToNumbers('*').filter { entry -> entry.value.size == 2 }
		return gearToNumbers.values.sumOf { numbers -> numbers[0] * numbers[1] }.toString()
	}

}

class EngineSchematic(private val rawSchematic: List<String>) {
	val schematicNumbers: MutableList<SchematicNumber> = mutableListOf()

	init {
		val schematic: MutableList<String> = processSchematic()

		for (i in 1..<schematic.size) {
			var schematicNumber = SchematicNumber()
			var number: String = ""
			for (j in 1..<schematic[i].length) {
				// end
				if (!schematic[i][j].isDigit() && number.isNotEmpty()) {
					schematicNumber.number = number.toInt()
					schematicNumbers.add(schematicNumber.copy())
					number = ""
					schematicNumber = SchematicNumber()
					continue
				}

				if (schematic[i][j].isDigit()) {
					// digit itself
					schematicNumber.addSurroundingParts(schematic, i, j)
					number += schematic[i][j]
				}
			}
		}
	}

	private fun processSchematic(): MutableList<String> {
		val char = "."
		val newSchematic = rawSchematic.map { s -> char + s + char }.toMutableList()
		val blank = char.repeat(newSchematic[0].length)
		newSchematic.add(0, blank)
		newSchematic.add(blank)
		return newSchematic
	}

	fun getPartToNumbers(symbol: Char): MutableMap<Pair<Int, Int>, MutableList<Int>> {
		val map: MutableMap<Pair<Int, Int>, MutableList<Int>> = mutableMapOf()
		for (gearNumber in schematicNumbers) {
			for (part in gearNumber.parts) {
				if (part.symbol == symbol) {
					if (map[part.coord].isNullOrEmpty()) {
						map[part.coord] = mutableListOf(gearNumber.number)
					} else {
						map[part.coord]?.add(gearNumber.number)
					}
				}
			}
		}
		return map
	}
}

data class SchematicNumber(var number: Int = 0, val parts: MutableSet<Part> = mutableSetOf()) {
	fun addSurroundingParts(schematic: List<String>, i: Int, j: Int) {
		for (row in -1..1) {
			for (col in -1..1) {
				val (x, y) = Pair(i + row, j + col)

				if (!(schematic[x][y].isDigit() || schematic[x][y] == '.')) {
					parts.add(Part(schematic[x][y], Pair(x, y)))
				}
			}
		}
	}
}

data class Part(val symbol: Char, val coord: Pair<Int, Int>)