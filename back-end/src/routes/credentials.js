const express = require('express');
const router = express.Router();
const Credentials = require('../controllers/credentials');

router.get('/', Credentials.getUsers);
router.get('/:id', Credentials.getUser);
router.post('/', Credentials.createUser);
router.put('/:id', Credentials.updateUser);
router.delete('/:id', Credentials.deleteUser);
router.get('/user/:id', Credentials.getUserFromCredentials);
module.exports = router;
