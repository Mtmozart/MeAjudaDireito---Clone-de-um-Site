const fs = require("fs")

let documentName = ""
let folder = ""

const removeDocument = (folder, documentName) => {
    fs.unlink(`public/documents/${folder}/${documentName}`, function(err){
        if(err){
            return  console.log(err)
        }  
        else{
            return
        }  
    })
}

 
   

module.exports = removeDocument;