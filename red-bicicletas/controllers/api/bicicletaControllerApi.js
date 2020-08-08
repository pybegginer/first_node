var Bicicleta = require('../../models/bicicleta') //Import Bicicleta model
//create a new API return object with bicicleta_list
exports.bicicleta_list = function(req, res) {
    Bicicleta.allBicis(function(err, bicis){
        res.status(200).json({
            bicicletas: bicis
        });
    });    
};

//Create a new Bicicleta

exports.bicicleta_create = (req, res)=>{
    var bici = new Bicicleta({
        code: req.body.code, 
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    });
    //agrego la nueva bicicleta
    Bicicleta.add(bici, function(err){
        console.log(err)
    })
    //devuelvo algo al json
    res.status(200).json({
        bicicleta:bici
    });
};


exports.bicicleta_delete = (req, res) =>{
    Bicicleta.removeByCode(req.body.code, function(){
        res.status(204).send();
    });
};