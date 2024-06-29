#FROM node:lts-buster

#RUN apt-get update && \
#  apt-get install -y \
#  ffmpeg \
#  imagemagick \
#  webp && \
#  apt-get upgrade -y && \
#  npm i pm2 -g && \
# rm -rf /var/lib/apt/lists/*
  
#RUN git clone https://github.com/FaouzKK/zokou-french-version-whatsapp-bot  /root/my_app
#WORKDIR /root/my_app/


#COPY package.json .
#run npm install -g npm@10.2.4
#RUN npm install pm2 -g
#RUN npm install --legacy-peer-deps

#COPY . .

#EXPOSE 8000

#CMD ["npm","run","clever"]


# Utiliser une image de base officielle de Node.js
FROM node:lts-buster

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le fichier package.json et package-lock.json
COPY package.json .

# Installer les dépendances
#run yarn install -g npm@10.2.4
#RUN yarn install pm2 -g
#RUN ninstall --legacy-peer-deps


# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application tourne
EXPOSE 5000

# Commande pour lancer l'application
CMD ["node","index.js"]

