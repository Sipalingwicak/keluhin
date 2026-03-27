# Gunakan Node.js versi 20
FROM node:20-alpine

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dulu (untuk cache layer)
COPY package*.json ./

# Install semua dependencies
RUN npm install

# Copy semua source code
COPY . .

# Build TypeScript ke JavaScript
RUN npm run build

# Expose port
EXPOSE 8000

# Jalankan server
CMD ["node", "dist/server.js"]