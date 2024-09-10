const User = require('../Models/UserModels'); // Modèle utilisateur
const bcrypt = require('bcryptjs'); //hachage des mdp
const jwt = require('jsonwebtoken'); // Pour générer des jetons JWT
const dotenv=require( 'dotenv')



dotenv.config();

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        // Vérification de l'existence de l'utilisateur
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        //hachage du mdp
        const hashedPassword = await bcrypt.hash(password, 10); // Utilisez 10 pour le coût de hachage

        //création d'un nouvel utilisateur
        const newUser = new User({
            username: username,
            password: hashedPassword,
            email,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




exports.login = async (req, res) => {
    try {
     
        const { username, password } = req.body;


        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            console.log('User not found:', username);
            return res.status(404).json({ message: 'User not found!' });
        
        }

        // Log du mdp haché pour débogage
        console.log('Stored hashed password:', user.password);
        
        // Ajout du log pour le mdp entré
        console.log('Trying to match password:', password); // Cela doit être le mot de passe en clair

        // Comparer le mdp fourni avec le mot de passe haché stocké
        const isValid = await bcrypt.compare(password, user.password);
        console.log('Password match:', isValid);

        if (!isValid) {
            console.log('Password comparison failed for user:', user.username);
            return res.status(401).json({ message: 'Wrong password!' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username}, 
            process.env.JWT_ACCESS_SECRET || "1234!@#%<{*&)", 
            { expiresIn: '1h' });

        return res.json({
            status: true,
            message: "Sign in successful",
            data: user,
            token
        });
    
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Failed to sign in' });
    }
};


exports.updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const id = req.params.id; // Assurez-vous que l'id user est disponible dans req.user

        // Vérification de l'existence de user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Mettre à jour les informations de user
        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: error.message });
    }
};



exports.logout = (_req, res) => {
    return res.json({ message: 'Déconnexion réussie' });

};


exports.sendMessage = async (req, res) => {
    const { recipientId, message } = req.body; 
    if (!recipientId || !message) {
        return res.status(400).json({ message: 'recipientId et message sont requis' });
    }
    return res.json({
        message: 'Message bien envoyé',
        data: {
            recipientId,
            message,
        },
    });
};

const message = require('../Models/UserModels');
exports.viewMessages = async (req, res) => {
   
    const recipientId = req.query.recipientId;
    if (!recipientId) {
        return res.status(400).json({ message: 'recipientId est requis' });
    }
    try{
        const messages = await message.find({ recipientId: recipientId });
    

    return res.json({
        message: 'Messages récupérés avec succès',
        data: messages,
    });
}catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des messages', error: error.message });
}
};


