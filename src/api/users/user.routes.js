const express = require('express');
const { getAllUsers, getUser, deleteUser, postRegister, postLogin, postLogout, putUser } = require('./user.controller');
const {isAuthenticated} = require('../../utils/middlewares/auth.middlewares');

const UsersRoutes = express.Router();


//Podemos usar la misma ruta para distintos metodos, tanto POST, PUT, DELETE, GET pueden usar la misma ruta dado que son metodos distintos
UsersRoutes
    .get('/', getAllUsers)
    .get('/:id', getUser)
    .delete('/:id', deleteUser)
    .put('/:id', putUser)
    .post('/register', postRegister)
    .post('/login', postLogin)
    .post('/logout', [isAuthenticated], postLogout);

// por ahora solo se contempla la opcion de obtener user/s y borrarlos

module.exports = UsersRoutes;