//rise server when 

var Bicicleta = require('../../models/bicicleta');
const request = require('request');
var server = require('../../bin/www');

describe ('Bicicleta API', () => {
    describe('GET Bicicletas /', () => {
        it('status 200', () => {
            //Creo una nueva bicicleta
            var a = new Bicicleta(100, 'Negra', 'BMX', [6.123, -75.789]);
            //agrego la bicicleta
            Bicicleta.add(a);

            request.get(`http://localhost:${server.WEBPORT}/api/bicicletas`, (error, response, body) => {
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('POST Bicicleta /create', () => {
        it('Status 200', (done)=> {
            var headers = {'content-type': 'application/json'};
            var aBici = '{"id": 500, "color": "Magenta/negro", "modelo": "BMX", "lat": 6.23423, "lng": -74.956545}';
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findByID(500).color).toBe('Magenta/negro');
                done();  
            });
        });
    });



});
