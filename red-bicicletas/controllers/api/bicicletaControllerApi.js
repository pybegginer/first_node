var Bicicleta = require('../../models/bicicleta') //Import Bicicleta model
//create a new API return object with bicicleta_list
exports.bicicleta_list = function(req, res) {
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

//Create a new Bicicleta

exports.bicicleta_create = (req, res)=>{
    var bici = new Bicicleta(req.body.id, req.body.color,req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    //agrego la nueva bicicleta
    Bicicleta.add(bici)
    //devuelvo algo al json
    res.status(200).json({
        bicicleta:bici
    });
};


exports.bicicleta_delete = (req, res) =>{
    Bicicleta.removeByID(req.body.id);
    res.status(204).send();
}