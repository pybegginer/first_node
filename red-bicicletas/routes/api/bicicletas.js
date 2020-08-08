//Importo lo que necesito: Express el ruteador y el controlador de la bicicleta
var express = require('express'); //importo express
var router = express.Router(); //uso el enrutador
var bicicletaController = require('../../controllers/api/bicicletaControllerApi'); //Importo el controlador dela API

//Creo los end-point
router.get('/', bicicletaController.bicicleta_list);
router.post('/create', bicicletaController.bicicleta_create);
router.delete('/delete', bicicletaController.bicicleta_delete);

//Exporto los datos
module.exports = router;
