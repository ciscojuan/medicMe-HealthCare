const express = require('express');
const Medic = require('../controllers/medic');
const router = express.Router();

router.get('/', Medic.getMedics);
router.get('/:id', Medic.getMedic);
router.post('/', Medic.createMedic);
router.put('/:id', Medic.updatedMedic);
router.delete('/:id', Medic.deletdMedic);

module.exports = router;