package main.kotlin.utils

import kotlin.io.path.Path
import kotlin.io.path.readLines

fun readInput(name: String) = Path("src/test/resources/$name.txt").readLines()
fun Any?.println() = println(this)
fun Long?.format() = this.toString().padStart(5, ' ')
fun String?.grey() = "\u001b[90m$this\u001b[0m"
fun String?.green() = "\u001b[32m$this\u001b[0m"