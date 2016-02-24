test:
	PORT=31337 ./node_modules/.bin/cucumberjs

setup:
	[ -x ./scripts/copy-git-hooks.sh ] && ./scripts/copy-git-hooks.sh 2> /dev/null

lint:
	[ -x ./node_modules/.bin/eslint ] && ./node_modules/.bin/eslint .

docker-test:
	PORT=31337 /deps/node_modules/.bin/cucumberjs

server:
	./scripts/watch.sh . make restart-web

restart-web:
	docker exec btg_web_1 /deps/node_modules/.bin/pm2 restart server 2> /dev/null

test-web:
	docker exec btg_web_1 make docker-test

tdd:
	./scripts/watch.sh . make test-web

sandwich: compose

compose:
	./scripts/compose.sh

.PHONY: test
