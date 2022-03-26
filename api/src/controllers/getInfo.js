const axios= require('axios');
const{Dog,Temperament} = require('../db');
const  { API_KEY } = process.env;

///trayendo datos de la api
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(el => {    //.data porque viene de axios, saco los valores que no quiero enviar
        return {
            id: el.id,
            name: el.name,
            height: el.height.metric,   //en sistema métrico (tambien viene imperial)
            weight: el.weight.metric,
            life_span: el.life_span,
            temperament: el.temperament ? el.temperament : null,
            image: el.image.url,
        };
    });
    return apiInfo;

};

//// trayendo bases de datos
const getDbInfo = async () => {
    return await Dog.findAll({   //me traigo la info de la base de datos del modelo Dog que incluye el mod Temperament
        include:{            //porque si no lo incluyo al crear un dog nunca me va a traer el dog con el temperamento
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);      ////concatenando los datos de la api y DB

    return allInfo;
}

module.exports= {
    getAllDogs,
    getApiInfo,
    getDbInfo
    
}