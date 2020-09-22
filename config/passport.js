const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//configuramos el usuario
passport.use(new LocalStrategy(
    function (email, password, done) {
        Usuario.findOne({email: email}, function(err, usuario) {
            if (err) return done(err);
            if (!usuario) return done(null, false, {message: 'Email no existente o incorrecto'});
            if (!usuario.validPassword(password)) return done(null, false, {message: 'Password incorrecto'});
            //si no se ha ejecutado ninguno de los if anteriores, todo está bien, entonces devuelve el usuario enviado
            return done(null, usuario)
            
        });
    }));
//usando la estrategia de Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST + '/auth/google/callback'
    },
    function(request, accesToken, refreshToken, profile, cb){
        console.log(profile);
        Usuario.findOneOrCreateByGoogle(profile, function(err, user){
            return cb(err, user)
        });
    })
);


//serialize el usuario
passport.serializeUser( function(user, cb){
    cb(null, user.id);
});
//deserializer
passport.deserializeUser(function(id, cb){
    Usuario.findById(id, function(err, usuario){
        cb(err, usuario);
    });
});

module.exports = passport;
