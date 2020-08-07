var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
//First testing with beforeEach and afterEach
describe('Testing Bicicleta', () =>{
    //Connec with database
    beforeEach((done) => {
        //enable db
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true });
        //create db
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Connection error'));
        //If if is succesful
        db.once('open', () => {
            console.log("We're connected to database. :) Nice!")
            done();
        });
    });
//afterEach Delete all
    afterEach((done) => {
        Bicicleta.deleteMany({}, (err, success) => {
            if (err) console.log(err);
            done();
        });
    });
    //Create an instance
    describe('Bicicleta.crateInstance', () => {
        it('Crea una instance en la db', () => {
            var bici = Bicicleta.createInstance(1, 'Azul', 'Urbana', [6.3534, -75.2343]);
            expect(bici.code).toBe(1);
            expect(bici.color).toBe('Azul');
            expect(bici.modelo).toBe('Urbana');
            expect(bici.ubicacion[0]).toEqual(6.3534);
            expect(bici.ubicacion[1]).toEqual(-75.2343);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacía', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });
    //Add a bici

    describe('Bicicleta.Add', () => {
        it('Agregar una bicicleta', (done) => {
            var aBici = new Bicicleta(
                {
                    code:5,
                    color: 'Negra',
                    modelo: 'Rural', 
                });
            Bicicleta.add(aBici, function(err, newBici){
                if (err) console.log(err);
                Bicicleta.allBicis(function(err,bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    done();
                });
            });
        });
    });

    //Find
    describe('Bicicleta.findByCode', () => {
        it('Devolver la bicicleta que busco', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                //Create a new bici
                var aBici = new Bicicleta({code:1, color:'Amarillo', modelo: 'BMX'});
                Bicicleta.add(aBici, function(err, aBici){
                    if (err) console.log(err);
                    //create new bici
                    var aBici2 = new Bicicleta({code:2, color:'Azul', modelo: 'Montana'});
                    Bicicleta.add(aBici2, function(err, aBici2){
                        if (err) console.log(err);
                        //search for first Bici
                        Bicicleta.findByCode(1, function(error, targetBici){
                            expect(targetBici.code).toEqual(aBici.code);
                            expect(targetBici.color).toEqual(aBici.color);
                            expect(targetBici.modelo).toEqual(aBici.modelo);

                            done();
                        });
                    });
                });
            });
        });
    });
});


/*
//Agrego la condición de antes de cada test empiece la lista vacía
beforeEach(() => {
    Bicicleta.allBicis=[];
});

beforeEach(() => {
    console.log('testing...');
    });
//Hago el primer test
describe('Bicicleta.allBicis', ()=>{
    it('Comienza vacia', () =>{
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

//Testear que agregue la bicicleta que estamos creando
describe('Bicicleta.add', () => {
    it('Se agrega la bicicleta', () => {
        //Primero miro cuantas bicicletas hay originalmente
        var numBici = Bicicleta.allBicis.length;
        //Agrego una nueva bicicleta
        var a = new Bicicleta(7, 'Fucsia', 'Montaña', [6.23432,-73.4345345]);
        Bicicleta.add(a);
        //Check si la cantidad de bicicletas se incrementó en 1
        expect(Bicicleta.allBicis.length).toBe(numBici+1);
        //Check si la nueva bicicleta agregada es la que acabo de agregar (a)
        expect(Bicicleta.allBicis[numBici]).toBe(a);
    });
});

//Testear FindBy
describe('Bicicleta.findByID', ()=>{
    it('Encontrar la bicicleta con el id que entregue', () => {
        //La idea es crear una nueva bicicleta, buscar su id y ver si cumple
        //Cuantas bicicletas hay actualmente en el modelo
        var numBici = Bicicleta.allBicis.length;
        //Creo una nueva bicicleta
        var aBici = new Bicicleta(100, 'color', 'model', [6.123, -7.890]);
        var aBici2 = new Bicicleta(101, 'color2', 'model2', [6.456, -7.123]);
        //agrego la bicicleta creada
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);
        //Especifico cual bici voy a buscar
        var targetBici = aBici;
        //Y que valores espero encontrar por id
        expect(Bicicleta.findByID(targetBici.id)).toBe(aBici);
    });
});
//Checar el delete
describe('Bicicleta.removeByID', () => {
    it('Se eliminó la bicicleta', () => {
        //Miro cuantas bicicletas existe
        var numBici = Bicicleta.allBicis.length;
        //Como estoy corriendo el beforeEach, deben ser cero
        expect(numBici).toBe(0);
        //Creo una nueva Bicicleta
        var aBici = new Bicicleta(100, 'color', 'model', [6.123, -7.890]);
        var aBici2 = new Bicicleta(101, 'color2', 'model2', [6.456, -7.123]);
        //Agrego la bicicleta creada
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);
        //miro la cantidad de bicicletas ahora
        var numBiciAdded = Bicicleta.allBicis.length; //deben ser +2 pues agregué 2 bicicletas- Ya esto se probó arriba
        var DeleBici = aBici; //Bicicleta que voy a eliminar
        //Elimino la bicicleta
        Bicicleta.removeByID(DeleBici.id);
        //Debo checar que se haya eliminado y que la bicicleta no exista
        expect(Bicicleta.allBicis.length).toBe(numBiciAdded-1); //Debió eliminar la bicicleta(-1 bicicleta)
        //ver que haya eliminado la bicicleta que es
        expect(Bicicleta.allBicis.filter(
            bici => bici.id === DeleBici.id && bici.modelo === DeleBici.modelo && bici.color === DeleBici.color && bici.ubicacion === DeleBici.ubicacion
        ).length).toBe(0);
    });
});
*/