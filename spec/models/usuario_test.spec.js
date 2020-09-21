var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Reserva = require('../../models/reserva');
var Usuario = require('../../models/usuario');
//create test for user's model

describe('Testing Usuarios', function(){
    //Made connection before each test
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/testdb';
        //Declare de connection
        mongoose.connect(mongoDB, { useNewUrlParser: true });
        //Declare db as connection made with mongoose
        const db = mongoose.connection;
        //connection was succedfull or failed?
        db.on('error', console.error.bind(console, 'Connection failed'));
        db.once('open', function(){
            console.log('Connection was succesful. :)');
            done();
        });
    });
    //Delete all data created by test in db
    afterEach(function(done){
        Reserva.deleteMany({}, function(err, success){
            if (err) console.log(err);
            Usuario.deleteMany({}, function(err, success){
                if (err) console.log(err);
                Bicicleta.deleteMany({}, function(err, success){
                    if(err) console.log(err);
                    done();
                });
            });
        });
    });
    //Test when a bycicle is reserved
    describe('Cuando Usuario reserva una Bicicleta', () => {
        it('Desde existir la reserva', (done) => {
            //Create (withouth save) a new user
            const usuario = new Usuario({nombre: 'Andrea Pirlo'});
            //save user in db
            usuario.save();
            //Create a new bycicle
            const bicicleta = new Bicicleta({
                code: 10, 
                color: 'Black',
                model: 'BMX'
            });
            //save new bicicleta
            bicicleta.save();
            //Create a new reserve from today
            var hoy = new Date();
            var mañana = new Date();
            //set dates for today and tomorrow
            mañana.setDate(hoy.getDate() + 1);
            //add reserve to User
            usuario.reservar(bicicleta._id, hoy, mañana, function(err, reserva) {
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas) {
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(bicicleta.code);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                });
            });
        });
    });
});


