const express = require('express');
const { getAllUsers, getUser, deleteUser } = require('./user.controller');

const UsersRoutes = express.Router();


//Podemos usar la misma ruta para distintos metodos, tanto POST, PUT, DELETE, GET pueden usar la misma ruta dado que son metodos distintos
UsersRoutes
    .get('/', getAllUsers)
    .get('/:id', getUser)
    .delete('/:id', deleteUser);

// por ahora solo se contempla la opcion de obtener user/s y borrarlos

module.exports = UsersRoutes;