const Pais = require('../models/paisModel');

const consultasService = {
    // 5.1 Países de Americas
    getPaisesAmericas: async () => {
        try {
            console.log('⏳ Buscando países en Americas...');
            const paises = await Pais.find({ region: 'Americas' })
                .select('nombrePais capitalPais region poblacion');
            console.log(`✅ Encontrados ${paises.length} países en Americas`);
            return paises;
        } catch (error) {
            console.error('❌ Error en getPaisesAmericas:', error);
            throw error;
        }
    },

    // 5.2 Países de Americas con población > 100M
    getPaisesAmericasPoblados: async () => {
        try {
            console.log('⏳ Buscando países de Americas con población > 100M...');
            const paises = await Pais.find({
                region: 'Americas',
                poblacion: { $gt: 100000000 }
            }).select('nombrePais region poblacion');
            console.log(`✅ Encontrados ${paises.length} países poblados en Americas`);
            return paises;
        } catch (error) {
            console.error('❌ Error en getPaisesAmericasPoblados:', error);
            throw error;
        }
    },

    // 5.3 Países fuera de África
    getPaisesFueraAfrica: async () => {
        try {
            console.log('⏳ Buscando países fuera de África...');
            const paises = await Pais.find({
                region: { $ne: 'Africa' }
            }).select('nombrePais region');
            console.log(`✅ Encontrados ${paises.length} países fuera de África`);
            return paises;
        } catch (error) {
            console.error('❌ Error en getPaisesFueraAfrica:', error);
            throw error;
        }
    },

    // 5.4 Actualizar Egipto
    actualizarEgipto: async () => {
        try {
            console.log('⏳ Actualizando datos de Egipto...');
            const resultado = await Pais.updateOne(
                { nombrePais: 'Egypt' },
                {
                    $set: {
                        nombrePais: 'Egipto',
                        poblacion: 95000000
                    }
                }
            );
            console.log('✅ Resultado actualización:', resultado);
            return resultado;
        } catch (error) {
            console.error('❌ Error en actualizarEgipto:', error);
            throw error;
        }
    },

    // 5.5 Eliminar país por código
    eliminarPaisPorCodigo: async () => {
        try {
            console.log('⏳ Eliminando país con código 258...');
            const resultado = await Pais.deleteOne({ codigoPais: "258" });
            console.log('✅ Resultado eliminación:', resultado);
            return resultado;
        } catch (error) {
            console.error('❌ Error en eliminarPaisPorCodigo:', error);
            throw error;
        }
    },

    // 5.7 Países con población entre 50M y 150M
    getPaisesPorRangoPoblacion: async () => {
        try {
            console.log('⏳ Buscando países con población entre 50M y 150M...');
            const paises = await Pais.find({
                poblacion: {
                    $gt: 50000000,
                    $lt: 150000000
                }
            }).select('nombrePais poblacion');
            console.log(`✅ Encontrados ${paises.length} países en el rango de población`);
            return paises;
        } catch (error) {
            console.error('❌ Error en getPaisesPorRangoPoblacion:', error);
            throw error;
        }
    },

    // 5.9 Ejemplo de Skip
    getPaisesConSkip: async (skipAmount = 5) => {
        try {
            console.log(`⏳ Obteniendo países saltando los primeros ${skipAmount}...`);
            const paises = await Pais.find()
                .select('nombrePais')
                .skip(skipAmount)
                .limit(10);
            console.log(`✅ Obtenidos ${paises.length} países`);
            return paises;
        } catch (error) {
            console.error('❌ Error en getPaisesConSkip:', error);
            throw error;
        }
    },

    // 5.10 Ejemplo de Expresiones Regulares
    buscarPaisesPorNombre: async (termino) => {
        try {
            console.log(`⏳ Buscando países que contengan "${termino}"...`);
            const paises = await Pais.find({
                nombrePais: { $regex: termino, $options: 'i' }
            }).select('nombrePais');
            console.log(`✅ Encontrados ${paises.length} países con "${termino}"`);
            return paises;
        } catch (error) {
            console.error('❌ Error en buscarPaisesPorNombre:', error);
            throw error;
        }
    },

    // 5.8 Países ordenados por nombre
    getPaisesOrdenados: async () => {
        try {
            console.log('⏳ Obteniendo países ordenados por nombre...');
            const paises = await Pais.find()
                .select('nombrePais')
                .sort({ nombrePais: 1 });
            console.log(`✅ Ordenados ${paises.length} países`);
            return paises;
        } catch (error) {
            console.error('❌ Error en getPaisesOrdenados:', error);
            throw error;
        }
    },

    // 5.11 Crear índice
    crearIndice: async () => {
        try {
            console.log('⏳ Creando índice en codigoPais...');
            // Removemos la opción unique
            const resultado = await Pais.collection.createIndex(
                { codigoPais: 1 },
                {
                    background: true,
                    name: "idx_codigoPais" 
                }
            );
            console.log('✅ Índice creado:', resultado);
            return resultado;
        } catch (error) {
            console.error('❌ Error en crearIndice:', error);
            throw error;
        }
    },

    // Función de diagnóstico
    verificarEstado: async () => {
        try {
            const total = await Pais.countDocuments();
            const ejemplo = await Pais.findOne();
            return {
                totalDocumentos: total,
                hayDatos: total > 0,
                ejemploPais: ejemplo,
                estado: 'OK'
            };
        } catch (error) {
            console.error('❌ Error en verificación:', error);
            throw error;
        }
    }
};

// BACKUP DE LA BASE DE DATOS MONGO países_db
/*
Para realizar un backup de la base de datos MongoDB países_db se pueden usar estos métodos:

1. Usando mongodump (método tradicional desde terminal):
   mongodump --uri "mongodb+srv://mern_user:sATIsqL7RPhz3cWT@calendardb.ambmg.mongodb.net/paises_db" --out ./backup

2. Desde MongoDB Compass (interfaz gráfica):
   - Conectar a la base de datos
   - Click derecho en la colección "paises"
   - Seleccionar "Export Collection"
   - Elegir formato (JSON o CSV)
   - Seleccionar ubicación y exportar

3. Usando mongoexport para exportar en JSON (desde terminal):
   mongoexport --uri="mongodb+srv://mern_user:sATIsqL7RPhz3cWT@calendardb.ambmg.mongodb.net/paises_db" --collection=pais --out=paises.json

4. Para restaurar el backup:
   mongorestore --uri "mongodb+srv://mern_user:sATIsqL7RPhz3cWT@calendardb.ambmg.mongodb.net/paises_db" ./backup

Nota: Reemplazar las credenciales y URI según corresponda.
Los backups se recomiendan hacer periódicamente y en horarios de bajo tráfico.
*/

module.exports = consultasService;