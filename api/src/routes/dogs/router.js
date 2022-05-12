const { Router } = require('express');
const { getDogs, breedForId } = require('./controller')
const router = Router();

router.get('/',getDogs);
router.get('/:idRaza',breedForId)


module.exports = router;