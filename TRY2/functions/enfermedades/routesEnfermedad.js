const { Router } = require("express")
const controller = require('./controllerEnfermedad')
const router = Router();

router.get('/all',controller.getAll);
module.exports = router
router.get('/search', controller.Searcher);