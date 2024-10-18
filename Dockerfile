# Usa la imagen de Node como base
FROM node:16 AS build

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación
RUN yarn build

# Usa una imagen ligera para servir el contenido
FROM nginx:alpine

# Copia los archivos de construcción a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
