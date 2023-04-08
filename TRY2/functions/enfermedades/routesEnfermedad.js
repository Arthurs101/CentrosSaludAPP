const { Router } = require("express")
const controller = require('./controllerEnfermedad')
const router = Router();

router.get('/all',controller.getAll);
router.get('/search', controller.Searcher);
router.post('/add',controller.addEnfermedad)
module.exports = router