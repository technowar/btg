# Buanga This Guy

![build_status](https://api.travis-ci.org/wadiwasi/btg.svg?branch=master)

## Setup Dev Environment

To get started right away, just install the following:

1. [Docker](https://docs.docker.com/engine/installation/)
2. [Docker Compose](https://docs.docker.com/compose/install/)
3. [Docker Machine](https://docs.docker.com/machine/install-machine/)

#### Installing on Mac

**Requirements**

- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- And a fucking Mac Computer

Install 'em all
>`$ brew update && brew install docker docker-compose docker-machine

Once you're done, you need to provision a boot2docker virtual machine.

To privision a new machine with `2048 MB` of RAM
>`$ docker-machine create -d virtualbox --virtualbox-memory "2048" dev`

Run `eval` to make the machine active
>`$ eval $(docker-machine env dev)`

Check if everything's fine by running `docker ps` or `docker images`. If
there's no error, then you're good to go.

**Provisioning container with docker-compose**

Once your docker env is all set up, just go ahead and run
`docker-compose up` then grab some coffee because fucking NPM install
takes forever!

## Development

Run `docker-compose up`

- **TDD**
	- Run `make tdd`
	- Write your code ( watchers will auto run the tests for you )
- **Server**
	- Run `make server`
	- Write your code ( watchers will... yup! )

---
More **docs** soon...
