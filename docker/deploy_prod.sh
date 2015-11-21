#!/bin/bash
rsync -az --delete ./ root@162.243.224.220:/root/influenceriq-dockerfiles
ssh root@162.243.224.220 "cd /root/influenceriq-dockerfiles && \
docker pull picobit/influenceriq-base:latest && \
docker-compose build && \
docker-compose up -d && \
docker-compose scale worker=4"
