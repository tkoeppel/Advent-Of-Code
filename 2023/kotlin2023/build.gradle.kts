plugins {
	kotlin("jvm") version "1.9.21"
}

sourceSets {
	main {
		kotlin.srcDir("src/main")
	}

	test {
		kotlin.srcDir("src/test")
	}
}

tasks {
	wrapper {
		gradleVersion = "8.5"
	}

	test {
		useJUnitPlatform()
	}
}

dependencies {
	testImplementation("org.junit.jupiter:junit-jupiter:5.9.2")
	implementation(kotlin("reflect"))
}
