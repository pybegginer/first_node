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

Bicicleta.add(a);
Bicicleta.add(b);


module.exports = Bicicleta;