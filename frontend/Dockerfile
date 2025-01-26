FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Start the application
CMD ["serve", "-s", "build", "-l", "3001"]

EXPOSE 3001
