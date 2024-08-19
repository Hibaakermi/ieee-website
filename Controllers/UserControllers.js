const User = require('../Models/UserModels'); // Modèle utilisateur
const bcrypt = require('bcryptjs'); //hachage des mdp
const jwt = require('jsonwebtoken'); // Pour générer des jetons JWT
const dotenv=require( 'dotenv')
dotenv.config();



const register = async (req, res) => {
    console.log("Erreur 2");
    const { username, password, email, role } = req.body;
    console.log("Erreur 5");
    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log("Erreur 3");
        const user = new User({ username, password: hashedPassword, email, role });
        console.log("Erreur4");
        await user.save();
        res.status(201).send({ message: "Utilisateur enregistré avec succès"});
    } catch (error) {

        console.error("Erreur lors de l'enregistrement:", error);
        res.status(400).send({ error: "Erreur lors de l'enregistrement de l'utilisateur"});
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ error: "Utilisateur non trouvé"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: "Mot de passe incorrect"});
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la connexion"});
    }
};


const logout = (req, res) => {
    res.send({ message: 'Déconnexion réussie' });
};




const updateProfile = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'role'];

    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Mise à jour non valide' });
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ error: 'Utilisateur non trouvé' });
        }

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send({ error: 'Erreur lors de la mise à jour du profil' });
    }
};

module.exports = {
    register,
    login,
   logout,
    updateProfile,
};