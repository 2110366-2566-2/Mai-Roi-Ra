.PHONY: all build run watch docker-up

all: build run

run:
	docker compose up

build_docker:
	docker compose build

migrate:
	migrate -path ./migration -database "postgresql://root:root@localhost:5432/test_db?sslmode=disable" -verbose up