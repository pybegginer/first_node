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
    var usuario = new Usuario({nombre: req.body.nombre, email:req.body.email, password: req.body.password});
    Usuario.create(usuario, function(err, nuevoUsuario){
        if (err) {
            return res.status(400).json({
                status: error,
                message: "Ops. There was a mistake!"
            });
        };
        nuevoUsuario.enviar_email_bienvenida();
        res.status(200).json(nuevoUsuario);
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
