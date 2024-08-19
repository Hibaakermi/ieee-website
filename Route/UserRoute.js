const router = require("express").Router();

const userController = require('../Controllers/UserControllers');
const hashPassword = require('../Middleware/Authenticate')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.put('/updateProfile/:userId', userController.updateProfile);
//router.post('/sendMessage', UserControllers.sendMessage);
//router.get('/viewMessages/:userId', UserControllers.viewMessages);

module.exports=router