const express = require('express');
const router = express.Router();
const Location = require('../controllers/location');

router.get('/', Location.getLocations);
router.get('/:id', Location.getLocation);
router.post('/', Location.createLocation);
router.put('/:id', Location.updateLocation);
router.delete('/:id', Location.deleteLocation);

module.exports = router;