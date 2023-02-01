const router = require("express").Router();
const UserController = require("../controllers/UserController");
const verifyToken = require("../helpers/checkToken");

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/user/:id', UserController.getUserById)
router.patch("/edit/:id", verifyToken, UserController.editUser);


module.exports = router