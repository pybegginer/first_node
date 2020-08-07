//rise server when 
var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
const request = require('request');
var server = require('../../bin/www');
var base_url = 'http://localhost:3000/api/bicicletas';

describe ('bicicleta API', () => {
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Connection error'));
        db.once('open', function(){
            console.log("We're connected to Initial  DB. Congrats :D");
            done();
        });
    });
    //afterEach
    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        });
    });

    //Get to Bicicletas
    describe('GET BICICLETAS /', () => {
        it('Status 200', (done) => {
            request.get(base_url, function(error, response, body) {
                var result = JSON.parse(body);
                console.log('This is body: ' + body)
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });
    //POST to Bicicletas

describe('POST Bicicletas /', () => {
    it('Status 200', (done) => {
        var header = {'content-type': 'application/json'};
        var aBici = '{"code": 10, "color": "rojo", "modelo":"Montaña", "lat":6.2345, "lng": -75.2343}';
        request.post({
            headers: header,
            url: base_url+'/create',
            body: aBici
        }, function(error, response, body){
            expect(response.statusCode).toBe(200);
            var bici = JSON.parse(body).bicicleta;
            console.log(bici);
            expect(bici.color).toBe("rojo");
            expect(bici.ubicacion[0]).toBe(6.2345);
            expect(bici.ubicacion[1]).toBe(-75.2343);
            done();
        });
    });
});






})



// describe ('Bicicleta API', () => {
//     describe('GET Bicicletas /', () => {
//         it('status 200', () => {
//             //Creo una nueva bicicleta
//             var a = new Bicicleta(100, 'Negra', 'BMX', [6.123, -75.789]);
//             //agrego la bicicleta
//             Bicicleta.add(a);

//             request.get(`http://localhost:${server.WEBPORT}/api/bicicletas`, (error, response, body) => {
//                 expect(response.statusCode).toBe(200);
//             });
//         });
//     });

//     describe('POST Bicicleta /create', () => {
//         it('Status 200', (done)=> {
//             var headers = {'content-type': 'application/json'};
//             var aBici = '{"id": 500, "color": "Magenta/negro", "modelo": "BMX", "lat": 6.23423, "lng": -74.956545}';
//             request.post({
//                 headers: headers,
//                 url: 'http://localhost:3000/api/bicicletas/create',
//                 body: aBici
//             }, function (error, response, body) {
//                 expect(response.statusCode).toBe(200);
//                 expect(Bicicleta.findByID(500).color).toBe('Magenta/negro');
//                 done();  
//             });
//         });
//     });



// });
