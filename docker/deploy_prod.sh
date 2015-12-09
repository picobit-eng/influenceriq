#!/bin/bash
rsync -az --delete ./ root@45.55.87.90:/root/influenceriq-dockerfiles
ssh root@45.55.87.90 "cd /root/influenceriq-dockerfiles && \
docker pull picobit/influenceriq-base:latest && \
docker-compose build && \
docker-compose up -d && \
docker-compose scale worker=4"
