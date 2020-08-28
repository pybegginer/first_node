//import libraries
const Usuario = require('../../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    //Authenticate User
    authenticate : function(req, res, next){
        Usuario.findOne({email: req.body.email}, function(err, userInfo){
            //If email is not even an user
            if(userInfo === null){
                //console.log('Print Error!!');
                return res.status(401).json({status: 'Error', message: "Invalid email/password", data: null});
            };
            //If Password and email are ok!!
            if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)){
                const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: '7d'});
                return res.status(200).json({message: 'Usuario encontrado', data: {usuario: userInfo, token: token}});
            } else {
                //If Password is is wrong but user email exist
                //console.log('Wrong Password');
                return res.status(401).json({status: 'Error', message: "Invalid email/password", data: null});
            };
        });
    },
    //ForgotPassword
    forgotPassword: function(req, res, next){
        Usuario.findOne({email: req.body.email}, function(err, usuario){
            if (err){
                return next();
            } else{
                if (!usuario) {return (res.status(400).json({
                    message: 'Usuario no existe',
                    data: null
                    })
                )};
                usuario.resetPassword(function(err){
                    if(err){
                        return next();
                    } else {
                        res.status(200).json({message:'Se envío un  email para reestablecer la contraseña', data: null});
                    };
                });
            };
        });
    },
}