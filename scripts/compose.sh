#!/bin/bash
export BTG_PASS=$(date | md5)
[ -n $(which docker-compose) ] && docker-compose up
