# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

RUN npm install mysql2 --force

RUN npm install cors --force

RUN npm install bcrypt --force

RUN npm install multer --force

RUN npm install express --force

RUN npm install path --force
RUN npm install fs --force

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "server.js"]
