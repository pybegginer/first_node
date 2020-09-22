//imports
var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;

const Token = require('./token');
const mailer = require('../mailer/mailer');


//create an Schema for MongoDB
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
    email: {
        type: String,
        trim: true,
        required: [true, 'El mail es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor ingrese un email válido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
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
//add unique validator as Plugin
usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ya existe con otro usuario'});

//Encriptar los password para que se guarden de manera segura en la base de datos
usuarioSchema.pre('save', function(next){
    if (this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});
//agregar la comparación de passwords
usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

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

//New Method for Send Email for welcome
usuarioSchema.methods.enviar_email_bienvenida = function(cb) {
    const token = new Token({
        _userId: this.id,
        token: crypto.randomBytes(16).toString('hex')
    });
    const email_destination = this.email;
    token.save(function (err) {
        if (err) {
            return console.log(err.message);
        };
        //create a mail to be send
        const mailOptions = {
            from: 'no-reply@bicicletas.com',
            to: email_destination,
            subject: 'Verificación de la cuenta',
            html: `Hola. \n\n Para verificar su cuenta, por favor haga click aquí: \n <a href=http://localhost:3000/token/confirmation/${token.token}> Confirma tu token </a>. \n`
        };

        mailer.sendMail(mailOptions, function(err){
            if(err) { 
                return console.log(err.message)
            } 
            console.log(`A verification email has been sent to ${email_destination}`); 
        });
    });
}


//New Method to reset password
usuarioSchema.methods.resetPassword = function(cb){
    const token =  new Token({
        _userId: this.id,
        token: crypto.randomBytes(16).toString('hex'),
    });
    const email_destination = this.email;
    token.save(function(err){
        if(err){return cb(err);};
        const mailOptions = {
            from: 'no-reply@mybycycle.com',
            to: email_destination,
            subject: 'Reset password',
            text: 'Hola. \n\nYou have requested a password change to you account. Please click here to reset it: \n' + 
            'http://localhost:3000' + '\/resetPassword\/' + token.token + '.\n'
        };
        //send using mailer
        mailer.sendMail(mailOptions, function(err){
            if(err){return cb(err)};
            console.log('Message sent to ' + email_destination)
        });
        cb(null);
    })



}

usuarioSchema.statics.findOneOrCreateByGoogle = function(condition, callback){
    const self = this;
    console.log(condition);
    console.log(conditions.emails)
    self.findOne({
        $or:[
            {'googleId': condition.id}, {'email': condition.emails[0].value}
        ]
    }, (err, result) => {
        if (result) {
            callback(err, result)
        } else {
            console.log('---------Conditions--------');
            console.log(conditions);
            let values = {};
            values.googleId = condition.Id;
            values.emails = condition.emails[0].value;
            values.nombre = condition.displayName || 'SIN NOMBRE';
            values.verificado = true;
            values.password = condition._json.etag;
            console.log('-------Values----------');
            console.log(values);
            self.create(values, (err, result) =>{
                if(err){console.log(err)}
                return callback(err, result)
            })
        }
    })
};
//Exports

module.exports = mongoose.model('Usuario', usuarioSchema)