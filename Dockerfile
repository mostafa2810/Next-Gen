FROM node:20-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine as production

WORKDIR /app

# Copy built assets from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the port the app runs on
EXPOSE 4173

# Command to run the application
CMD ["npm", "run", "preview"] 