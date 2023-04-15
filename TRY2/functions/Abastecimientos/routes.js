const {Router} = require('express');
const router = Router();
const controller = require('./controller');
router.get('/' , controller.getInventarioHandler)
router.post('/' , controller.postInventarioHandler)
module.exports = router