# Multi-stage build for Vite + React app
# 1) Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Copy the rest of the source
COPY . .

# Allow setting API URL at build time (optional)
# Example: docker build --build-arg VITE_STATUS_URL=https://yukieevee-warframe.koyeb.app/prime/status -t app .
ARG VITE_STATUS_URL
ENV VITE_STATUS_URL=${VITE_STATUS_URL}

# Build the app
RUN npm run build

# 2) Runtime stage: Nginx to serve static files and proxy API
FROM nginx:1.27-alpine AS runtime

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Replace default server config with our SPA + proxy config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
