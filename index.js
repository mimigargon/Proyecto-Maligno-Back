const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const UsersRoutes = require('./src/users/user.routes');

// bbdd pendiente de crear
const {connectDb} = require('./src/utils/database/database');

const PORT = process.env.PORT || 8080;

const app = express();
connectDb();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE'); //Definimos los metodos que permitimos para nuestra API
    res.header('Access-Control-Allow-Credentials', 'true'); //Decimos que permitos la conexion con credenciales(cookies, autenticacion, etc)
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(cors({   //Definimos las rutas para las que damos permiso a acceder a nuestra API, para que no la bloquee el CORS
    origin: ['https://localhost:3000' ],    //aqui pondremos la url de nuestra pagina una vez se haga deploy
    credentials: true,
}))

app.use(express.json({
    limit: '5mb'            //Limitamos el tamaño máximo de nuestra petición
}))

app.use(express.urlencoded({limit: '5mb', extended: true}))  //Se asegura que lo que recibas sean urls con clave--valor(ej: name:Pepe, apellido:perez)


//falta crear las rutas de users  y el controlador
app.use('/users', UsersRoutes);



app.use('/', ( _ , res) => {
    return res.status(200).json("users api working");
})

app.use('*', ( _ , res, xy ) => {              //Para las rutas que no estén definidas muestranos un Route not found
    return res.status(404).json('Route not found');
});

app.use((error, _ , res, xy)=>{              //Para cualquier error que suceda en la aplicación
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.listen(PORT, ()=>{
    console.log(`listening in http://localhost:${PORT}`);
});