  const jwt = require('jsonwebtoken')
    require("dotenv").config();
    const secret = process.env.SECRET;

const createUserToken = async (user, req, res) => {
const token = await jwt.sign(

    {
      name: user.name,
      id: user.id,
    },
    secret
  );
try {

  res.status(200).json({
  message: "Você está autenticado!",
  token: token,
  userId: user.id,

})} catch (err) {
console.log(err)
res.status(400).json({ err: err });
}


};

module.exports = createUserToken;							