# Docker Usage Guide

This guide explains how to use Flashbacker with Docker and how to integrate it with MCP (Model Context Protocol) servers.

## Quick Start

### Pull from GitHub Container Registry

```bash
docker pull ghcr.io/agentsea/flashbacker:latest
```

### Build Locally

```bash
# Build the Docker image
docker build -t flashbacker:local .

# Or use docker-compose
docker-compose build
```

## Running Flashbacker in Docker

### Basic Commands

```bash
# Check version
docker run --rm ghcr.io/agentsea/flashbacker:latest --version

# Show help
docker run --rm ghcr.io/agentsea/flashbacker:latest --help

# Initialize flashback in a project
docker run --rm -v $(pwd):/workspace -w /workspace \
  ghcr.io/agentsea/flashbacker:latest init --mcp
```

### Using Docker Compose

The repository includes a `docker-compose.yml` for easier management:

```bash
# Run flashback commands
docker-compose run --rm flashbacker flashback --version
docker-compose run --rm flashbacker flashback init --mcp
docker-compose run --rm flashbacker flashback status

# Interactive shell
docker-compose run --rm flashbacker /bin/sh
```

## MCP Server Integration

Flashbacker works with MCP servers for enhanced AI capabilities. When running in Docker, you can configure MCP servers in several ways:

### Option 1: Initialize with MCP Servers

```bash
# Initialize flashback with built-in MCP server support
docker run --rm -v $(pwd):/workspace -w /workspace \
  ghcr.io/agentsea/flashbacker:latest init --mcp
```

This will set up the following MCP servers in your project:
- **context7**: Up-to-date documentation and library context
- **playwright**: Browser automation and testing
- **sequential-thinking**: Advanced reasoning chains

### Option 2: Using as an MCP Server Base

You can use the Flashbacker Docker image as a base for creating your own MCP server:

```dockerfile
FROM ghcr.io/agentsea/flashbacker:latest

# Add your MCP server implementation
COPY your-mcp-server.js /app/

# Configure to run as MCP server
ENTRYPOINT ["node", "/app/your-mcp-server.js"]
```

### Option 3: stdio MCP Server Mode

For stdio-based MCP servers (common pattern):

```bash
# Run flashbacker in stdio mode for MCP integration
docker run -i --rm \
  -v $(pwd):/workspace \
  -w /workspace \
  ghcr.io/agentsea/flashbacker:latest \
  agent --context
```

## Volume Mounting

To work with your project files, mount them as volumes:

```bash
# Mount current directory
docker run --rm -v $(pwd):/workspace -w /workspace \
  ghcr.io/agentsea/flashbacker:latest init

# Mount specific project directory
docker run --rm -v /path/to/project:/workspace -w /workspace \
  ghcr.io/agentsea/flashbacker:latest status
```

## Environment Variables

Configure Flashbacker behavior with environment variables:

```bash
docker run --rm \
  -e NODE_ENV=production \
  -v $(pwd):/workspace \
  -w /workspace \
  ghcr.io/agentsea/flashbacker:latest init
```

## Multi-Platform Support

The Docker image is built for multiple platforms:
- `linux/amd64` (x86_64)
- `linux/arm64` (ARM64/Apple Silicon)

Docker will automatically pull the correct platform for your system.

## Container Image Details

### Image Tags

- `latest`: Latest stable release from main branch
- `v2.4.1`, `v2.4`, `v2`: Semantic version tags
- `main`: Latest from main branch
- `claude/branch-name`: Development branches
- `sha-<commit>`: Specific commit SHA

### Example Tag Usage

```bash
# Latest stable
docker pull ghcr.io/agentsea/flashbacker:latest

# Specific version
docker pull ghcr.io/agentsea/flashbacker:v2.4.1

# Development branch
docker pull ghcr.io/agentsea/flashbacker:claude/feature-branch
```

## Advanced Usage

### Running in Kubernetes

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: flashbacker-init
spec:
  containers:
  - name: flashbacker
    image: ghcr.io/agentsea/flashbacker:latest
    command: ["flashback", "init", "--mcp"]
    volumeMounts:
    - name: project-volume
      mountPath: /workspace
    workingDir: /workspace
  volumes:
  - name: project-volume
    persistentVolumeClaim:
      claimName: project-pvc
```

### CI/CD Integration

Use in GitHub Actions:

```yaml
jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Initialize Flashbacker
        run: |
          docker run --rm \
            -v ${{ github.workspace }}:/workspace \
            -w /workspace \
            ghcr.io/agentsea/flashbacker:latest \
            init --mcp
```

## Building Custom Images

### Extending the Base Image

```dockerfile
FROM ghcr.io/agentsea/flashbacker:latest

# Install additional dependencies
USER root
RUN apk add --no-cache bash curl jq

# Copy custom configuration
COPY custom-config.json /app/config/

# Switch back to non-root user
USER flashback

# Set custom entrypoint
ENTRYPOINT ["flashback"]
```

### Multi-Stage Custom Build

```dockerfile
FROM ghcr.io/agentsea/flashbacker:latest AS base

FROM node:22-alpine
COPY --from=base /app /app
ENV PATH="/app/bin:${PATH}"

# Add your customizations
RUN apk add --no-cache git bash

ENTRYPOINT ["flashback"]
```

## Troubleshooting

### Permission Issues

If you encounter permission issues with mounted volumes:

```bash
# Run as current user
docker run --rm --user $(id -u):$(id -g) \
  -v $(pwd):/workspace \
  -w /workspace \
  ghcr.io/agentsea/flashbacker:latest init
```

### Node.js Version Compatibility

The Docker image uses Node.js 22 (LTS) which is compatible with Flashbacker's requirements (Node.js 18-24).

### Git Configuration

For commands that require git:

```bash
docker run --rm \
  -v $(pwd):/workspace \
  -v ~/.gitconfig:/home/flashback/.gitconfig:ro \
  -w /workspace \
  ghcr.io/agentsea/flashbacker:latest status
```

## Security Considerations

- The container runs as a non-root user (`flashback` - UID 1001)
- Only necessary dependencies are included in the production image
- Multi-stage build minimizes attack surface
- Build provenance attestation is generated for all images

## Support

For issues or questions:
- GitHub Issues: https://github.com/agentsea/flashbacker/issues
- Documentation: https://github.com/agentsea/flashbacker#readme
