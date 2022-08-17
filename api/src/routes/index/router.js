const { Router } = require('express');
// const { route } = require('../../app');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/',(req, res)=>{

    res.json({name:"ola :)"})
    
})


module.exports = router;
