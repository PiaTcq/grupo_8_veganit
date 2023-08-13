const {validationResult} = require('express-validator');
const Users = require('../models/Users');
const path = require("path");


const usersController = {
    register: (req, res) => {
        return res.render('userRegisterForm');
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('userRegisterForm', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        Users.create(req.body);
        return res.send('Ok, se guardó el usuario')
    },
    login: (req, res) => {
        return res.render('userLoginForm');
    },
    profiles: (req, res) => {
        return res.render('userProfile');
    }

}

module.exports = usersController;