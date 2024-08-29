const router = require('express').Router();

const hashedPassword = require('../Middleware/Authenticate');
const userController = require('../Controllers/UserControllers');



//router.post('/user/userController', userController.register);

router.post('/register', hashedPassword, userController.register);
router.post('/login', userController.login);
//router.post('/logout', userController.logout);
//router.put('/updateProfile/:userId', userController.updateProfile);
//router.post('/sendMessage', UserControllers.sendMessage);
//router.get('/viewMessages/:userId', UserControllers.viewMessages);

module.exports=router;