# Use Node.js lightweight image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Expose Vite default dev port
EXPOSE 5173

# Start Vite in dev mode
CMD ["npm", "run", "dev", "--", "--host"]
