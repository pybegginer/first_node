var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport');
//Using usuario and Token
const Usuario = require('./models/usuario');
const Token = require('./models/token');
//creo la sesión
const session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasApiRouter = require('./routes/api/bicicletas');
var usuariosApiRouter = require('./routes/api/usuarios');
var tokenRouter = require('./routes/token');
var usuariosRouter = require('./routes/usuarios');
//Creo el objeto de session
const store = new session.MemoryStore;
//express
var app = express();
app.use(session({
  cookie: {
    maxAge: 240*60*60*1000
  },
  store: store,
  saveUninitialized: true,
  resave: 'true',
  secret: 'red_bicis_I#BC?#&%CSFDV'
}));
//Using Mongoose
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/red_bicicletas';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
//on connection
db.on('error', console.error.bind(console, 'MongoDB Connection Error: '));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
//using passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function(req,res){
  res.render('session/login');
});

app.post('/login', function(req, res, next){
  passport.authenticate('local', function (err, usuario, info) {
    if (err) {return next(err)};
    if (!usuario) {return res.render('session/login', {info})};
    req.logIn(usuario, function(err){
      if (err) {return next(err)};
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/forgotPassword', function(req, res){
  return res.render('session/forgotPassword')
});

app.post('/forgotPassword', function(req, res){
  Usuario.findOne({email: req.body.email}, function(err, usuario){
    if(err){return console.log(err)};
    if(!usuario) {
      return res.render('session/forgotPassword', {
        info: {
          message: 'El email ingresado no existe'
        }
      }
    )
  };
  //si existe el usuario, entonces enviar correo con nuevo token para modificar
  //la contraseña
  usuario.resetPassword(function(err){
    if(err) {return next(err)};
  });
  //Cuando se envía el mail, entonces renderear el get a resetPassword
  res.render('session/forgotPasswordMessage', );
  });
});

//Cargar el get de reset pasword para que las personas ingresen con el token enviado
app.get('/resetPassword/:token', function(req, res, next){
  Token.findOne({token: req.params.token}, function(err, token){
    //Si no existe un usuario que tenga asignado ese token
    //enviar un mensaje diciendo que no existe el usuario
    if (!token) {
      return res.status(400).send({
      type: 'not-verified',
      msg: 'No existe un usuario asociado a este token. Verifique que no haya expirado su token'
      }); 
    };
    //Si existe el usuario, entonces sacar el usuario que tiene ese token
    Usuario.findById(token._userId, function(err, usuario) {
      
      if(err){
        return next(err);
      };
      //Si no encuentro un usuario con el token dado, entonces enviar que no existe el usuario
      if(!usuario){
        return res.status(400).send(
          {
            msg: 'No existe un usuario asociado a este token.'
          });
      };
      //Si el usuario, existe y el token es correcto, Entonces envío el usuario a resetPassword
      res.render('session/resetPassword', {
        errors: {},
        usuario: usuario
      });
    });
  });
});
//Post to resetPassword Need a body params Email & Password
app.post('/resetPassword', function(req, res, next){
  //las contraseñas son diferentes?
  if(req.body.password != req.body.confirm_password){
    //Si las contraseñas son diferentes, entonces enviar un error
    res.render('session/resetPassword', {
      errors: {password: 'No Coinciden las contraseñas ingresadas'},
      usuario: new Usuario({email: req.body.email})
    });
    return
  };
  //Si las claves son iguales, entonces voy con el mail, busco el usuario, y actualizo la contraseña
  Usuario.findOne({email: req.body.email}, function(err, usuario){
    //si hay un error, pasa al siguiente
    usuario.password = req.body.password;
    usuario.save(function(err){
      if (err) {
        res.render('session/resetPassword', 
          { 
            errors:err.errors, 
            usuario: new Usuario({email: req.body.email})
          }
        );
      } else {
        res.redirect('/login');
      };
    });
    //--Finish callback function FindOne
  });
});

//URL to app
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', loggedIn, bicicletasRouter);
app.use('/api/bicicletas', bicicletasApiRouter);
app.use('/api/usuarios', usuariosApiRouter);
app.use('/token', tokenRouter);
app.use('/usuarios', usuariosRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Keep it logged in
function loggedIn(req, res, next){
  if(req.user) {
    next();
  } else {
    console.log('User sin Loguear')
    res.redirect('/login');
  };
};

module.exports = app;
