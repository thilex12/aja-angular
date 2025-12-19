# WhatTime - Application d'Administration Angular

Application web d'administration pour la gestion d'événements, développée avec Angular 21 et Angular Material.

## 📋 Description

WhatTime Admin est une interface d'administration permettant de gérer :
- **Événements** : Création, modification, archivage et suppression d'événements
- **Utilisateurs** : Gestion des comptes utilisateurs
- **Tags** : Création et gestion des catégories/tags
- **Localisations** : Gestion des lieux pour les événements

## 🚀 Technologies

- **Angular 21** - Framework front-end
- **Angular Material** - Composants UI Material Design
- **RxJS** - Programmation réactive
- **TypeScript 5.9** - Langage typé
- **Vitest** - Framework de tests

## 📦 Installation

### Prérequis
- Node.js 18+
- npm 11+

### Installation des dépendances

```bash
npm install
```

## 🔧 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm start` | Démarre le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm run watch` | Compile en mode watch (développement) |
| `npm test` | Lance les tests unitaires |

## 🏗️ Structure du projet

```
src/
├── app/                    # Configuration principale
│   ├── app.routes.ts       # Routes de l'application
│   ├── app.config.ts       # Configuration Angular
│   └── auth-interceptor.ts # Intercepteur HTTP pour l'authentification
├── components/             # Composants de l'application
│   ├── login-page/         # Page de connexion
│   ├── home-page/          # Page d'accueil
│   ├── events-page/        # Gestion des événements
│   ├── event-dialog/       # Dialog de création d'événement
│   ├── update-event/       # Dialog de modification d'événement
│   ├── tags-page/          # Gestion des tags
│   ├── users-page/         # Gestion des utilisateurs
│   ├── localisations-page/ # Gestion des localisations
│   ├── layout/             # Layout principal avec navigation
│   └── not-found-page/     # Page 404
├── services/               # Services Angular
│   ├── what-time-api.ts    # Service API principal
│   ├── api-call-service.ts # Service d'appels HTTP
│   └── auth-service.ts     # Service d'authentification
├── models/                 # Interfaces TypeScript
│   ├── event-details/      # Modèle événement
│   ├── user/               # Modèle utilisateur
│   ├── tag/                # Modèle tag
│   └── localisation/       # Modèle localisation
├── guards/                 # Guards de route
│   └── auth-guard.ts       # Protection des routes (admin)
└── environments/           # Configuration d'environnement
```

## 🔐 Authentification

L'application nécessite un compte **administrateur** pour accéder aux fonctionnalités.

- Les credentials sont stockés dans le `localStorage`
- Un intercepteur HTTP ajoute automatiquement les headers d'authentification
- Les routes sont protégées par un `authGuard`

## 🌐 API Backend

L'application se connecte à l'API : `https://api.thilex.net/v1`

### Endpoints principaux :
- `/admin-events` - Gestion des événements
- `/admin-accounts` - Gestion des utilisateurs
- `/tags` - Gestion des tags
- `/locations` - Gestion des localisations
- `/accounts/me` - Informations de l'utilisateur connecté

## 🐳 Docker

### Build de l'image

```bash
docker build -t whattime-admin .
```

### Lancer le conteneur

```bash
docker run -p 80:80 whattime-admin
```

L'application sera accessible sur `http://localhost`

## 👥 Auteurs
PEYRACHE Arnaud

BAYARD Jean

GUERRIER Alexandre

Projet réalisé dans le cadre du cours Angular - M2 Yncréa

## 📄 Licence

Projet privé - Tous droits réservés
