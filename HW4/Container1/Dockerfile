#get Ubuntu image
FROM ubuntu:14.04

#update and install socat
RUN apt-get update
RUN apt-get install -y socat
RUN touch a.log
RUN /bin/echo 'Hello from Container 1' > a.log

#start socat and listen for connection on port 9001
CMD socat TCP-LISTEN:9001,fork 'SYSTEM:cat a.log'

#expose port 9001
EXPOSE 9001

