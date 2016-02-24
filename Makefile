test:
	PORT=31337 ./node_modules/.bin/cucumberjs

docker-test:
	PORT=31337 /deps/node_modules/.bin/cucumberjs

server:
	./scripts/watch.sh . docker exec btg_web_1 /deps/node_modules/.bin/pm2 restart server

tdd:
	./scripts/watch.sh . docker exec btg_web_1 make docker-test

.PHONY: test
