package days

import main.kotlin.days.Day

class Day07 : Day(7) {
	override fun part1(input: List<String>): String {
		val camelCards = CamelCardsWithJack(input)
		return camelCards.calcWinnings().toString()
	}

	override fun part2(input: List<String>): String {
		val camelCards = CamelCardsWithJoker(input)
		return camelCards.calcWinnings().toString()
	}
}

abstract class CamelCards {
	abstract var hands: List<Pair<Hand, Int>>
	protected val comparator =
		Comparator { one: Pair<Hand, Int>, other: Pair<Hand, Int> -> one.first.compareTo(other.first) }

	fun calcWinnings(): Int {
		val winnings: List<Int> = hands.map { it.second * (hands.indexOf(it) + 1) }
		return winnings.sum()
	}
}

class CamelCardsWithJack(input: List<String>) : CamelCards() {
	override var hands: List<Pair<Hand, Int>> = input.map { Pair(JackHand(it.split(" ")[0]), it.split(" ")[1].toInt()) }

	init {
		hands = hands.sortedWith(comparator)
	}
}

class CamelCardsWithJoker(input: List<String>) : CamelCards() {
	override var hands: List<Pair<Hand, Int>> =
		input.map { Pair(JokerHand(it.split(" ")[0]), it.split(" ")[1].toInt()) }

	init {
		hands = hands.sortedWith(comparator)
	}
}

abstract class Hand : Comparable<Hand> {
	abstract val cards: List<ICamelCard>
	abstract val type: CardType
	abstract val typeValues: List<Pair<ICamelCard, Int>>

	override fun compareTo(other: Hand): Int {
		return if (this.type.ordinal > other.type.ordinal) {
			-1
		} else if (this.type.ordinal < other.type.ordinal) {
			1
		} else {
			this.checkTypeRankGradually(other)
		}
	}

	fun determineType(typeValues: List<Pair<ICamelCard, Int>>): CardType {
		return when {
			typeValues.size == 1 && typeValues[0].second == 5 -> CardType.FIVE_OF_A_KIND
			typeValues.size == 1 && typeValues[0].second == 4 -> CardType.FOUR_OF_A_KIND
			typeValues.size == 2 && typeValues[0].second == 3 && typeValues[1].second == 2 -> CardType.FULL_HOUSE
			typeValues.size == 1 && typeValues[0].second == 3 -> CardType.THREE_OF_A_KIND
			typeValues.size == 2 && typeValues[0].second == 2 && typeValues[1].second == 2 -> CardType.TWO_PAIR
			typeValues.size == 1 && typeValues[0].second == 2 -> CardType.ONE_PAIR
			else -> CardType.HIGH_CARD
		}
	}

	private fun checkTypeRankGradually(other: Hand): Int {
		for (i in 0..this.cards.size) {
			if (this.cards[i].ordinal > other.cards[i].ordinal) {
				return -1
			} else if (this.cards[i].ordinal < other.cards[i].ordinal) {
				return 1
			}
		}
		return 0
	}
}

class JackHand(input: String) : Hand() {
	override val cards: List<CamelCardWithJack> = input.map { CamelCardWithJack.from(it)!! }
	override val typeValues: List<Pair<CamelCardWithJack, Int>> =
		cards.groupingBy { it }.eachCount().toList().filter { it.second > 1 }.sortedByDescending { it.second }
	override val type: CardType = determineType(typeValues)
}

class JokerHand(input: String) : Hand() {
	override val cards: List<CamelCardWithJoker> = input.map { CamelCardWithJoker.from(it)!! }
	override val typeValues: List<Pair<CamelCardWithJoker, Int>> =
		cards.groupingBy { it }.eachCount().toList().filter { it.second > 1 && it.first != CamelCardWithJoker.JOKER }
			.sortedByDescending { it.second }
	override val type: CardType = determineTypeWithJoker(typeValues)

	private fun determineTypeWithJoker(typeValues: List<Pair<CamelCardWithJoker, Int>>): CardType {
		val jokers = cards.count { it == CamelCardWithJoker.JOKER }

		return when {
			jokers == 0 -> determineType(typeValues)
			jokers == 5 -> CardType.FIVE_OF_A_KIND
			jokers == 4 -> CardType.FIVE_OF_A_KIND
			jokers == 3 && typeValues.size == 1 -> CardType.FIVE_OF_A_KIND
			jokers == 3 -> CardType.FOUR_OF_A_KIND
			jokers == 2 && typeValues.size == 1 && typeValues[0].second == 3 -> CardType.FIVE_OF_A_KIND
			jokers == 2 && typeValues.size == 1 && typeValues[0].second == 2 -> CardType.FOUR_OF_A_KIND
			jokers == 2 -> CardType.THREE_OF_A_KIND
			jokers == 1 && typeValues.size == 1 && typeValues[0].second == 4 -> CardType.FIVE_OF_A_KIND
			jokers == 1 && typeValues.size == 1 && typeValues[0].second == 3 -> CardType.FOUR_OF_A_KIND
			jokers == 1 && typeValues.size == 2 -> CardType.FULL_HOUSE
			jokers == 1 && typeValues.size == 1 && typeValues[0].second == 2 -> CardType.THREE_OF_A_KIND
			else -> CardType.ONE_PAIR
		}

	}
}

enum class CardType {
	FIVE_OF_A_KIND, FOUR_OF_A_KIND, FULL_HOUSE, THREE_OF_A_KIND, TWO_PAIR, ONE_PAIR, HIGH_CARD;
}

enum class CamelCardWithJack(val value: Char) : ICamelCard {
	//@formatter:off
	ACE('A'), KING('K'), QUEEN('Q'), JACK('J'), TEN('T'), NINE('9'),
	EIGHT('8'), SEVEN('7'), SIX('6'), FIVE('5'), FOUR('4'), THREE('3'),
	TWO('2');
	// @formatter:on

	companion object {
		infix fun from(value: Char): CamelCardWithJack? = entries.firstOrNull { it.value == value }
	}
}

enum class CamelCardWithJoker(val value: Char) : ICamelCard {
	//@formatter:off
	ACE('A'), KING('K'), QUEEN('Q'), TEN('T'), NINE('9'), EIGHT('8'),
	SEVEN('7'), SIX('6'), FIVE('5'), FOUR('4'), THREE('3'), TWO('2'),
	JOKER('J');
	// @formatter:on

	companion object {
		infix fun from(value: Char): CamelCardWithJoker? = entries.firstOrNull { it.value == value }
	}
}

interface ICamelCard {
	val ordinal: Int
}