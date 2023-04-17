const { Router } = require("express")
const controler= require("./controller")
const router = Router();

router.post('/', controler.addPersonal)
router.get('/', controler.obtenerPersonal)
router.get('/transfer', controler.HacerTraslado)
router.get('/centros' , controler.getCentros)

module.exports = router