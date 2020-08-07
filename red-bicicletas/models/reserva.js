var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
//Create a model to each reservation
var reservaSchema = new Schema({
    desde: Date,
    hasta: Date,
    bicicleta: { type: mongoose.Schema.Types.ObjectId, ref: 'Bicicleta' },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
})

//add a method to model
reservaSchema.methods.diasReserva = function () {
    return moment(this.hasta).diff(moment(this.desde), 'days') + 1;
}

//exports

module.exports = mongoose.model('Reserva', reservaSchema);