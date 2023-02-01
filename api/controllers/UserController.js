const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const getUserByToken = require('../helpers/getUserByToken.js')
const createUserToken = require('../helpers/createUserToken')
const getToken = require('../helpers/getToken')
require('dotenv/config');  

module.exports = class UserController {
  static async login(req, res){
    const {email, password} = req.body

    if(!email){
      res.status(422).json({ message: 'Preencha o campo do e-mail' })
      return
    }
    if(!password){
      res.status(422).json({ message: 'Preencha o campo da senha' })
      return
    }
    const user = await User.findOne({ where: { email: email } })

    if(!user){
      res.status(422).json({ message: 'O email informado não está cadastrado' })
      return
    }
    const passwordMatch = bcrypt.compareSync(password, user.password)

  if (!passwordMatch) {
    res.status(422).json({ message: 'Senha inválida' })
    return
     }

     await createUserToken(user, req, res)

  }
    static async register (req, res){
        const {name, email, cpf, password, confirmpassword} = req.body

       if(!name){
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório!' })
            return
          }
          if (!cpf) {
            res.status(422).json({ message: 'O CPF é obrigatório' })
            return
          } 
          const myCpf = process.env.CPF;
          if(cpf !== myCpf){
            res.status(422).json({ message: 'O CPF é inválido para usuário' })
            return
          } 
       if(!password){
        res.status(422).json({ message: 'A senha é obrigatória!' })
        return
       }   else if(password.length < 7 ){
        res.status(422).json({ message: 'A senha é fraca!' })
        return
       }      
       if (!confirmpassword) {
        res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
        return
      }
      if(password != confirmpassword){
      res.status(422).json({ message: 'A senha e a confirmação de senha estão diferentes!' })
      return
      }
      const checkAmoutUser = await User.count({})
      if (checkAmoutUser === 1){
        res.status(422).json({ message: 'Limite de usuarios atingido'})
      return
      }
     
      const checkIfUserExists = await User.findOne({ where: { email: email } })
      if(checkIfUserExists){
        res.status(422).json({ message: 'E-mail já cadastrado' })
        return
      }
      
      const salt = await bcrypt.genSaltSync(12)
      const hashedPassword = bcrypt.hashSync(password, salt)
    
     const user = new User({
      name: name,
      email: email,
      cpf: cpf,
      password: hashedPassword,
    })
   
    try {
      const newUser = await user.save()

      await createUserToken(newUser, req, res)
    } catch (error) {
      res.status(500).json({ message: error })
    }
    }

    static async checkUser(req, res){
      let currentUser
      
      if(req.headers.authorization){
          const token = getToken(req)
          const secret = process.env.SECRET
          const decoded = jwt.verify(token, secret)
          currentUser = await User.findOne({ where: { id: decoded.id } })
           
        
           currentUser.password = undefined
          } else {
            currentUser = null
          }
      
          res.status(200).send(currentUser)
        }


    static async getUserById(req, res){
   
      const id = req.params.id

      const user = await User.findOne({ where: {id: id}, attributes: {exclude: ['password']} })
    
      if (!user) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return      }
      
      res.status(200).json({ user })
    }
     
    static async editUser(req, res){
      const token = getToken(req)
      const user = await getUserByToken(token)
      const id = req.params.id
      let {name, email, password, confirmpassword} = req.body
      if(!name){
        res.status(422).json({ message: 'O nome é obrigatório!' })
        return
    }

    if (!email) {
        res.status(422).json({ message: 'O e-mail é obrigatório!' })
        return
      }
    
  if(!password){
    res.status(422).json({ message: 'A senha é obrigatória!' })
    return
   }   else if(password.length < 7 ){
    res.status(422).json({ message: 'A senha é fraca!' })
    return
   }
        
   if (!confirmpassword) {
    res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
    return
  }
  if(password != confirmpassword){
  res.status(422).json({ message: 'A senha e a confirmação de senha estão diferentes!' })
  return
  } else if (password == confirmpassword && password != null) {
  
    const salt = await bcrypt.genSaltSync(12)
   const reqPassword = req.body.password
   const passwordHash= bcrypt.hashSync(reqPassword, salt)
   password = passwordHash

   
  }
 
  const dataUser = {
   name: name,
   email: email,
   password: password,
  
 }  
  try {
    
    const updatedUser = await User.update(dataUser, {where: {id: id}}
    ) 
    res.json({
      message: 'Usuário atualizado com sucesso!',
            
    })
    console.log(updatedUser)
    
 
  } catch (error) {
    res.status(500).json({ message: 'deu ruim' })
    console.log(error)
  }
  

    }
}