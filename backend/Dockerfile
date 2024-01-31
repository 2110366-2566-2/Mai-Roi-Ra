# # Use the official Golang image as a base image
FROM golang:latest

# # Set the working directory inside the container
WORKDIR /usr/src/app

RUN go install github.com/cosmtrek/air@v1.41.0

COPY . .

RUN go mod tidy

# COPY . ./

CMD ["air", "-c", ".air.toml"]