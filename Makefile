# Default test
test:
	PORT=3001 ./node_modules/.bin/cucumberjs

# Setup
setup:
	[ -x ./scripts/copy-git-hooks.sh ] && ./scripts/copy-git-hooks.sh 2> /dev/null

# Lint
lint:
	[ -x ./node_modules/.bin/eslint ] && ./node_modules/.bin/eslint .

# Run test inside btg_web_1 container
dtest:
	PORT=3002 /deps/node_modules/.bin/cucumberjs

# Restar btg_web_1 container from host
rsweb:
	docker exec btg_web_1 /deps/node_modules/.bin/pm2 restart server 2> /dev/null

# Test from inside btg_web_1 container
tweb:
	docker exec btg_web_1 make dtest

# Watcher Script
server:
	./scripts/watch.sh . make rsweb
tdd:
	./scripts/watch.sh . make tweb

.PHONY: test
