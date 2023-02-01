const Cursos = require('../models/Cursos')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const getToken = require('../helpers/getToken')
const getUserByToken = require('../helpers/getUserByToken')
const removeImage = require('../helpers/removeImages')
require("dotenv").config();
const secret = process.env.SECRET;


module.exports = class CursosController {
    static async allContents(req, res){
        const cursos = await Cursos.findAll({attributes: {exclude: [ 'createdAt', 'updatedAt', ] }})
        res.status(202).json({ cursos: cursos})
      }

      static async saveContent(req, res){
       const {name, author, description, price, platform, category, link} = req.body
        
       let image = ""
       if(req.file){
            image = req.file.filename
        }          
         
       if(!name){
         res.status(422).json({ message: ' É obrigatório o uso do título.' })
         return
     }
     if(!author){
        res.status(422).json({ message: 'É obrigatório dizer o nome do autor.' })
        return
    }
     if(!description){
         res.status(422).json({ message: 'A descrição é obrigatória.' })
         return
     }
     if(!price){
        res.status(422).json({ message: 'É obrigatório dizer o valor' })
        return
    }
    if(!platform){
        res.status(422).json({ message: ' É obrigatório dizer a plataforma do curso' })
        return
    }
    if(!category){
        res.status(422).json({ message: 'É obrigatório dize a categoria.' })
        return
      }
      if(!link){
        res.status(422).json({ message: 'É obrigatório dizer o link.' })
        return
    
    }
     if(image.length === 0 ){
        res.status(422).json({ message: 'é obrigatório o envio  da imagem' })
        return
     }
 
     const token = getToken(req)
     const user = getUserByToken(token)
      
    let userId = await User.findOne({ where: { id: user.id}, attributes: {exclude: ['password']}}) 
         const curso = new Cursos ({
        
         name,
         author,
         description,
         price,
         platform,
         category,
         link,
         image,
         UserId: userId.id,
                              
        })
        try {
             const newCurso = await curso.save()
              console.log(curso)
             res.status(202).json({message: 'O conteúdo foi salvo com sucesso.'})
            
        } catch (error) {
             console.log(error)
             res.status(402).json({message: 'Falha ao salvar o conteúdo.'})
        }
     }
     static async checkContent(req, res){
        const id = req.params.id
        const curso = await Cursos.findOne({ where: {id: id}})

        if(!curso){
            res.status(404).json({ message: 'Conteúdo não encontrado' })
            return
     }
        res.status(200).json({
            curso: curso,
        })
    }

     static async checkCategory(req, res){

        const category = req.params.category
        const conteudoId = await Cursos.findAll({ where: {category: category}, attributes: {exclude: [ 'id', 'createdAt', 'updatedAt', 'UserId'] }})

        if(!conteudoId){
            res.status(404).json({ message: 'Conteúdo não encontrado' })
            return
     }
        res.status(200).json({
            conteudoId: conteudoId,
        })
    }
static async updateContent(req, res){
    const id = req.params.id
    let name = req.body.name
    let author = req.body.author
    let description = req.body.description
    let price = req.body.price
    let platform = req.body.platform
    let category = req.body.category
    let link = req.body.link
    let image = ""
    let updateData = {}

    
     if(req.file){
          image = req.file.filename
      } 
    
    const curso = await Cursos.findOne({ where: {id: id}})
    if(!curso){
        res.status(404).json({ message: 'O conteúdo não foi encontrado' })
        return
    } 

    const token = getToken(req)
    const user = await getUserByToken(token) 
         
  if(user.id != curso.UserId){
    res.status(404).json({ message: 'Houve um problema na solitiação, tente novamente mais tarde' })
    return
   } 
    
   if(!name){
    res.status(422).json({ message: ' É obrigatório o nome do curso.' })
    return
}
if(!author){
   res.status(422).json({ message: 'É obrigatório dizer o nome do autor.' })
   return
}
if(!description){
    res.status(422).json({ message: 'A descrição é obrigatória.' })
    return
}
if(!price){
   res.status(422).json({ message: 'É obrigatório dizer o valor' })
   return
}
if(!platform){
   res.status(422).json({ message: ' É obrigatório dizer a plataforma do curso' })
   return
}
if(!category){
   res.status(422).json({ message: 'É obrigatório dizer a categoria.' })
   return
  }
  if(!link){
    res.status(422).json({ message: 'É obrigatório colocar o link.' })
    return
   }
 if(image.length > 0){
   curso.image = image
 } 

 const DataCursos = {
    name,
    author,
    description,
    price,
    platform,
    category,
    link,
    image: curso.image,
    UserId: user.id,
 }


try {
     
    const updatedData = await Cursos.update(DataCursos, {where: {id: id}})
     res.json({
      message: 'Conteúdo atualizado com sucesso!',
            
    })
        
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar' })
    console.log(error)
  }       
    }
        static async removeContent(req, res){
            const id = req.params.id
            const contentId = await Cursos.findOne({ where: {id: id}})
            
            if(!contentId){
                res.status(404).json({ message: 'Conteúdo não encontrado' })
                return
            } 
           
                         const token = getToken(req)
                const user = await getUserByToken(token) 
                    
            if(user.id != contentId.UserId){
                res.status(404).json({ message: 'Houve um problema na solitiação, tente novamente mais tarde' })
                return
            } 
            const imageName = contentId.image
            const folder = "images"
        

                try {
                await Cursos.destroy({where: { id: id }})
                await removeImage(folder, imageName)
                res.status(202).json({message: 'Conteúdo removido com sucesso'})
                return
                 
                }catch (error) {
                res.status(500).json({message: "erro ao remover"})
                console.log(error)
                return
            }   
          }
}