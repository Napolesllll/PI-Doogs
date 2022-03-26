const { Router } = require('express');

const router = Router();
const dog = require('./dog');
const dogs = require('./dogs');
const temperament = require('./temperament');

router.use('/dog', dog)
router.use('/dogs', dogs)
router.use('/temperament', temperament)

module.exports = router;
