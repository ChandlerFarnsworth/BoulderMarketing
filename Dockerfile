FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Create required directories
RUN mkdir -p public/css public/js public/images
RUN mkdir -p views/layouts views/partials

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]