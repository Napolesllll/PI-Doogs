const { Router } = require('express');
const router = Router();
const { getAllDogs } = require('../controllers/getInfo') 

router.get('/', async (req, res) => {
    const name = req.query.name
    let totalDogs = await getAllDogs();      //me traigo todos, Db y api
    if(name){                               // si hay un nombre por query
        let dogName = await totalDogs.filter( el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ?                          //si hay algún nombre
        res.status(200).send(dogName) :
        res.status(404).send('Doggy Not Found');
    }else {
        res.status(200).send(totalDogs);   //si no hay name por query manda un status 200 con todos los dogs
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const allDogs = await getAllDogs();
    if(id){
        let dogId = await allDogs.filter(el => el.id == id);   //dentro de todos los dogs filtra el id que te estoy pasando 
        dogId.length ? res.json(dogId) : res.status(404).send('Doggy Not Found');  //si no encuentra nada entra en la res.status
    }
})

module.exports = router;