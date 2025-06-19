FROM node:22-slim

# Enable corepack (pnpm comes prebundled with Node 16.13+)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy only package files first (for caching install layer)
COPY package.json pnpm-lock.yaml ./

# Install deps using pnpm
RUN pnpm install --frozen-lockfile

# Copy rest of the app
COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]
