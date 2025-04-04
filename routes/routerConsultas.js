const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultasController');

// 5.1 Países de Americas
router.get('/americas', consultasController.paisesAmericas);

// 5.2 Países poblados de Americas
router.get('/americas-poblados', consultasController.paisesAmericasPoblados);

// 5.3 Países fuera de África
router.get('/fuera-africa', consultasController.paisesFueraAfrica);

// 5.4 Actualizar Egipto
router.put('/actualizar-egipto', consultasController.actualizarEgipto);

// 5.5 Eliminar país por código
router.delete('/eliminar-pais', consultasController.eliminarPais);

// 5.7 Países por rango de población
router.get('/rango-poblacion', consultasController.paisesRangoPoblacion);

// 5.8 Países ordenados por nombre
router.get('/ordenados', consultasController.paisesOrdenados);

// 5.9 Ejemplo de Skip
router.get('/skip', consultasController.ejemploSkip);

// 5.10 Búsqueda por nombre (regex)
router.get('/buscar', consultasController.buscarPorNombre);

// 5.11 Crear índice
router.post('/crear-indice', consultasController.crearIndice);

// Ruta de diagnóstico
router.get('/estado', consultasController.verificarEstado);

module.exports = router;