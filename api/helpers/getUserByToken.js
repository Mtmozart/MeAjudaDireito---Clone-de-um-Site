const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const User = require('../models/User')

const getUserByToken =  async (token) => {
  if (!token) return res.status(401).json({ error: "Acesso negado!!!!!!!!!!!!!!!!!!!!!!!!!" });

  const decoded = jwt.verify(token, secret);

  const userId = decoded.id;
 
 const user = await User.findOne({where: {id: userId}})

  return user;
};

module.exports = getUserByToken;