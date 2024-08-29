const User = require('../Models/UserModels'); // Modèle utilisateur
const bcrypt = require('bcryptjs'); //hachage des mdp
const jwt = require('jsonwebtoken'); // Pour générer des jetons JWT
const dotenv=require( 'dotenv')


dotenv.config();


exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const trimmedPassword = password.trim();

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
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            console.log('Password comparison failed for user:', user.username);
            return res.status(401).json({ message: 'Invalid credentials!' });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token,
            message: "Sign in successful"
        });
    
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Failed to sign in' });
    }
};
