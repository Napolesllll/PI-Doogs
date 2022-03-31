const { Router } = require('express');
const router = Router();
const { getAllDogs } = require('../controllers/getInfo') 

//busca por nombre
router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        let allDogs = await getAllDogs();
        if (name) {
          let dogName = await allDogs.filter((e) =>
            e.name.toLowerCase().includes(name.toLowerCase())
          );
          dogName.length
            ? res.status(200).json(dogName)
            : res.status(404).send([
                {
                  msg: "Oh no! the dog you are looking for does not exist. Try create it!",
                },
              ]);
        } else {
          return res.status(200).json(allDogs);
        }
      } catch (error) {
        res.status(404).json({ error: "Ouuch! We have an error :c" });
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