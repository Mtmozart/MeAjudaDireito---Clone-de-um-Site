const Contents = require('../models/Content')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Category = require("../models/Category")
const getToken = require('../helpers/getToken')
const getUserByToken = require('../helpers/getUserByToken')
const removeDocument = require('../helpers/removeDocument')
require("dotenv").config();
const secret = process.env.SECRET;

module.exports = class ConteudosController{
    static async allContents(req, res){
        const conteudos = await Contents.findAll({attributes: {exclude: ['createdAt', 'updatedAt', 'UserId'] }})
        res.status(202).json({conteudos: conteudos})
    }
    static async saveContent(req, res){
        
       
       const {title, description, category} = req.body
       console.log(req)
      
         
        let document = ""
        if(req.file){
             document = req.file.filename
         }          
    
      if(!title){
      res.status(422).json({ message: 'O título é obrigatório ' })
      return
      }
  
      if(!description){
     res.status(422).json({ message: 'A descrição é obrigatória' })
      return
      }
 
     if(!category){
     res.status(422).json({ message: 'A categoria é obrigatória.' })
     return
     } 
     const category_true = await Category.findOne({where: {title: category}})

     if(!category_true){
       res.status(422).json({message: "Insira uma categoria válida"})
     }  

      if(document.length === 0 ){
         res.status(422).json({ message: 'é obrigatório o envio do PDF' })
         return
      }
     
       const token = getToken(req)
       const user = await getUserByToken(token)
          const content = new Contents ({
         
          title,
          description,
          category,
          document,
          UserId: user.id
                                        
         })
         try {
              const newContent = await content.save()
              res.status(202).json({message: 'O conteúdo foi salvo com sucesso'})
                        
         } catch (error) {
              console.log( "Esse aqui é o erro: "+ error)
              res.status(402).json({message: 'O conteúdo deu errado, pensa aí porra'})
         }
      }
     static async checkConteudo(req, res){
        const id = req.params.id
        const content = await Contents.findOne({ where: {id: id}})

        if(!content){
            res.status(404).json({ message: 'Conteúdo não encontrado' })
            return
     }
        res.status(200).json({
            content: content,
        })
    }
    static async updateContent(req, res){
        const id = req.params.id
        let title = req.body.title
        let description = req.body.description
        let category = req.body.category
        let document = ""
        let updateData = {}
    
        
         if(req.file){
              document = req.file.filename
          } 
        const content = await Contents.findOne({ where: {id: id}})
                  
        if(!content){
            res.status(404).json({ message: 'O conteúdo não foi encontrado' })
            return
        } 
        const token = getToken(req)
        const user = await getUserByToken(token) 
             
      if(user.id != content.UserId){
        res.status(404).json({ message: 'Houve um problema na solitiação, tente novamente mais tarde' })
        return
       } 
        
       if(!title){
          res.status(422).json({ message: 'O título é obrigatório ' })
          return
      }  
      if(!description){
          res.status(422).json({ message: 'A descrição é obrigatória' })
          return
      }
    
      if(!category){
        res.status(422).json({ message: 'A  categoria é obrigatória.' })
        return
        } 
    if(document.length > 0){
      content.document = document
    } 
    
     const DataContent = {
        title,
        description,
        category,
        document: content.document,
        UserId: user.id
    }
    
    try {
      
        const updatedData = await Contents.update(DataContent, {where: {id: id}})
        res.json({
         message: 'Conteúdo atualizado com sucesso!',
         })
            
      } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar' })
        
      }        
        }

 static async removeContent(req, res){
    const id = req.params.id
    const contentId = await Contents.findOne({ where: {id: id}})
    
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
    const documentName = contentId.document
    const folder = "contents"
        try {
        await Contents.destroy({where: { id: id }})
        await removeDocument(folder, documentName)
        res.status(202).json({message: 'Conteúdo removido com sucesso'})
        return
         
        }catch (error) {
        res.status(500).json({message: "erro ao remover"})
        console.log(error)
        return
    }   
  }

  static async findAllCategory(req, res){
    const category = req.params.category
    const categories = await Contents.findAll({where: {category: category}})

    if(categories.length === 0){
      res.status(404).json({ message: 'Conteúdo não encontrado' })
      return
}
  res.status(200).json({
      categories: categories,
  })
}
}