const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    role: {type: String, required: false, trim: true, default: 'user'},
    // pendiente de rellenar con algun campo que se quiera añadir
},
{
    timestamps:true
})

const User = mongoose.model('user', userSchema);
module.exports = User;
