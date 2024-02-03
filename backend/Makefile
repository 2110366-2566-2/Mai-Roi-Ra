.PHONY: all run docker_migrate docker_down docker_build swagger

all: build run

swagger:
	swag init -o ./swagger/docs

run:
	docker compose up

docker_build:
	docker compose build

docker_down:
	docker compose down

# อย่าสะเออะทำ migrate เองนะ (natchy ทำ only)
docker_migrate:
	docker compose run --rm pg_migration migrate -path=/migrations -database "postgresql://root:root@pg_db:5432/test_db?sslmode=disable" -verbose up

# อย่าสะเออะทำ migrate เองนะ (natchy ทำ only)
docker_migrate_v0:
	migrate -database "postgresql://root:root@localhost:5432/test_db?sslmode=disable" -path ./migrations force 0

