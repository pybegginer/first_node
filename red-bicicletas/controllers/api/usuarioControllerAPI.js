var Usuario = require('../../models/usuario');

//List all users 
exports.usuarios_list = function(req, res) {
    Usuario.find({}, function(err, usuarios){
        res.status(200).json({
            usuarios: usuarios
        });
    });
};

//create a new User from data send in request body in API
exports.usuario_create = function (req, res) {
    var usuario = new Usuario({nombre: req.body.nombre});
    usuario.save( function(err){
        res.status(200).json(usuario);
    });
};

//reserve a bycicle in API
exports.usuario_reservar = function(req, res) {
    Usuario.findById(req.body.id, function(err, fusuario){
        //console.log(usuario);
        fusuario.reservar(req.body.id, req.body.desde, req.body.hasta, function(err) {
            //console.log('Has reservado tu bicicleta!');
            res.status(200).send();
        });
    });
};
