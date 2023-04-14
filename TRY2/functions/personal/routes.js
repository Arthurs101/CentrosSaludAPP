const { Router } = require("express")
const controler= require("./controller")
const router = Router();

router.post('/', controler.addPersonal)
router.get('/', controler.obtenerPersonal)

module.exports = router