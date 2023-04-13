const { Router } = require("express")
const controller = require('./pacienteController')
const router = Router();

router.post('/', controller.addPaciente)
router.get('/', controller.getAllPacientes)
router.post('/update', controller.updatePaciente )
router.get('/reporte' , controller.getReport)
router.get('/search', controller.getPaciente)

module.exports = router;