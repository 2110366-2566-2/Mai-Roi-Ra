FROM golang:latest

WORKDIR /usr/src/app

RUN go install github.com/cosmtrek/air@v1.41.0

RUN go install github.com/swaggo/swag/cmd/swag@latest

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN swag init

COPY swagger/ ./docs

RUN go mod tidy

CMD ["air", "-c", ".air.toml"]
