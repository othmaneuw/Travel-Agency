const express = require('express');
const {addPlace,ShowPlacesByUser} = require('../controllers/places');

const router = express.Router();

router.post('/',addPlace);
router.get('/',ShowPlacesByUser);

module.exports = router;