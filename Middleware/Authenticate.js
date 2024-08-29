const bcrypt = require('bcryptjs');
const User = require("../Models/UserModels");


const hashedPassword = async (req, res, next) =>{
    if (!req.body.password) 
    return next();

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    next();
};


module.exports = hashedPassword;