const express = require('express');
const router = express.Router();
const {getMenu} = require('../controllers/menu');
const {authorize} = require('../middleware/authorize');

router.route('/').get(authorize,getMenu);


module.exports = router;