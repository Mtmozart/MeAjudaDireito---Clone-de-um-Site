const { url } = require('inspector');
const multer = require('multer')
const path = require("path")



const documentStorage = multer.diskStorage({
    destination: function(req, file, cb){

        let folder = ""
        
        if(req.baseUrl.includes("materias")) {
            folder = "contents"
        } 

    cb(null, `public/documents/${folder}`)

    },
    filename: function(req, file, cb){
        
          cb(null, Date.now() + String(Math.floor(Math.random() * 100 )) + path.extname(file.originalname));
        
    }
});

const documentUpload = multer({
    storage: documentStorage,
    fileFilter(req, file, cb) {
      

    if(!file.originalname.match(/\.(pdf)$/)){
           
            return cb(new Error('Somente são aceitos arquivos em formato PDF.'), false);
           
        }
        cb(null, true)
     

       
    },
  
})

module.exports = {documentUpload}