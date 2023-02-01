const router = require("express").Router();
const CursosController = require("../controllers/CursosController");
const verifyToken = require("../helpers/checkToken");
const { imageUpload } = require("../helpers/imagesUpload")


router.get('/conteudos', CursosController.allContents)
router.post('/criarconteudo',verifyToken, CursosController.saveContent, imageUpload.single("image"))
router.get('/checkconteudo/:id', CursosController.checkContent)
router.get('/categorias/:category', CursosController.checkCategory)
router.delete('/remove/:id', verifyToken, CursosController.removeContent)
router.patch('/editar/:id', verifyToken, CursosController.updateContent, imageUpload.single("image"))





module.exports = router