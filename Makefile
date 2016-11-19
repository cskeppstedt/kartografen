REGISTRY        = skeppstedt
IMAGE           = kartografen
VERSION        ?= 0.0.1
LATEST_VERSION ?= $(VERSION)

# docker might or might not require sudo
# detect this automatically to simplify life a bit
DOCKER=$(shell docker info >/dev/null 2>&1 && echo "docker" || echo "sudo docker")

all: build

build:
	# npm run dist
	@$(DOCKER) build -t $(REGISTRY)/$(IMAGE):$(VERSION) ./

latest:
	@$(DOCKER) tag -f $(REGISTRY)/$(IMAGE):$(VERSION) $(REGISTRY)/$(IMAGE):latest

push:
	@$(DOCKER) push $(REGISTRY)/$(IMAGE):$(VERSION)
	@$(DOCKER) push $(REGISTRY)/$(IMAGE):latest

run:
	@$(DOCKER) run -e "PORT=8080" --rm -it $(REGISTRY)/$(IMAGE):$(VERSION)

bash:
	@$(DOCKER) run -e "PORT=8080" --rm -it $(REGISTRY)/$(IMAGE):$(VERSION) bash

