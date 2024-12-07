package days

import main.kotlin.days.Day
import kotlin.random.Random

class Day11 : Day(11) {
	override fun part1(input: List<String>): String {
		TODO("Not yet implemented")
	}

	override fun part2(input: List<String>): String {
		TODO("Not yet implemented")
	}



}

class Universe(data: List<String>) {
	val image: List<List<Galaxy?>>

	init {
		val imageList: MutableList<List<Galaxy?>> = mutableListOf()
		for (i in data.indices) {
			val imageLine: MutableList<Galaxy?> = mutableListOf()
			for (j in data[i].indices) {
				if (data[i][j] == '#') {
					imageLine.add(Galaxy(Random.nextInt(), Pair(i, j)))
				} else {
					imageLine.add(null)
				}
			}
			imageList.add(imageLine)
		}
		image = imageList
	}

	fun expand(){

	}
}

data class Galaxy(val id: Int, val pos: Pair<Int, Int>)