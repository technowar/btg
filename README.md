# Buanga This Guy

![build_status](https://api.travis-ci.org/wadiwasi/btg.svg?branch=master)

## Setup on Mac

**Requirements**

- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- [Brew](http://brew.sh/)

### Setup Dev Environment

To get started, install 'em all

1. [Docker](https://docs.docker.com/engine/installation/)
2. [Docker Compose](https://docs.docker.com/compose/install/)
3. [Docker Machine](https://docs.docker.com/machine/install-machine/)

**Provision new machine**

1. Provision a new machine with **`2048 MB`** of RAM

    `$ docker-machine create -d virtualbox --virtualbox-memory "2048" dev`

2. Activate docker environment with the newly created box

    `$ eval $(docker-machine env dev)`

> Check if everything's fine by running `$ docker ps` or `$ docker images`. If
there's no error, then you're good to go.

&nbsp;

## Provisioning (docker-compose)

Once your docker env is all set up, then you're pretty much ready to get your hands all dirty. So let's get crackin`!

1. **First off, run the following:**

    **`$ docker-compose up`**

    > This will run the services specified in the `docker-compose.yml` file.
    > If everything's going smoothly, you should see something like this
    > from inside your terminal:

    ![dcomup](http://cl.ly/2H1B3C2D2p2u/download/Screen%20Recording%202016-02-26%20at%2001.29%20AM.gif)

    &nbsp;

2. **Next should be:**

    **`$ make setup`**
    >
    > This will copy some commit-hook scripts to `.git/hooks` folder.

    &nbsp;

## Development

- **Stack - Please read their corresponding documentation.**
	- [Swig](http://paularmstrong.github.io/swig/) - Templating Engine
	- [Koa](http://koajs.com) - Main Framework
	- [Koala](https://github.com/koajs/koala) - HTTP Utility
	- [Koa Router](https://github.com/alexmingoia/koa-router) - Framework Router
	- [Mongoose](https://github.com/Automattic/mongoose) - ORM
	- _Will add more later..._
- **Auto run tests**
	- Run `$ make tdd`
	- Write your code ( watchers will auto run the tests for you )
- **Auto reload server**
	- Run `$ make server`
	- Write your code ( watchers will... yup! )

&nbsp;

## Others

* [Coding Convention](https://github.com/wadiwasi/btg/wiki/Coding-Convention)
* [Documentation](https://github.com/wadiwasi/btg/wiki/Documentation)
