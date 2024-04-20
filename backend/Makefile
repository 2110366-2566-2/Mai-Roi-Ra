.PHONY: all run docker_down docker_build swagger migrate

all: build run

swagger:
	swag init -o ./swagger/docs

run:
	docker-compose -f docker-compose.prod.yaml up

docker_build:
	docker-compose -f docker-compose.prod.yaml build

docker_down:
	docker-compose -f docker-compose.prod.yaml down

migrate:
	docker-compose -f docker-compose.prod.yaml run --rm pg_migration migrate -path=/migrations -database "postgresql://root:root@pg_db:5432/test_db?sslmode=disable" -verbose up
