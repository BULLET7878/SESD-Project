# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# Accept Vite env vars at build time
ARG VITE_BACKEND_URL
ARG VITE_CURRENCY
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_CURRENCY=$VITE_CURRENCY

COPY package*.json ./
RUN npm ci --frozen-lockfile

COPY . .
RUN npm run build

# ---- Serve Stage ----
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
