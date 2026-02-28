# Stage 1: Build the SPA
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# When building the docker image, wire the frontend to fetch from the proxy
ENV VITE_DATA_URL=/api/data
ENV VITE_DATA_MODE=api

RUN npm run build

# Stage 2: Serve via Node Proxy Server (supports secure token injection)
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY server.js ./

EXPOSE 8080
CMD ["node", "server.js"]
