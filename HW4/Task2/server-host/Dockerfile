#get Ubuntu image
FROM ubuntu:14.04

#update and install socat
RUN apt-get update
RUN apt-get install -y redis-server

EXPOSE 6379
ENTRYPOINT [ "/usr/bin/redis-server" ]
