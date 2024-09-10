const router = require('express').Router();

const verifyToken = require('../Middleware/Authenticate');
const userController = require('../Controllers/UserControllers');



//router.post('/user/userController', userController.register);

router.post('/register', verifyToken, userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.put('/updateProfile/:id', userController.updateProfile);
router.post('/sendMessage', userController.sendMessage);
router.get('/viewMessages/', userController.viewMessages);


module.exports=router;