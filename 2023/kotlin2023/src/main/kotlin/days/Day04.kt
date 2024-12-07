package days

import main.kotlin.days.Day
import kotlin.math.pow

class Day04 : Day(4) {
	override fun part1(input: List<String>): String {
		val cardPile = CardPile(input)
		return cardPile.getScores().sum().toString()
	}

	override fun part2(input: List<String>): String {
		val cardPile = CardPile(input)
		return cardPile.getTotals().sum().toString()
	}
}

class CardPile(input: List<String>) {
	private val scratchCards: List<Card> = input.map { c -> Card(c) }

	fun getScores(): List<Int> {
		return scratchCards.map { sc -> 2.toDouble().pow(sc.getMatchCount().toDouble() - 1).toInt()}
	}

	fun getTotals(): List<Int>{
		val cardToInstance: MutableMap<Int, Int> = scratchCards.associate { Pair(it.id, 1) }.toMutableMap()

		for(card in scratchCards){
			for(i in 1..card.getMatchCount()){
				cardToInstance[card.id + i] = cardToInstance[card.id + i]!! + cardToInstance[card.id]!!
			}
		}

		return cardToInstance.values.toList()
	}
}

private class Card(input: String) {
	val id: Int = Regex("[0-9]+(?=:)").find(input)!!.value.toInt()
	private val winningNumbers: List<Int> =
		Regex("(?<=:)([ 0-9]+)*(?= \\|)").find(input)!!.value.trim().split("\\s+".toRegex()).map { v -> v.toInt() }
	private val ownNumbers: List<Int> = Regex("(?<=\\|)([ 0-9]+)*").find(input)!!.value.trim().split("\\s+".toRegex()).map { v -> v.toInt() }

	fun getMatchCount(): Int {
		val difference = ownNumbers.subtract(winningNumbers.toSet())
		return ownNumbers.subtract(difference).size
	}
}