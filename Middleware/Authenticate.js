const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const hashedPassword = async (req, res, next) => {
    try {
        if (!req.body.password) {
            return next();
        }

        // Validation du mot de passe (par exemple, longueur minimale)
        if (req.body.password.length < 6) {
            return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères.' });
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        next();
    } catch (error) {
        console.error('Erreur lors du hachage du mot de passe:', error);
        return res.status(500).json({ message: 'Erreur lors du traitement du mot de passe.' });
    }
};

module.exports = hashedPassword;