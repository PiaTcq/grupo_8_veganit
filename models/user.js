const fs= require("fs")
const { usuario } = require("../database/models");

const User = {
    /*fileName: "./data/usuarios.json",*/
 
    /*getData: function(){
     return JSON.parse(fs.readFileSync(this.fileName, "utf-8"))
    },*/


    findAll: /*function(){
        return this.getData();
    },*/ async function () {
    try {
    const allUsers = await usuario.findAll(); 
    return allUsers;
  } catch (error) {
    throw error;
  }
},
findByField: async function (field, text) {
    try {
      const userFound = await usuario.findOne({ where: { [field]: text } }); 
      return userFound;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User; 