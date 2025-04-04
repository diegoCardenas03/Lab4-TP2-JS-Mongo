const express = require('express');
const router = express.Router();
const paisController = require('../controllers/paisController');

router.post('/', paisController.create);
router.post('/migrar', paisController.migrar);

module.exports = router;