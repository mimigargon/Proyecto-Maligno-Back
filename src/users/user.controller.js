const User = require("../users/user.model"); //Importo el modelo User para utilizarlo en diferentes funciones

const getAllUsers = async (req, res, next) => { //Defino funcion que devuelve todos los usuarios en json
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);
    }catch(error){
        return next (error);
    }
};

const getUser = async (req, res ,next) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id).populate('username');
        if(!user){
            const error = new Error("No user found by this id");
            error.status= 404;
            return next(error);
        }
        return res.status(200).json(user);
    }catch(error){
        return next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try{
        const {id} = req.params;
        const userDB = await User.findByIdAndDelete(id);
        if(!userDB){
            const error = new Error("No user found by this id");
            error.status = 404;
            return next(error)
        }
        return res.status(200).json(userDB);
    }catch (error) {
        return next(error);
    }
}

const postUser = async (req, res, next) => {
    const {username, password} = req.body;

    if(!username || !password) {
        const error = new Error('Email or password is missing');
        error.status = 400;
        return next(error);
    }

    const done = (error, user) => {
        if (error) {
            return next(error);
        }

        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }

            return res.status(201).json(user);
        });
    };

    passport.authenticate('user', done)(req);
};

module.exports = {getAllUsers, getUser, deleteUser, postUser}; //Exportamos las funciones