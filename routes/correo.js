const { Router } = require('express');
const { envioCorreo } = require('../controllers/correo');
const router = Router();

router.post('/envio',envioCorreo);

module.exports = router;