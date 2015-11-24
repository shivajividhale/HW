# Homework 4 - Advanced Docker


1) **File IO**: 
Two folders [Container 1](https://github.com/shivajividhale/HW/tree/master/HW4/Task1/Container1) and [Container 2](https://github.com/shivajividhale/HW/tree/master/HW4/Task1/Container2) contain Dockerfiles that would be built. And the following run commands are executed:

Server running socat:
	`docker run -it -d --name server server-container  /bin/sh` <br>
Client container:
	`docker run -it --link server:server client-container /bin/sh -c "curl http://server:9001"`

[Screencast](http://youtu.be/hXqEQs1u0OY?hd=1)

2) **Ambassador pattern**: 
Two Docker Compose files are used: [Server-side](https://github.com/shivajividhale/HW/blob/master/HW4/Task2/server-host/docker-compose.yml) and [Client-Side](https://github.com/shivajividhale/HW/blob/master/HW4/Task2/client-host/Task2/docker-compose.yml)

Two dockerfiles are use to build the images apart from the Ambassador Docker file used in the Workshop.
And following commands are used:
Client-side [Dockerfile](https://github.com/shivajividhale/HW/blob/master/HW4/Task2/client-host/Task2/Dockerfile) and Server-side [Dockerfile](https://github.com/shivajividhale/HW/blob/master/HW4/Task2/server-host/Dockerfile)<br>
Server side:
	`docker-compose up -d` <br>
Client Side:
	`docker-compose run --rm redis-client`

[Screencast](https://www.youtube.com/watch?v=bx92qWOMFZQ&feature=youtu.be&hd=1)

3) **Docker Deploy**: 
There are two repositories Blue Green as practiced before in this course.
Same Docker file as that in App.git and same Deployment green blue slices as the ones used in Deployment HW. Here are the changes incorporated:

Using a pre-push script:
	#!/bin/sh

	color=$1
	branch=$2

	cd /root/App
	docker build -t hw4-app .
	echo "build completed"
	docker tag -f  hw4-app localhost:5000/hw4:$color
	docker push localhost:5000/hw4:$color

And a post-receive script in the Deployement directory:

	GIT_WORK_TREE=$ROOT/blue-www/ git checkout -f  
	echo "Stoping blue-app"
	docker stop blue-app  
	echo "Removing blue-app"
	docker rm blue-app
	docker rmi localhost:5000/hw4:blue_current  
	docker pull localhost:5000/hw4:blue
	docker tag localhost:5000/hw4:blue localhost:5000/hw4:blue_current
	echo "New image running on port 50100"
	docker run -p 50100:8080 -d --name blue-app localhost:5000/hw4:blue_current

Similar hook for green with the change in color in the file. <br>
[Screencast](http://youtu.be/xQbFPzAgxFU?hd=1)

PS: Documents have been rearranged to place it in the repository for submission. All neccessary links should be obtained from the README as the README has all the links to all parts of the submission.