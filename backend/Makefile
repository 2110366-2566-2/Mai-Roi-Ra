.PHONY: all build run watch docker-up

all: build run

build:
	go build -o server main.go

run:
	~/.air

docker-up:
	docker-compose up -d