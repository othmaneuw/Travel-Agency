const express = require('express');
const {addPlace} = require('../controllers/places');

const router = express.Router();

router.post('/',addPlace);

module.exports = router;