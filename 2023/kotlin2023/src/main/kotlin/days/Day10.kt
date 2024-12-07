package days

import main.kotlin.days.Day
import kotlin.math.abs

class Day10 : Day(10) {
	override fun part1(input: List<String>): String {
		val pipeMaze = PipeMaze(input)
		val loop = pipeMaze.identifyLoop()
		return ((loop.size - 1) / 2).toString()
	}

	override fun part2(input: List<String>): String {
		val pipeMaze = PipeMaze(input)
		val loop = pipeMaze.identifyLoop()
		val areaInLoop = pipeMaze.calculateArea(loop)
		return pipeMaze.calculateTilesInArea(areaInLoop, loop.size - 1).toString()
	}
}

class PipeMaze(input: List<String>) {
	private lateinit var start: Pipe
	private val maze: List<List<Pipe>>

	init {
		val allPipes: MutableList<List<Pipe>> = mutableListOf()
		for (i in input.indices) {
			val pipeRow: MutableList<Pipe> = mutableListOf()
			for (j in input[i].indices) {
				val pipe = Pipe(input[i][j], Pair(i, j))
				pipeRow.add(pipe)

				if (input[i][j] == 'S') {
					start = pipe
				}
			}
			allPipes.add(pipeRow.toList())
		}
		maze = allPipes.toList()
	}

	fun identifyLoop(): List<Pipe> {
		var previous = start
		var current = getStartNeighbors().first()
		val loop: MutableList<Pipe> = mutableListOf(start)

		while (current != start) {
			loop.add(current)
			current.isInLoop = true
			val nextPos = current.neighbors.find { maze[it.first][it.second] != previous }!!
			previous = current.copy()
			current = maze[nextPos.first][nextPos.second]
		}
		loop.add(current) // add start
		current.isInLoop = true

		return loop
	}

	/**
	 * Calculate area using the Shoelace Theorem
	 *
	 * @param loop The pipe loop with the start pipe at the beginning and ending
	 * @return The total areal
	 */
	fun calculateArea(loop: List<Pipe>): Int {
		var sum = 0
		for (i in 0..loop.size - 2) {
			sum += (loop[i].pos.first * loop[i + 1].pos.second) - (loop[i].pos.second * loop[i + 1].pos.first)
		}
		return (0.5 * abs(sum)).toInt()
	}

	/**
	 * Calculate tiles in area using Pick's Theorem: i = A - b/2 + 1
	 *
	 * @param area The total square area
	 * @param vertices The vertices in the pipe loop
	 */
	fun calculateTilesInArea(area: Int, vertices: Int): Int {
		return area - (vertices / 2) + 1
	}


	private fun getStartNeighbors(): Set<Pipe> {
		val neighbors: HashSet<Pipe> = hashSetOf()

		if (start.pos.first != 0 && maze[start.pos.first - 1][start.pos.second].neighbors.contains(start.pos)) neighbors.add(
			maze[start.pos.first - 1][start.pos.second]
		)
		if (start.pos.first != maze.lastIndex && maze[start.pos.first + 1][start.pos.second].neighbors.contains(start.pos)) neighbors.add(
			maze[start.pos.first + 1][start.pos.second]
		)
		if (start.pos.second != 0 && maze[start.pos.first][start.pos.second - 1].neighbors.contains(start.pos)) neighbors.add(
			maze[start.pos.first][start.pos.second - 1]
		)
		if (start.pos.second != maze[0].lastIndex && maze[start.pos.first][start.pos.second + 1].neighbors.contains(
				start.pos
			)
		) neighbors.add(maze[start.pos.first][start.pos.second + 1])

		return neighbors
	}
}

data class Pipe(val symbol: Char, val pos: Pair<Int, Int>) {
	val neighbors: Set<Pair<Int, Int>> = when (symbol) {
		'-' -> setOf(Pair(pos.first, pos.second - 1), Pair(pos.first, pos.second + 1))
		'|' -> setOf(Pair(pos.first - 1, pos.second), Pair(pos.first + 1, pos.second))
		'L' -> setOf(Pair(pos.first - 1, pos.second), Pair(pos.first, pos.second + 1))
		'J' -> setOf(Pair(pos.first - 1, pos.second), Pair(pos.first, pos.second - 1))
		'F' -> setOf(Pair(pos.first + 1, pos.second), Pair(pos.first, pos.second + 1))
		'7' -> setOf(Pair(pos.first, pos.second - 1), Pair(pos.first + 1, pos.second))
		else -> setOf()
	}
	var isInLoop = false
}