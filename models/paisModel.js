const mongoose = require('mongoose');

const paisSchema = new mongoose.Schema({
    codigoPais: [String],
    nombrePais: String,
    capitalPais: String,
    region: String,
    poblacion: Number,
    latitud: Number,
    longitud: Number,
    superficie: Number
});

module.exports = mongoose.model('Pais', paisSchema, 'paises');