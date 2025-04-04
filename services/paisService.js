const axios = require('axios');
const Pais = require('../models/paisModel');

const migrarPaises = async () => {
    for (let codigo = 1; codigo <= 300; codigo++) {
        try {
            const codigoFormateado = codigo.toString().padStart(3, '0');
            const url = `https://restcountries.com/v3.1/alpha/${codigoFormateado}`;
            
            const response = await axios.get(url);
            
            if (response.data && response.data[0]) {
                const datos = response.data[0];
                
                const paisData = {
                    codigoPais: datos.idd?.suffixes?.map(suffix => datos.idd.root + suffix) || [],
                    nombrePais: datos.name.common,
                    capitalPais: datos.capital ? datos.capital[0] : '',
                    region: datos.region,
                    poblacion: datos.population,
                    latitud: datos.latlng ? datos.latlng[0] : null,
                    longitud: datos.latlng ? datos.latlng[1] : null,
                    superficie: datos.area
                };

                // Buscar si existe el país
                const paisExistente = await Pais.findOne({ 
                    nombrePais: paisData.nombrePais 
                });

                if (paisExistente) {
                    // Actualizar país existente
                    await Pais.updateOne(
                        { _id: paisExistente._id },
                        { $set: paisData }
                    );
                    console.log(`País actualizado: ${paisData.nombrePais}`);
                } else {
                    // Crear nuevo país
                    const nuevoPais = new Pais(paisData);
                    await nuevoPais.save();
                    console.log(`País creado: ${paisData.nombrePais}`);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log(`No se encontró país con código ${codigo}`);
                continue;
            }
            console.error(`Error procesando código ${codigo}:`, error.message);
        }
    }
};

module.exports = {
    migrarPaises
};