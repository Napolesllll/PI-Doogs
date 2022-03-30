
const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Temperament } = require('../db')
const  { API_KEY } = process.env;

router.get('/', async (req, res) => {

    const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    const temperament = temperamentApi.data.map(el => el.temperament).join(", ").split(", ").join(", ").split(", ")

    await temperament.forEach( el => {   //para cada uno de ellos entrá al modelo Temperament y hacé un findOrCreate
        Temperament.findOrCreate ({   // es un método de sequelize usado para chequear si un elemento ya existe en la Db, y si no existe, lo va a crear.
            where: { name: el }          //creáme estos temperamentos donde el nombre sea este elemento que estoy mapeando
        })
    });
    const dogTemperament = await Temperament.findAll();
    res.send(dogTemperament)
})

module.exports = router;