const express = require('express');     // importation du paquet express
const mongoose = require('mongoose');       // importation du paquet mongoose
const bodyParser = require('body-parser');      // importation du paquet body-parser
const path = require('path');     // importation du paquet node "path" qui donne accès au chemin du système de fichier

const sauceRoutes = require('./routes/sauce')     // importation du router sauce
const userRoutes = require('./routes/user')     // importation du router user

mongoose.connect('mongodb+srv://ex49rr21:6eNPom3KZfx1WM4v@cluster0.z11un.mongodb.net/bdd_so_pekocko?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();      // Création de l'application express

app.use((req, res, next) => {       // middleware général appliqué à toute les requêtes (CORS)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');      // autorisation d'acceder à notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');        //  autorisation d'utiliser certains headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');        // autorisation d'utiliser certaines méthodes
    next();
});

app.use(bodyParser.json());     // transforme le corps de la requête en objet javascript utilisable

app.use('/images', express.static(path.join(__dirname, 'images')));   // middleware spécifique qui permet de servir le dossier image lors d'une requête spécifique avec l'image

app.use('/api/sauces', sauceRoutes);       // pour cette route la, on utilise le router sauceRoutes
app.use('/api/auth', userRoutes);       // pour cette route la, on utilise le router userRoutes

module.exports = app;       // Exportation de l'application pour y accéder à partir des autres fichiers