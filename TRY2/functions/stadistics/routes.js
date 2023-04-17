const { Router } = require("express")
const controler= require("./controller")
const router = Router();

router.get('/centros' , controler.getCentros)
router.get('/enferments' , controler.getEnfermedades) 
router.get('/medicos' , controler.getMedicos)
router.get('/medicina' , controler.getMedicina)

module.exports = router