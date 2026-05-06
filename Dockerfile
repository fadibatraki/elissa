# SECURE Dockerfile - Use this instead of the original Dockerfile
# Based on your original Dockerfile but with security improvements

FROM node:22-alpine

# Security: Create non-root user early
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 apps

# Install build dependencies for native modules
RUN apk add --no-cache \
  build-base \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  giflib-dev \
  python3 \
  libc6-compat

WORKDIR /app

# Install dependencies (allow optional deps for native modules like lightningcss)
COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

# Remove canvas if not needed (common source of vulnerabilities)
RUN find node_modules -type d -path "*/node_modules/canvas" -prune -exec rm -rf '{}' + || true

# Generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# ✅ FIX: Copy public and .next/static into standalone directory
# Standalone server at .next/standalone/server.js doesn't auto-serve these
RUN cp -r public .next/standalone/public && \
  cp -r .next/static .next/standalone/.next/static

# Create uploads directory for persistent file storage (mounted as docker volume)
RUN mkdir -p /app/uploads && \
  chown -R apps:nodejs /app/uploads && \
  chmod 755 /app/uploads

# Change ownership of the app directory
RUN chown -R apps:nodejs /app

# Set environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV UPLOAD_DIR=/app/uploads/product-images

# Security: Switch to non-root user
USER apps

# Expose the application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# ✅ FIX: Use standalone server directly (faster, smaller footprint)
# Standalone server: .next/standalone/server.js
CMD ["node", ".next/standalone/server.js"]
