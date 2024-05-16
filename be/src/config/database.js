const {Sequelize} = require("sequelize");

const sequelize = new Sequelize({
    dialect :"postgres",
    host:"localhost",
    port:"5432",
    username:"postgres",
    password:"Shelf4321",
    database:"Ecommerce",
})

module.exports = sequelize;