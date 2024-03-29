const jwt = require('jsonwebtoken');        // importation du paquet jwt

module.exports = (req, res, next) => {
    try {                                                                               // on utilise try/catch car plusieurs éléments peuvent poser problème
        const token = req.headers.authorization.split(' ')[1];                          // on récupère uniquement le token du header de la requête
        const decodedToken = jwt.verify(token, 'd:6u,Q2n3CB3AqX9=si[$8{qBt34>Q');       // on décode le token avec la fonction verify qui prend le token et la clé secrète
        const userId = decodedToken.userId;                                             // on récupère le userId du token décodé
        if (req.body.userId && req.body.userId !== userId) {                            // si on optient bien un userId et que celui-ci est différent du userId
            throw 'User ID non valable';                                                // on renvoi l'erreur
        } else {
            next();                                                                     // sinon on appelle next car la validation est un succès
        }
    } catch {
    res.status(401).json({error: error | 'Requête non authentifiée !'});                // si une erreur est reçu on l'affiche, sinon on affiche le message personnalisé
    }
};