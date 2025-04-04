const Pais = require('../models/paisModel');
const paisService = require('../services/paisService');

const paisController = {
    create: async (req, res) => {
        try {
            const nuevoPais = new Pais({
                codigoPais: req.body.callingCodes,
                nombrePais: req.body.name,
                capitalPais: req.body.capital,
                region: req.body.region,
                poblacion: req.body.population,
                latitud: req.body.latlng[0],
                longitud: req.body.latlng[1],
                superficie: req.body.area
            });
            await nuevoPais.save();
            res.status(201).json(nuevoPais);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    },

    migrar: async (req, res) => {
        try {
            await paisService.migrarPaises();
            res.status(200).json({ mensaje: 'Migración completada exitosamente' });
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }
};

module.exports = paisController;