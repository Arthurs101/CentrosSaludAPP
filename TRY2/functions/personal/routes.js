const { Router } = require("express")
const controler= require("./controller")
const router = Router();

router.post('/', controler.addPersonal)

module.exports = router