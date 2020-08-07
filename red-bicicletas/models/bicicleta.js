var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Esquema base que tendrá la bicicleta

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], 
        index: {
            type: '2dsphere', 
            sparse: true
        }
    }
});
//Methods to model
//Create instances in models

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion) {
    return new this ({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

//Parse to string
bicicletaSchema.methods.toString = function() {
    return `code: ${this.code} | color: ${this.color}`;
};

//Print all Bicis
bicicletaSchema.statics.allBicis = function(cb) {
    return this.find({}, cb);
};

//add a new bici
bicicletaSchema.statics.add = function(aBici, cb) {
    this.create(aBici, cb);
};

//FindByCode
bicicletaSchema.statics.findByCode = function(aCode, cb){
    return this.findOne({code:aCode}, cb);
};

//removeByCode
bicicletaSchema.statics.removeByCode = function(aCode, cb){
    return this.deleteOne({code:aCode}, cb);
};




//export model
module.exports = mongoose.model('Bicicleta', bicicletaSchema);