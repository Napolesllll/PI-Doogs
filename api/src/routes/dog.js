const { Router } = require('express');
const{ Temperament } = require('../db')
const { Dog } = require('../db')
const router = Router();

const { getAllDogs } = require('../controllers/getInfo')

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


//------------------ DELETE --------------------\\


// router.delete("/:id", async (req, res, next) => {
//     const { id } = req.params;
//     try {
//       Dog.destroy({ where: { id: id } });
//       let geDataForApi = await services.getAllDogs();
//       let getDataFromDB = await Dog.findAll({
//         include: Temperament,
//       });
//       // FORMATEO PARA Q DESDE API Y DESDE DB LLEGUEN AL FRONT IGUALES
//       getDataFromDB = getDataFromDB.map((el) => {
//         return {
//           id: el.id,
//           name: el.name,
//           height: el.height,
//           weight: el.weight,
//           life_span: el.life_span,
//           image: el.image,
//           userCreate: true,
//           temperaments: el.Temperaments.map((i) => {
//             return i.name;
//           }).join(", "),
//         };
//       });
//       // resp de API y de DB juntas
      
//       res.send(geDataForApi);
//       // res.redirect("/");
//     } catch (err) {
//       next(err);
//     }
//   });