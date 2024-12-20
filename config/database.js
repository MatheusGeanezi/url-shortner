"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("url_shortener", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
});
sequelize
    .authenticate()
    .then(() => {
    console.log("Conexão com o banco de dados bem-sucedida!");
})
    .catch((error) => {
    console.error("Não foi possível conectar ao banco de dados:", error);
});
exports.default = sequelize;
