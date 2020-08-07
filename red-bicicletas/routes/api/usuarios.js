var express = require('express');
var router = express.Router();
var usuarioController = require('../../controllers/api/usuarioControllerAPI');

//Define all methods to Users (list, create and reserve)

router.get('/', usuarioController.usuarios_list);
router.post('/create', usuarioController.usuario_create);
router.post('/reservar', usuarioController.usuario_reservar);

module.exports = router;
