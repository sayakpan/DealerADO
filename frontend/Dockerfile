# Use Node.js 22 base image
FROM node:22.12.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js project
RUN npm run build

# Expose the port that the Next.js app runs on (default 3000)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
