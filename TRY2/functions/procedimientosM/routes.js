const { Router } = require("express")
const controler= require("./controller")
const router = Router();

router.get('/' , controler.getHandler)
router.post('/' , controler.postHandler)
router.get('/evolucion', controler.evolucionGetHandler) 
router.post('/evolucion', controler.evolucionPostHandler) 

module.exports = router