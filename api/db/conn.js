const { Sequelize } = require('sequelize');
require('dotenv/config'); 


const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;


const sequelize = new Sequelize( dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
})

try {
  sequelize.authenticate()
  console.log('Conectamos com o Sequelize!')
} catch (error) {
  console.error('erro: ', error)
}

module.exports = sequelize