const consultasService = require('../services/consultasService');

const consultasController = {
    // 5.1 Países de Americas
    paisesAmericas: async (req, res) => {
        try {
            console.log('⏳ Solicitando países de Americas...');
            const resultado = await consultasService.getPaisesAmericas();
            res.json({
                success: true,
                count: resultado.length,
                data: resultado
            });
        } catch (error) {
            console.error('❌ Error en paisesAmericas:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    },

    // 5.2 Países poblados de Americas
    paisesAmericasPoblados: async (req, res) => {
        try {
            console.log('⏳ Solicitando países poblados de Americas...');
            const resultado = await consultasService.getPaisesAmericasPoblados();
            res.json({
                success: true,
                count: resultado.length,
                data: resultado
            });
        } catch (error) {
            console.error('❌ Error en paisesAmericasPoblados:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    },

    // 5.3 Países fuera de África
    paisesFueraAfrica: async (req, res) => {
        try {
            const resultado = await consultasService.getPaisesFueraAfrica();
            res.json({
                success: true,
                count: resultado.length,
                data: resultado
            });
        } catch (error) {
            console.error('❌ Error en paisesFueraAfrica:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    },

    // 5.4 Actualizar Egipto
    actualizarEgipto: async (req, res) => {
        try {
            const resultado = await consultasService.actualizarEgipto();
            res.json({
                success: true,
                message: 'Egipto actualizado correctamente',
                data: resultado
            });
        } catch (error) {
            console.error('❌ Error actualizando Egipto:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    },

    // 5.5 Eliminar país por código
    eliminarPais: async (req, res) => {
        try {
            const resultado = await consultasService.eliminarPaisPorCodigo();
            res.json({
                success: true,
                message: 'País eliminado correctamente',
                data: resultado
            });
        } catch (error) {
            console.error('❌ Error eliminando país:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    },

    // 5.7 Países por rango de población
    paisesRangoPoblacion: async (req, res) => {
        try {
            const resultado = await consultasService.getPaisesPorRangoPoblacion();
            res.json({
                success: true,
                count: resultado.length,
                data: resultado
            });
        } catch (error) {
            console.error('❌ Error en paisesRangoPoblacion:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    },

    // 5.8 Países ordenados por nombre
    paisesOrdenados: async (req, res) => {
        try {
            const resultado = await consultasService.getPaisesOrdenados();
            res.json({
                success: true,
                count: resultado.length,
                data: resultado
            });
        } catch (error) {
            console.error('❌ Error en paisesOrdenados:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    },

    // 5.9 Ejemplo de Skip
    ejemploSkip: async (req, res) => {
        try {
            const skipAmount = parseInt(req.query.skip) || 5;
            const resultado = await consultasService.getPaisesConSkip(skipAmount);
            res.json({
                success: true,
                skipped: skipAmount,
                count: resultado.length,
                data: resultado
            });
        } catch (error) {
            console.error('❌ Error en ejemploSkip:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    },

    // 5.10 Búsqueda por nombre (regex)
    buscarPorNombre: async (req, res) => {
        try {
            const termino = req.query.termino || '';
            const resultado = await consultasService.buscarPaisesPorNombre(termino);
            res.json({
                success: true,
                termino: termino,
                count: resultado.length,
                data: resultado
            });
        } catch (error) {
            console.error('❌ Error en buscarPorNombre:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    },

    // 5.11 Crear índice
    crearIndice: async (req, res) => {
        try {
            const resultado = await consultasService.crearIndice();
            res.json({
                success: true,
                message: 'Índice creado correctamente',
                data: resultado
            });
        } catch (error) {
            console.error('❌ Error creando índice:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    },

    // Endpoint de diagnóstico para verificar si se esta accediendo correctamente a la coleccion
    verificarEstado: async (req, res) => {
        try {
            const estado = await consultasService.verificarEstado();
            res.json({
                success: true,
                data: estado
            });
        } catch (error) {
            console.error('❌ Error verificando estado:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    }
};

module.exports = consultasController;