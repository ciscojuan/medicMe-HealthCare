const express = require('express')
const Specialty = require('../controllers/specialty');
const router = express.Router()

router.get('/', Specialty.getSpecialties)
router.delete('/:id', Specialty.deleteSpecialty)

module.exports = router;
