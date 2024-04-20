.PHONY: all run docker_down docker_build swagger migrate

all: build run

swagger:
	swag init -o ./swagger/docs

run:
	docker compose up

docker_build:
	docker compose build

docker_down:
	docker compose down

migrate:
	docker compose run --rm pg_migration migrate -path=/migrations -database "postgresql://root:root@pg_db:5432/test_db?sslmode=disable" -verbose up

docker_real_migrate:
	migrate -database "postgresql://root:root@localhost:5432/test_db?sslmode=disable" -path ./migrations force 0 \
	&& PGPASSWORD=root docker exec -it pg_container psql -U root -d test_db -c "DROP TABLE schema_migrations;" \
	&& docker compose run --rm pg_migration migrate -path=/migrations -database "postgresql://root:root@pg_db:5432/test_db?sslmode=disable" -verbose up