# Base Node.js image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Install libc6-compat for compatibility with certain Node.js modules
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy the .env file and package files, then install dependencies
COPY .env package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy node_modules and other necessary files from the previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy the .env file for the build
COPY .env .env

# Disable Next.js telemetry during the build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js app
RUN yarn build

# Production image, copy all the files and run Next.js
FROM base AS runner
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Disable Next.js telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED=1

# Create system user and group for Next.js
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy the .env file into the runner stage
COPY .env .env

# Set the correct permission for prerender cache and other directories
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Run the container as the nextjs user
USER nextjs

# Expose the port that the app will run on
EXPOSE 3400

# Set environment variables for Next.js app
ENV PORT=3400
ENV HOSTNAME="0.0.0.0"

# Start the Next.js server
CMD ["node", "server.js"]
