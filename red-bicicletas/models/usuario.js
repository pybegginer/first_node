var mongoose = require('mongoose');
var Reserva = require('./reserva');
const bcrypt = require('bcrypt');
const saltRounds = 10;



var Schema = mongoose.Schema;
//validate email from users:

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}


//create a model for users which contains a name and its reserved bycicles

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    mail: {
        type: String,
        trim: true,
        required: [true, 'El mail es obligatorio'],
        lowercase: true,
        validate: [validateEmail, 'Por favor ingrese un email válido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password = {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordRestTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

//Encriptar los password para que se guarden de manera segura en la base de datos
usuarioSchema.pre('save', function(next){
    if (this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});


usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva = new Reserva({
        usuario:this._id,
        bicicleta: biciId,
        desde: desde,
        hasta: hasta,
    });
    console.log(reserva);
    reserva.save(cb);
}

//Exports

module.exports = mongoose.model('Usuario', usuarioSchema)