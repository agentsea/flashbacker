# Multi-stage build for flashbacker MCP server
# Stage 1: Build
FROM node:22-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++ git

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript and copy templates
RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine

# Install runtime dependencies only
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files from builder stage
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/bin ./bin
COPY --from=builder /app/templates ./templates
COPY README.md ./

# Create a non-root user
RUN addgroup -g 1001 flashback && \
    adduser -D -u 1001 -G flashback flashback && \
    chown -R flashback:flashback /app

# Switch to non-root user
USER flashback

# Make the CLI executable globally available
ENV PATH="/app/bin:${PATH}"

# Set up entrypoint
ENTRYPOINT ["node", "/app/lib/cli.js"]

# Default command (shows help)
CMD ["--help"]

# Labels for container metadata
LABEL org.opencontainers.image.title="Flashbacker"
LABEL org.opencontainers.image.description="Claude Code state management with session continuity and AI personas"
LABEL org.opencontainers.image.source="https://github.com/agentsea/flashbacker"
LABEL org.opencontainers.image.licenses="MIT"
