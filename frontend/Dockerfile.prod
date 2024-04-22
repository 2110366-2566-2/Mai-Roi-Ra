# Step 1: Build the Next.js application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of your app's source code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Step 2: Serve the application using a Node.js server
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy package.json, pnpm-lock.yaml, and .next directory from the builder stage
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install pnpm globally
RUN npm install -g pnpm

# Install production dependencies
RUN pnpm install --production

# Set the environment to production
ENV NODE_ENV production

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]
