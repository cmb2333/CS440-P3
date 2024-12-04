# Use Node.js image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install express mongoose

# Copy the rest of the application files
COPY . .

# Expose port 3001 for Quiz Management Service
EXPOSE 3001

# Start the Quiz Management Service
CMD ["node", "index.js"]
