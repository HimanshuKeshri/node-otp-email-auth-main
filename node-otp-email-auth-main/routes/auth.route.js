const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/', authController.signUpUser);
router.post('/verify', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/createTask', authController.createTask);
router.patch('/update/:id',authController.update);
router.delete('/delete/:id',authController.delete);
router.get('/get/:email',authController.get);
router.get('/getAcc/:email',authController.getAcc);
router.get('/getDec/:email',authController.getDec);

module.exports = router;
