#!/bin/bash
rsync -az --delete ./ root@107.170.44.110:/root/signaliq-dockerfiles
ssh root@107.170.44.110 "cd /root/signaliq-dockerfiles && \
docker pull picobit/signaliq-base:latest && \
docker-compose build && \
docker-compose up -d && \
docker-compose scale worker=4"
