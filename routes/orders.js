const express = require('express');
const router = express.Router();
const {CreateOrder} = require('../controllers/orders');
const {authorize} = require('../middleware/authorize');


router.route('/').post(authorize,CreateOrder);



module.exports = router;