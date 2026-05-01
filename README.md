CarRent Fullstack Application
Application mobile de location de voiture avec recommendation intelligente basée sur un quiz (Budget, Ville, Marque, etc.).

🏗️ Architecture du Projet
Ce projet est divisé en deux parties principales :

frontend : Application mobile React Native (Expo)
backend : API RESTful Node.js (Express) + MongoDB
✨ Fonctionnalités
Authentification : Inscription et Connexion utilisateur (JWT).
Onboarding & Quiz : Série de questions pour affiner la recherche de véhicule.
Recommandation : Algorithme de matching (Score) pour suggérer les meilleures voitures.
Catalogue : Liste des voitures avec filtres et recherche.
Carte : Visualisation des agences/voitures sur une carte.
Réservation : Processus de booking et confirmation.
Profil : Gestion du compte et historique des réservations.
🛠️ Stack Technique
Frontend : React Native, Expo, React Navigation, Context API.
Backend : Node.js, Express.js.
Base de données : MongoDB (Mongoose).
Auth : JSON Web Token (JWT), bcryptjs.
🚀 Démarrage Rapide
Prérequis
Node.js (v14 ou supérieur)
MongoDB (local ou Atlas)
Expo CLI (npm install -g expo-cli)
Installation du Backend
Naviguez vers le dossier backend :
cd backend
Installez les dépendances :
bash

npm install
Configurez les variables d'environnement :
Créez un fichier .env dans le dossier backend/ :
env

PORT=3000
MONGO_URI=votre_uri_mongo_ici
JWT_SECRET=votre_secret_jwt_ici
Lancez le serveur :
bash

npm run dev

# ou node server.js

L'API sera disponible sur http://localhost:3000.
Installation du Frontend
Naviguez vers le dossier frontend :
bash

cd frontend
Installez les dépendances :
bash

npm install
Lancez l'application Expo :
bash

npm start

# ou expo start

Scannez le QR code avec l'application Expo Go sur votre mobile.
📦 Structure des Dossiers
Voir le fichier tree à la racine du projet pour le détail complet de l'organisation des fichiers.

📝 Endpoints API Principaux
POST /api/auth/register - Créer un utilisateur
POST /api/auth/login - Connexion
GET /api/cars - Lister les voitures
POST /api/quiz/submit - Soumettre les réponses et obtenir des recommandations
POST /api/booking - Créer une réservation
