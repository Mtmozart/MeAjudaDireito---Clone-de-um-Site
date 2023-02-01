const jwt = require("jsonwebtoken");
const getToken = require("./getToken");
require("dotenv").config();
const secret = process.env.SECRET;

const checkToken = (req, res, next) => {

    if(!req.headers.authorization) return res.status(401).json({ message: "Acesso negado porque n�o o tem no cabe�alho!" });
   
    const token = getToken(req)

  if (!token) {
  return res.status(401).json({ message: "Acesso negado porqu� o token n�o � compat�vel"});
  
  
 }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next(); 
  } catch (err) {
    res.status(400).json({ message: "O Token é inválido!" });
  }
};

module.exports = checkToken;