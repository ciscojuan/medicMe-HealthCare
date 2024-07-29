const express = require('express');
const Patient = require('../controllers/patient');
const router = express.Router();

router.get('/', Patient.getPatients);
router.get('/:id', Patient.getPatient);
router.post('/', Patient.createPatient);
router.put('/:id', Patient.updatePatient);
router.delete('/:id', Patient.deletdPatient);

module.exports = router;