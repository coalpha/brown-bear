build:
	-tsc

bot: build
	node dist/discord/bot

markov:
	node synthesis/markov

pos: build
	node dist/helpers/pos

gar1t: build
	node dist/sources/gar1t/mod

.PHONY: build bot pos
