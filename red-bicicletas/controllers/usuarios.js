var Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

module.exports = {
    //export Usuario.list
    list: (req, res, next) => {
        Usuario.find({}, (err, usuarios)=>{
            res.render('usuarios/index', {errors:{}, usuarios: usuarios});
        });
    },
    //export Usuario.update_get
    update_get: (req, res, next) => {
        Usuario.findById(req.params.id, (err, usuario) => {
            res.render('usuarios/update', {errors:{}, usuario: usuario});
        });
    },
    //exports update:
    update: (req, res, next) =>{
        var update_values = {nombre: req.body.nombre};
        Usuario.findByIdAndUpdate(req.params.id, update_values, (err, usuario) => {
            if (err) {
                console.log(err);
                res.render('usuarios/update', {errors: err.errors, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email})});
            } else {
                res.redirect('/usuarios');
                return;
            };
        });

    },
    //exports get.creater_get
    create_get: (req, res, next) => {
        res.render('usuarios/create', {errors:{}, usuario: new Usuario()});
    },
    create: (req, res, next) => {
        if (req.body.password != req.body.confirm_password){
            res.render('usuarios/create', {errors:
                {confirm_password:
                    {message: 'No coinciden las contraseñas'}
                },
                usuario: new Usuario({
                    nombre: req.body.nombre,
                    email: req.body.email
                })
            });
            return;
        }
        Usuario.create({
            nombre: req.body.nombre,
            email:req.body.email,
            password: req.body.password
        }, (err, nuevoUsuario) => {
            if (err){
                res.render('usuarios/create', 
                {   errors: err.errors,
                    usuario: new Usuario(
                        {nombre: req.body.nombre,
                        email: req.body.email
                    })
                });
            } else {
                nuevoUsuario.enviar_email_bienvenida();
                res.redirect('/usuarios');
            }
        })
    },
    //delete method
    delete: (req, res, next) => {
        Usuario.findByIdAndDelete(req.body.id, (err) => {
            if (err) {
                next(err);
            } else {
                res.redirect('/usuarios');
            }});
    },
};