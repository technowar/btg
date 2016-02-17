# Buanga This Guy

![build_status](https://api.travis-ci.org/wadiwasi/btg.svg?branch=master)

## Setup Dev Environment

To get started right away, just install the following:

1. Docker
2. Docker Compose
3. Docker Machine

#### Installing on Mac

**Requirements**

- VirtualBox
- And a fucking Mac Computer

Just do `brew update && brew install docker docker-compose
docker-machine`.

Once you're done. You need to provision a boot2docker virtual machine.

To privision a new machine just do `docker-machine create dev`, then `eval
$(docker-machine env dev)`.

Check if everything's fine by running `docker ps` or `docker images`. If
there's no error, then you're good to go.

**Provisioning container with docker-compose**

Once you're docker env is all setup, just go ahead and run
`docker-compose up` then grab some coffee because fucking NPM install
takes forever!

## Development

- **TDD**
	- Run `make tdd`
	- Write you're code ( watchers will auto run the tests for you )
- **Server**
	- Run `make server`
	- Write you're code ( watchers will... yup! )


More DOCS soon...
