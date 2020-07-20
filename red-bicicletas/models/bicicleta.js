var Bicicleta = function(id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion =  ubicacion;
}

Bicicleta.prototype.toString = function() {
    return `id: ${this.id} | color: ${this.color}`;
}
//Add aBici to allBicis array
Bicicleta.allBicis = [];
Bicicleta.add = function(aBici){
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findByID = function(aBiciID){
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciID);
    if (aBici)
        return aBici;
    else
        throw new Error(`No Existe una bicicleta con este ID: ${aBiciID} `);

}

Bicicleta.removeByID = function(aBiciID) {
    Bicicleta.findByID(aBiciID)
    for (var i=0; i<Bicicleta.allBicis.length; i++) {
        if (Bicicleta.allBicis[i].id == aBiciID){
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
}


var a = new Bicicleta(1, 'Rojo', 'Urbana', [6.2802118,-75.5612302]);
var b = new Bicicleta(2, 'Negra', 'Urbana', [6.280041,-75.553892]);
var c = new Bicicleta(3, 'Azul', 'Montaña', [6.2767991,-75.5685687]);
var d = new Bicicleta(4, 'Verde/Negra', 'Urbana', [6.2770124,-75.5662513]);
var e = new Bicicleta(5, 'Amarilla', 'Montaña', [6.2705284,-75.5644917]);
var f = new Bicicleta(6, 'Blanca/Negra/Verde', 'BMX', [6.2697178,-75.5701565]);

Bicicleta.add(a);
Bicicleta.add(b);
Bicicleta.add(c);
Bicicleta.add(d);
Bicicleta.add(e);
Bicicleta.add(f);


module.exports = Bicicleta;