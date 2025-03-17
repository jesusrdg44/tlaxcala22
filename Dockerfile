# Use official Node.js image as base
FROM node:20.17-alpine

# Set the working directory inside the container
WORKDIR /app

# Instala git
RUN apk add --no-cache git

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps


# Copy the rest of the project files
COPY . .

# Establece la variable de entorno para OpenSSL en el contenedor
ENV NODE_OPTIONS=--openssl-legacy-provider

# Construye la aplicación React para producción
RUN npm run build


# Serve the app using a simple server like serve
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 3000

# Start the server
CMD ["serve", "-s", "build", "-l", "3000"]
