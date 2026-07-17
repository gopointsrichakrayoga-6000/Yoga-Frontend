# Stage 1: Compile Vite production bundle using Node 20 Alpine
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package configuration and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files and build optimized chunks
COPY . .
RUN npm run build

# Stage 2: Serve static SPA using lightweight Nginx Alpine container
FROM nginx:1.25-alpine AS runtime

# Clean default Nginx configs and web directory
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copy custom SPA and proxy configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production bundle from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Apply permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
