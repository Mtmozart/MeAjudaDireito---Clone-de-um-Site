const jwt = require("jsonwebtoken");
const getToken = require("./getToken");
require("dotenv").config();
const secret = process.env.SECRET;

const checkToken = (req, res, next) => {

    if(!req.headers.authorization) return res.status(401).json({ message: "Acesso negado porque não o tem no cabeçalho!" });
   
    const token = getToken(req)

  if (!token) {
  return res.status(401).json({ message: "Acesso negado porquê o token não é compatível"});
  
  
 }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next(); 
  } catch (err) {
    res.status(400).json({ message: "O Token Ã© invÃ¡lido!" });
  }
};

module.exports = checkToken;