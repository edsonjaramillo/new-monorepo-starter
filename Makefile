# This Makefile is used to run commands that won't be persisted in the package.json permanently
# It's used for development purposes

MONOREPO_STARTER_API_NAME := monorepo_starter_api
MONOREPO_STARTER_API_IMAGE := monorepo-starter/api
PORT := 4000
DOCKERFILE := docker/Dockerfile.api

docker-stop-api:
	docker stop $(MONOREPO_STARTER_API_NAME) && docker rm $(MONOREPO_STARTER_API_NAME)

docker-build-api:
	docker build -t $(MONOREPO_STARTER_API_IMAGE) -f $(DOCKERFILE) .

docker-run-api:
	docker run --name $(MONOREPO_STARTER_API_NAME) -p $(PORT):$(PORT) -d $(MONOREPO_STARTER_API_IMAGE)
