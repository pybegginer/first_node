//importo el modelo de bicicletas
var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    Bicicleta.allBicis((err, bicis) => {
        res.render('bicicletas/index', {bicis: bicis});
    });
};

exports.bicicleta_create_get = function(req, res){
    //Muestro la página de crear para que ingresen los datos
    //console.log('Create new bycicle')
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req, res){
    var bici = new Bicicleta({code: req.body.code, color: req.body.color, modelo: req.body.modelo});
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici, (err)=>{
        res.redirect('/bicicletas');
    })
    
}

exports.bicicleta_delete_post = (req, res)=>{
    Bicicleta.removeByCode(req.body.code, (err)=>{
        res.redirect('/bicicletas');
    });
    
}

//Update
exports.bicicleta_update_get = function(req, res){
    //Muestro la página de crear para que ingresen los datos
    var bici = Bicicleta.findByID(req.params.id);
    console.log(bici);
    res.render('bicicletas/update', {bici});
}

exports.bicicleta_update_post = function(req, res){
    var bici = Bicicleta.findByID(req.params.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
    //Response
    res.redirect('/bicicletas');
}