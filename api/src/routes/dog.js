const { Router } = require('express');
const{ Temperament } = require('../db')
const { Dog } = require('../db')
const router = Router();

router.post('/', async (req, res) => {
    let {
        name,
        height,
        weight,
        life_span,
        image,
        createdInDb,
        temperament,
    }= req.body                              //me traigo del body todo lo que necesito

    let dogCreated = await Dog.create({  //creo el dog con el modelo Dog y le paso lo mismo excepto el temperament porque lo tengo que encontrar en un modelo que ya tengo
        name,
        height,
        weight,
        life_span,
        image,
        createdInDb,
        })

    let temperamentDb = await Temperament.findAll({ //dentro de mi modelo encontrá todos los temperament que coincidan con lo que le paso por body
        where: {
            name: temperament,    //name es igual al temperament que le llega por body
        }
    });

    dogCreated.addTemperament(temperamentDb) //al dog creado agregále el temperament encontrado en la Bd que le llegó por body
    res.send('Successfull Created Doggy')
});

module.exports= router;