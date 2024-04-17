FROM node

# instalar un simple servidor http para servir nuestro contenido estático
RUN npm install -g http-server

# Instala sudo y nano
RUN apt-get update && apt-get install -y sudo nano

# hacer la carpeta 'app' el directorio de trabajo actual
WORKDIR /app

# copiar 'package.json' y 'package-lock.json' (si están disponibles)
COPY package*.json ./

# instalar dependencias del proyecto
RUN npm install --force

# copiar los archivos y carpetas del proyecto al directorio de trabajo actual (es decir, la carpeta 'app')
COPY . .


# A VECES DA ERROR EL COMPILADO
RUN npm rebuild node-sass

# construir aplicación para producción minificada
RUN npm run build


EXPOSE 5000
CMD ["npm","run","serve"]


#COMANDOS A CORRER
#docker build -t image-vuejs .
#docker run --name container-vuejs -p 5000:8080 -v MY_PC_ROUTE:/app --network mi-red -d image-vuejs
