const express = require('express');
const conn = require("./db/conn");
const cors = require('cors');
const Curso = require("./models/Cursos") 
const User = require("./models/User")
const Content = require("./models/Content");
const Category = require ("./models/Category");
require('dotenv/config');  
const port = process.env.PORT
const nossosecret = process.env.SECRET

const app = express();


app.get('/:path*', (req,res, next) => {
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Origin", "https://www.meajudadireito.com.br/")  
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-PINGOTHER, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Date, X-Api-Version, Authorization")
  res.header("Access-Control-Expose-Headers", "x-access-token, authorization"); 
  app.use(cors());
  next();
  });

app.use(express.json())


const UserRoutes = require('./routes/UserRoutes');
const CursosRoutes = require("./routes/CursosRoutes")
const ConteudosRoutes = require("./routes/ConteudosRoutes")
const CategoriaRoutes = require("./routes/CategoryRoutes")



app.use(express.static('public'))
app.use('/users', UserRoutes)
app.use('/cursos', CursosRoutes)
app.use('/materias', ConteudosRoutes)
app.use('/categorias', CategoriaRoutes)



conn
.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`))

  .then(() => {
    app.listen(port, () => console.log(`Servidor subiu com sucesso`));
 })

.catch((err) =>  console.log("O erro tá aqui: " + err));
	