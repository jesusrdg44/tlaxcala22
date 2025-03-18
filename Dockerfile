# Usa Node.js como base
FROM node:20.17-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Instala dependencias generales
RUN apk add --no-cache git

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install --legacy-peer-deps

# Copia todo el código del proyecto
COPY . .

# 🔹 Construcción del Frontend
RUN npm run build

# 🔹 Configuración del Backend
WORKDIR /app/src/backend
RUN npm install --legacy-peer-deps

# Exponer puertos
EXPOSE 3000 5000

# Instalar PM2 y `serve` globalmente
RUN npm install -g pm2 serve

# Establecer la resolución DNS manualmente (opcional)
ENV NODE_OPTIONS="--dns-result-order=ipv4first"

# Definir el script de ejecución con pm2

CMD ["npx", "serve", "-s", "/app/build", "-l", "3000"]

