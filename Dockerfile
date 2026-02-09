FROM node:24-alpine

WORKDIR /app

# Copiamos package.json y lock
COPY package.json package-lock.json ./


# Instala TODAS las dependencias (prod + dev)
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Compila TypeScript
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
