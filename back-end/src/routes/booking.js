const express = require('express')
const router = express.Router();
const middleware = require('../utils/middlewares')
const Booking = require('../controllers/booking')

router.get('/user/:id', Booking.getBookings);
router.get('/', Booking.getAllBookings);
router.get('/:id', Booking.getBooking)
router.post('/', Booking.createBooking);
router.put('/:id', Booking.updateBooking);
router.delete('/:id', Booking.deleteBooking);

module.exports = router;