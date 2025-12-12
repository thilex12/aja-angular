# --- Étape 1 : Build de l'application Angular ---
FROM node:24-alpine AS build

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copie du code source et build
COPY . .
# RUN npm run build --prod
RUN npm run build

# --- Étape 2 : Serveur Nginx pour la prod ---
FROM nginx:alpine

# Copie du build Angular depuis l'étape 1 vers le dossier de Nginx
# ATTENTION : Vérifiez si votre build sort dans dist/nom-projet ou dist/nom-projet/browser (Angular 17+)
COPY --from=build /app/dist/aja-angular/browser /usr/share/nginx/html

# Copie de la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port 80
EXPOSE 80

# Démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]
