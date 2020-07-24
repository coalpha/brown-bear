build:
	tsc

%.js:
	tsc

pos: dist/helpers/pos.js
	node $<

auth: dist/discord/auth.js
	node $<

.PHONY: build
