const multer = require('multer')
const path = require("path")



const documentStorage = multer.diskStorage({
    destination: function(req, file, cb){

        let folder = ""
        
        if(req.baseUrl.includes("cursos")) {
            folder = "images"
        } 


    cb(null, `public/${folder}`)

    },
    filename: function(req, file, cb){
         
          cb(null, Date.now() + String(Math.floor(Math.random() * 100 )) + path.extname(file.originalname));
        
    }
});

const imageUpload = multer({
    storage: documentStorage,
    fileFilter(req, file, cb) {
      

    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
           
            return cb(new Error('São aceitas somente as imagens em com extensão JPEG, JPG e PNG.'), false);
           
        }
        cb(null, true)
     
        
       
    },
  
})

module.exports = {imageUpload}