const fs = require("fs")

let imageName = ""
let folder = ""

const removeImage = (folder, imageName) => {
    fs.unlink(`public/${folder}/${imageName}`, function(err){
        if(err){
            return  console.log(err)
        }  
        else{
            return
        }  
    })
}

 
   

module.exports = removeImage;