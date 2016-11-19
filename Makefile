# docker might or might not require sudo
# detect this automatically to simplify life a bit
IMAGE_NAME='registry.heroku.com/kartografen-docker/web'
DOCKER=$(shell docker info >/dev/null 2>&1 && echo "docker" || echo "sudo docker")

all: build run

release: dist build push

dist:
	npm run dist

build:
	@$(DOCKER) build -t $(IMAGE_NAME) ./

push:
	@$(DOCKER) push $(IMAGE_NAME)

# nice to have for local development
run: build
	@$(DOCKER) run -e "PORT=8080" -p 8080:8080 --rm -it $(IMAGE_NAME)

bash:
	@$(DOCKER) run -e "PORT=8080" -p 8080:8080 --rm -it $(IMAGE_NAME) bash

