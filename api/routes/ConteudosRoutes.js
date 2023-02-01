const router = require("express").Router();
const ConteudosController = require("../controllers/ConteudosController");
const verifyToken = require("../helpers/checkToken");
const { documentUpload } = require("../helpers/documentUpload")


router.get('/conteudos', ConteudosController.allContents)
router.post('/criarconteudo',verifyToken, ConteudosController.saveContent, documentUpload.single("document"))
router.get('/checkconteudo/:id', ConteudosController.checkConteudo)
router.patch('/editar/:id', verifyToken, ConteudosController.updateContent, documentUpload.single("document"),)
router.delete('/remove/:id', verifyToken, ConteudosController.removeContent)
router.get('/conteudos/:category', ConteudosController.findAllCategory)



module.exports = router