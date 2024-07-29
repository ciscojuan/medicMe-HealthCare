const express = require('express')
const Booking = require('../controllers/booking')
const router = express.Router();

router.get('/', Booking.getBookings);
router.post('/', Booking.createBooking);
router.put('/:id', Booking.updateBooking);
router.delete('/:id', Booking.deleteBooking);

module.exports = router;