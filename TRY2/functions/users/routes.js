const { Router } = require("express")
const controleer= require("./controller")
const router = Router();


//para inicio de sesión , metodo POST, debe de recibir lo siguiente: 
// {username: "", password: ""}
router.post("/login", controleer.login)
router.post("/signup", controleer.signup)
router.get('/details', controleer.detalles)
router.get('/log',controleer.bitácora_usuario)
router.post('/update', controleer.modify)

module.exports = router