var mongoose = require('mongoose');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;
//create a model for users which contains a name and its reserved bycicles

var usuarioSchema = new Schema({
    nombre: String,
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