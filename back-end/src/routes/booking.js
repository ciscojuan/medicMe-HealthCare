const express = require('express')
const middleware = require('../utils/middlewares')
const Booking = require('../controllers/booking')
const router = express.Router();

router.get('/', Booking.getBookings);
router.get('/:id', Booking.getBooking)
router.post('/', Booking.createBooking);
router.put('/:id', Booking.updateBooking);
router.delete('/:id', Booking.deleteBooking);

module.exports = router;