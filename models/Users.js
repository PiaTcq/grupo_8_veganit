
const fs = require('fs');

const User = {
    fileName: './data/usuarios.json',

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function (id) {
        let allUsers =  this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id == id);
        return userFound
    },

    findByCualquierCampo: function (campo, text) {
        let allUsers =  this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[campo] == text);
        return userFound
    },

    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(userData);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id );
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true
    }
}

module.exports = User;

// para corroborar en la terminal
// console.log(User.getData())
// console.log(User.findByPk(4))
// console.log(User.findByCualquierCampo('email', 'n@outlook.es'));
//console.log(User.create({ name: 'Juana', email: 'juana@gmail.com'}));