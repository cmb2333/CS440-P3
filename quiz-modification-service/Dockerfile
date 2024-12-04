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

# Expose port 3003 for Quiz Modification Service
EXPOSE 3003

# Start the Quiz Modification Service
CMD ["node", "index.js"]
