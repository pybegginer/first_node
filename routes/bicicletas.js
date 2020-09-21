//Importo lo que necesito: Express el ruteador y el controlador de la bicicleta
var express = require('express');
var router = express.Router();
var bicicletaController = require('../controllers/bicicleta');


//Inicia 
router.get('/', bicicletaController.bicicleta_list); //list
router.get('/create', bicicletaController.bicicleta_create_get); //create_get
router.post('/create', bicicletaController.bicicleta_create_post); //create_post
router.post('/:id/delete', bicicletaController.bicicleta_delete_post); //delete
router.get('/:id/update', bicicletaController.bicicleta_update_get); //update_get
router.post('/:id/update', bicicletaController.bicicleta_update_post); //update_post

//exporto la ruta

module.exports = router;