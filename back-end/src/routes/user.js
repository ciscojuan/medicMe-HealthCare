const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

router.get('/', User.getUsers);
router.get('/doctors/', User.getDoctors)
router.get('/:id', User.getUser);
router.post('/', User.createUser);
router.put('/:id', User.updateUser);
router.delete('/:id', User.deletedUser);
router.get('/credential/:id', User.getUserFromCredential)
module.exports = router;
