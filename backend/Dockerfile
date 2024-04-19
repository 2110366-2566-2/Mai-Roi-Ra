# FROM golang:latest

# WORKDIR /usr/src/app

# RUN go install github.com/cosmtrek/air@v1.41.0

# RUN go install github.com/swaggo/swag/cmd/swag@latest

# COPY go.mod go.sum ./
# RUN go mod download

# COPY . .

# RUN swag init

# COPY swagger/ ./docs

# RUN go mod tidy

# CMD ["air", "-c", ".air.toml"]

# # deploy Dockerfile
# Use a specific version of golang for the builder stage
FROM golang:latest AS builder
WORKDIR /usr/src/app

# Copy the local package files to the container's workspace
COPY . .

# Download dependencies
RUN go mod download

# Build the binary with full static linkage
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /app/main ./

# Use a minimal alpine base image for the final stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates tzdata

# Set the working directory in the container
WORKDIR /app

# Copy the binary from the builder stage to the production image
COPY --from=builder /app/main ./
# Copy the environment file if needed, adjust path as necessary
COPY ./.env ./.env

# Expose port 80 on the container
EXPOSE 80

# Run the binary
CMD ["./main"]
