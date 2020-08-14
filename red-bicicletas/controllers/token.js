var Usuario = require('../models/usuario');
var Token = require('../models/token');

module.exports = {
    //Confirmation
    confirmationGet: (req, res, next) => {
        //console.log(req.params.token)
        Token.findOne({
            token: req.params.token
        }, (err, token) => {
            if (!token) return res.status(400).send({
                type: 'not-verified',
                msg:  'No se encontró el token.\n Puede haber expirado. Solicita un nuevo token'
            })
            Usuario.findById(token._userId, (err, usuario) => {
                console.log(usuario)
                if (!usuario) return res.status(400).send({
                    msg: 'No se encontró un usuario con este token'
                });
                if (usuario.verificado) return res.redirect('/usuarios');
                usuario.verificado = true;
                usuario.save((err) => {
                    if (err) { return res.status(500).send({
                        msg: err.message
                    });}
                    res.redirect('/');
                });
            });
        });
    },
};