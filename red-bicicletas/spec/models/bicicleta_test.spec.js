var Bicicleta = require('../../models/bicicleta');
//Agrego la condición de antes de cada test empiece la lista vacía
beforeEach(() => {
    Bicicleta.allBicis=[];
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
