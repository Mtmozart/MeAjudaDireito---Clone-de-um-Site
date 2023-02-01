const Category = require("../models/Category")
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const getToken = require('../helpers/getToken')
const getUserByToken = require('../helpers/getUserByToken')
require("dotenv").config();
const secret = process.env.SECRET;


module.exports = class CategoryController{
    static async allCategorys(req, res){
        const categorias = await Category.findAll({attributes: {exclude: ['createdAt', 'updatedAt', 'UserId'] }})
        res.status(202).json({categorias: categorias})
    }
      static async createCategory(req, res){
        const title = req.body.title
            
     if(!title){
      res.status(422).json({ message: 'O título é obrigatório ' })
      return
      }     
  
      const categorySearch = await Category.findAll({attributes: {exclude: ['createdAt', 'updatedAt', 'UserId'] }})

      if(title === categorySearch ){
          res.status(422).json({ message: 'Esta categoria já existi.' })
          return
      }

      const token = getToken(req)
      //const decoded = jwt.verify(token, secret)
    // let user = await User.findOne({ where: { id: decoded.id}, attributes: {exclude: ['password']} }) 
      const user = await getUserByToken(token)
    
          const category = new Category ({
          title,
          UserId: user.id
                           
         })
         try {
              const newCategory= await category.save()
              res.status(202).json({message: 'O conteúdo foi salvo com sucesso'})
           
         } catch (error) {
              console.log( "Esse aqui é o erro: "+ error)
              res.status(402).json({message: 'O conteúdo deu errado, pensa aí porra'})
         }
    }

    static async updateCategory(req, res){
     const id = req.params.id
     let title = req.body.title
     let updateData = ''

     const category = await Category.findOne({ where: {id: id}})

     if(!category){
          res.status(404).json({ message: 'O conteúdo não foi encontrado' })
          return
      } 
      const token = getToken(req)
      const user = await getUserByToken(token) 
           
    if(user.id != category.UserId){
      res.status(404).json({ message: 'Houve um problema na solitiação, tente novamente mais tarde' })
      return
     } 
      
     if(!title){
        res.status(422).json({ message: 'O título é obrigatório ' })
        return
    }  
    const DataContent = {
     title,
     UserId: user.id
 } 
 try {
     const updatedData = await Category.update(DataContent, {where: {id: id}})
     res.json({
      message: 'Categoria atualizada com sucesso!',
      })
         
   } catch (error) {
     res.status(500).json({ message: 'Erro ao atualizar' })
   }   
    }
     static async checkCategory(req, res){
          const id = req.params.id
          const category = await Category.findOne({ where: {id: id}})
  
          if(!category){
              res.status(404).json({ message: 'Conteúdo não encontrado' })
              return
       }
          res.status(200).json({
               category: category,
          })
      }
    static async removeCategory(req, res){

        const id = req.params.id
        const categoryId = await Category.findOne({ where: {id: id}})
        
        if(!categoryId){
            res.status(404).json({ message: 'Conteúdo não encontrado' })
            return
        } 
        const token = getToken(req)
        const user = await getUserByToken(token) 
        if(user.id != categoryId.UserId){
             res.status(404).json({ message: 'Houve um problema na solitiação, tente novamente mais tarde' })
             return
        } 
             try {
             await Category.destroy({where: {id: id }})
             res.status(202).json({message: 'Conteúdo removido com sucesso'})
             return
             
             }catch (error) {
             res.status(500).json({message: "erro ao remover"})
             console.log(error)
             return
        }   
        }

     }
		