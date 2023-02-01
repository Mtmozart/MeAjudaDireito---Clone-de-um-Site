const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const verifyToken = require("../helpers/checkToken");


router.get('/categorias', CategoryController.allCategorys)
router.post('/criar_categoria', verifyToken,CategoryController.createCategory)
router.get('/categoria/:id', CategoryController.checkCategory)
router.patch('/edit/:id',verifyToken, CategoryController.updateCategory)
router.delete('/remove/:id',verifyToken, CategoryController.removeCategory)



module.exports = router